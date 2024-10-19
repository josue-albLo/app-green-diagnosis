import { DiagnosticHistory } from '@/interfaces/disease.interface';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function DiagnosisDetailsScreen() {
    const params = useLocalSearchParams();
    const diagnosis: DiagnosticHistory = JSON.parse(params?.diagnosis as string);
    const scrollY = useSharedValue(0);

    if (!diagnosis) {
        router.replace('/history');
        return null;
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollY.value,
            [-height * 0.4, 0, height * 0.4],
            [1.5, 1, 0.75],
            Extrapolate.CLAMP
        );
        const opacity = interpolate(
            scrollY.value,
            [0, height * 0.2, height * 0.4],
            [1, 0.5, 0],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Animated.View style={[styles.header, headerStyle]}>
                <Image source={{ uri: diagnosis.image }} style={styles.headerImage} />
                <LinearGradient
                    colors={['rgba(0,100,0,0.6)', 'transparent', 'rgba(0,100,0,0.6)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <BlurView intensity={20} tint="dark" style={styles.headerBlur} />
            </Animated.View>
            <Animated.ScrollView
                style={styles.scrollView}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <View style={styles.contentContainer}>
                    <BlurView intensity={90} tint="light" style={styles.blurContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.plantName}>{diagnosis.plant}</Text>
                            <Text style={styles.date}>{diagnosis.date}</Text>
                        </View>

                        <View style={styles.diseaseContainer}>
                            <Text style={styles.diseaseTitle}>Diagnóstico</Text>
                            <Text style={styles.diseaseName}>{diagnosis.disease}</Text>
                            <View style={styles.probabilityContainer}>
                                <Text style={styles.probabilityText}>Probabilidad:</Text>
                                <Text style={styles.probabilityValue}>{diagnosis.probability}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionTitle}>Descripción</Text>
                            <Text style={styles.descriptionText}>{diagnosis.description}</Text>
                        </View>

                        <View style={styles.recommendationsContainer}>
                            <Text style={styles.sectionTitle}>Recomendaciones</Text>
                            {diagnosis.recommendations.map((recommendation, index) => (
                                <View key={index} style={styles.recommendationItem}>
                                    <Feather name="check-circle" size={20} color="#4caf50" style={styles.recommendationIcon} />
                                    <Text style={styles.recommendationText}>{recommendation}</Text>
                                </View>
                            ))}
                        </View>
                    </BlurView>
                </View>
            </Animated.ScrollView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e8f5e9',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.4,
        zIndex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    headerBlur: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        marginTop: height * 0.35,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    blurContainer: {
        padding: 20,
        paddingTop: 30,
    },
    titleContainer: {
        marginBottom: 20,
    },
    plantName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    diseaseContainer: {
        marginBottom: 20,
    },
    diseaseTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    diseaseName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 10,
    },
    probabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
    },
    probabilityText: {
        fontSize: 16,
        color: '#666',
        marginRight: 10,
    },
    probabilityValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9800',
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    recommendationsContainer: {
        marginBottom: 20,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        padding: 10,
        borderRadius: 10,
    },
    recommendationIcon: {
        marginRight: 10,
    },
    recommendationText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});