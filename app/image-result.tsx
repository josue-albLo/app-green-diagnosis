import { DiseaseResponse } from '@/interfaces/disease.interface';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ImageResult() {
    const params = useLocalSearchParams();
    const data = JSON.parse(params?.result as string);

    if (!data || data?.status_code) {
        router.replace('/home');
        return null;
    }

    const result = data as DiseaseResponse;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#4caf50" translucent />
            <LinearGradient
                colors={['#4caf50', '#45a049']}
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Animated.View entering={FadeInDown.delay(200).duration(1000)} style={styles.card}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: result.image }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                                    style={styles.imageOverlay}
                                >
                                    <Text style={styles.plantName}>{result?.plant ?? ''}</Text>
                                    <Text style={styles.diseaseName}>{result?.disease ?? ''}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.probabilityContainer}>
                                    <Text style={styles.probabilityText}>Probabilidad:</Text>
                                    <View style={styles.probabilityBar}>
                                        <LinearGradient
                                            colors={['#4caf50', '#8bc34a']}
                                            style={[styles.probabilityFill, { width: `${parseFloat(result?.probability ?? '0') * 100}%` }]}
                                        />
                                    </View>
                                    <Text style={styles.probabilityValue}>{result?.probability ?? ''}</Text>
                                </View>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Descripción</Text>
                                    <Text style={styles.sectionText}>{result?.description ?? ''}</Text>
                                </View>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Recomendaciones</Text>
                                    {result.recommendations.map((rec, index) => (
                                        <View key={index} style={styles.recommendationItem}>
                                            <Feather name="check-circle" size={20} color="#4caf50" style={styles.recommendationIcon} />
                                            <Text style={styles.recommendationText}>{rec}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </Animated.View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.homeButton]}
                                onPress={() => router.replace('/home')}
                            >
                                <Feather name="home" size={24} color="#ffffff" />
                                <Text style={styles.buttonText}>Inicio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.historyButton]}
                                onPress={() => router.replace('/history')}
                            >
                                <Feather name="clock" size={24} color="#ffffff" />
                                <Text style={styles.buttonText}>Historial</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#4caf50',
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: height * 0.03,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    imageContainer: {
        width: '100%',
        height: height * 0.3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    plantName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    diseaseName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#8bc34a',
    },
    infoContainer: {
        padding: 20,
    },
    probabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    probabilityText: {
        fontSize: 16,
        color: '#666',
        marginRight: 10,
    },
    probabilityBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    probabilityFill: {
        height: '100%',
        borderRadius: 5,
    },
    probabilityValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    recommendationIcon: {
        marginRight: 10,
        marginTop: 2,
    },
    recommendationText: {
        flex: 1,
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.06,
        borderRadius: 30,
        flex: 1,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    historyButton: {
        backgroundColor: '#2196f3',
    },
    homeButton: {
        backgroundColor: '#8bc34a',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});