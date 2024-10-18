import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  Dimensions, Animated, StatusBar, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Updated simulated data for the analysis history
const historyData = [
  {
    id: '1',
    plant: 'Tomato',
    date: '2024-09-25',
    disease: 'Leaf Spot',
    description: 'Circular brown spots on leaves, potentially causing defoliation.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0byUyMHBsYW50fGVufDB8fDB8fHww'
  },
  {
    id: '2',
    plant: 'Potato',
    date: '2024-09-24',
    disease: 'Late Blight',
    description: 'Water-soaked spots on leaves, stems, and tubers, leading to rapid plant death.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: '3',
    plant: 'Strawberry',
    date: '2024-09-23',
    disease: 'Powdery Mildew',
    description: 'White powdery coating on leaves, reducing plant vigor and fruit quality.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyeSUyMHBsYW50fGVufDB8fDB8fHww'
  },
  {
    id: '4',
    plant: 'Cucumber',
    date: '2024-09-22',
    disease: 'Downy Mildew',
    description: 'Yellow spots on leaf surfaces with fuzzy gray growth underneath.',
    image: 'https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VjdW1iZXIlMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '5',
    plant: 'Pepper',
    date: '2024-09-21',
    disease: 'Bacterial Spot',
    description: 'Small, dark, raised spots on leaves, stems, and fruits.',
    image: 'https://images.unsplash.com/photo-1635178792420-c9eda4e3d2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVwcGVyJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D'
  },
];

export default function AnalysisHistoryScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const renderHistoryItem = ({ item, index }: any) => {
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
          <Image source={{ uri: item.image }} style={styles.plantImage} />
          <LinearGradient
            colors={['rgba(0,100,0,0.6)', 'transparent']}
            style={styles.gradient}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.plant}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardDisease}>{item.disease}</Text>
          </View>
          {isSelected && (
            <BlurView intensity={80} tint="dark" style={styles.blurView}>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Full Analysis</Text>
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
          <Text style={styles.headerText}>Historial de Analisis</Text>
        </View>

        <Animated.FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
            { useNativeDriver: true }
          )}
        />
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46af4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    padding: 10,
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
    padding: 15,
    justifyContent: 'flex-end',
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
});