import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import { SecurityKeys } from '@/enums/security-keys.enum';
import { DiagnosticHistory } from '@/interfaces/disease.interface';
import { getHistory } from '../../api/diagnosis.api';
import { getItem } from '../../helper/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firebaseSettings from '../../database/firebase';


const { height } = Dimensions.get('window');

export default function AnalysisHistoryScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [historyData, setHistoryData] = useState<DiagnosticHistory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const goToDetails = (diagnosticParam: DiagnosticHistory) => {
    if (!diagnosticParam) return;
    router.push({ pathname: '/diagnosis-details', params: { diagnosis: JSON.stringify(diagnosticParam) } });
  };

  const getAllHistory = async () => {
    setIsLoading(true);
    try {
      const userId = await getItem(SecurityKeys.ID);
      const q = query(collection(firebaseSettings.db, 'diagnosisRecord'), where('userId', '==', userId));
      getDocs(q).then((querySnapshot) => {
        const history: DiagnosticHistory[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data as DiagnosticHistory;
        })
        console.log('History:', history);
        setHistoryData(history);

      }).catch((error) => {
        console.error('Error fetching history:', error);
        setErrorMessage('Error al obtener el historial.');
      }).finally(() => {
        setIsLoading(false);
      })


    } catch (err) {
      console.error('Error fetching history:', err);
      setErrorMessage('Error al obtener el historial.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected ?? false);
      });

      if (isConnected) {
        getAllHistory();
      } else {
        setErrorMessage('No hay conexión a internet');
        setIsLoading(false);
      }

      return () => {
        unsubscribe();
      };
    }, [isConnected])
  );

  const renderHistoryItem = ({ item, index }: { item: DiagnosticHistory; index: number }) => {
    const isSelected = item.id === selectedId;
    const inputRange = [
      -1,
      0,
      (height * 0.2 + 20) * index,
      (height * 0.2 + 20) * (index + 2)
    ];

    const scale = animatedValue.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });

    const opacity = animatedValue.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <Animated.View style={[styles.cardContainer, { opacity, transform: [{ scale }] }]}>
        <TouchableOpacity
          style={[styles.card, isSelected && styles.selectedCard]}
          onPress={() => setSelectedId(isSelected ? null : item.id)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: decodeURI(item.image) }} style={styles.plantImage} />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
            style={styles.gradient}
          />
          <View style={styles.cardContent}>
            <BlurView intensity={0} tint="dark" style={styles.textBackground}>
              <Text style={styles.cardTitle}>{item.plant}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardDisease}>{item.disease}</Text>
            </BlurView>
          </View>
          {isSelected && (
            <BlurView intensity={80} tint="dark" style={styles.blurView}>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <TouchableOpacity style={styles.detailsButton} onPress={() => goToDetails(item)}>
                <Text style={styles.detailsButtonText}>Ver análisis completo</Text>
              </TouchableOpacity>
            </BlurView>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#e8f5e9', '#46af4e']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Historial de Análisis</Text>
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <Animated.FlatList
            data={historyData}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.date}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
              { useNativeDriver: true }
            )}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1cd32a',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
    height: height * 0.2,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  selectedCard: {
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  plantImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  textBackground: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 4,
  },
  cardDisease: {
    fontSize: 16,
    color: '#ff9800',
    fontWeight: '500',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 15,
  },
  detailsButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});