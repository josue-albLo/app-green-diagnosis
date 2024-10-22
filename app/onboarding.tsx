import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Cargar una Foto',
        text: 'Puedes tomar una foto o cargarla desde la galería para comenzar.',
        image: require('./../assets/public/images/imgBack.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: '2',
        title: 'Procesar la Imagen',
        text: 'Nuestro sistema analizará la imagen para detectar posibles enfermedades en las plantas.',
        image: require('./../assets/public/images/imgBack.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: '3',
        title: 'Ver Resultados',
        text: 'Te mostraremos el resultado del análisis y las recomendaciones para mejorar.',
        image: require('./../assets/public/images/imgBack.jpg'),
        backgroundColor: '#22bcb5',
    },
];


const OnboardingScreen: React.FC = () => {
    const navigation = useRouter();
    const renderItem = ({ item }: any) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const onDone = () => {
        // Aquí puedes navegar a la siguiente pantalla o configurar un flag para evitar que se muestre el onboarding otra vez
        // Navega a la pantalla principal de la aplicación
        navigation.push('/(tabs)/home');
    };

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onDone={onDone}
            showSkipButton={true}
            onSkip={onDone}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    activeDot: {
        backgroundColor: '#ffffff',
    },
});

export default OnboardingScreen;
