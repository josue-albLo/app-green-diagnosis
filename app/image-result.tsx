import { DiseaseRequest } from '@/interfaces/disease.interface';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function ImageResult() {
    const params = useLocalSearchParams();
    const result: DiseaseRequest = JSON.parse(params?.result as string);
    console.log({ result });
    if (!result) {
        router.replace('/home');
        return null;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#e8f5e9', '#46af4e']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Resultado del Procesamiento</Text>
                    </View>

                    <View style={styles.resultContainer}>
                        <Image
                            source={{ uri: result.image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.diseaseText}>Planta: {result?.plant ?? ''}</Text>
                            <Text style={styles.diseaseText}>Enfermedad: {result?.disease ?? ''}</Text>
                            <Text style={styles.probabilityText}>Descripción: {result?.description ?? ''}</Text>
                            <Text style={styles.probabilityText}>Probabilidad: {result?.probability ?? ''}</Text>
                        </View>
                        <View style={styles.recommendationsContainer}>
                            <Text style={styles.recommendationsTitle}>Recomendaciones:</Text>
                            {result.recommendations.map((rec, index) => (
                                <Text key={index} style={styles?.recommendationItem ?? ''}>• {rec}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.homeButton]}
                            onPress={() => router.replace('/home')}
                        >
                            <Feather name="home" size={24} color="#ffffff" />
                            <Text style={styles.buttonText}>Ir a inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.historyButton]}
                            onPress={() => { router.replace('/history') }}
                        >
                            <Feather name="clock" size={24} color="#ffffff" />
                            <Text style={styles.buttonText}>Ir a Historial</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e8f5e9',
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        alignItems: 'center',
        marginVertical: height * 0.02,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    resultContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginBottom: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
        marginBottom: 15,
    },
    infoContainer: {
        marginBottom: 15,
    },
    diseaseText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    probabilityText: {
        fontSize: 16,
        color: '#666',
    },
    recommendationsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 15,
    },
    recommendationsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    recommendationItem: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.03,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderRadius: 25,
        flex: 1,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    historyButton: {
        backgroundColor: '#2196f3',
    },
    homeButton: {
        backgroundColor: '#4caf50',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});