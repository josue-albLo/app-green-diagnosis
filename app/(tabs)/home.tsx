import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface WeatherData {
  temperature: string;
  city: string;
  condition: WeatherCondition;
}

type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm' | 'drizzle' | 'wind' | 'default';

interface WeatherIcon {
  name: string;
  color: string;
  AnimatedComponent: React.FC;
}

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

const SunnyAnimation: React.FC = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return <AnimatedFeather name="sun" size={24} color="#f57c00" style={animatedStyle} />;
};

const CloudyAnimation: React.FC = () => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return <AnimatedFeather name="cloud" size={24} color="#78909c" style={animatedStyle} />;
};

const RainyAnimation: React.FC = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <AnimatedFeather name="cloud-rain" size={24} color="#4fc3f7" style={animatedStyle} />;
};

export default function Component(): JSX.Element {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultBackground = require('./../../assets/public/images/imgBack.jpg');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const ApiKey = '3cdc99f607af291ba131e529e935c0df'; // Reemplaza esto con tu API key real
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const buildUrlApi = (latitude: number, longitude: number): string => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=metric`
  }

  const getWeather = async (latitude: number, longitude: number): Promise<void> => {
    try {
      const res = await fetch(buildUrlApi(latitude, longitude));
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      const temperature = data.main.temp.toFixed(1);
      const city = data.name;
      const condition = data.weather[0].main.toLowerCase() as WeatherCondition;
      setWeather({ temperature, city, condition });
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la información del clima.');
    }
  }

  const weatherIcons: Record<WeatherCondition, WeatherIcon> = {
    'clear': { name: 'sun', color: '#f57c00', AnimatedComponent: SunnyAnimation },
    'clouds': { name: 'cloud', color: '#78909c', AnimatedComponent: CloudyAnimation },
    'rain': { name: 'cloud-rain', color: '#4fc3f7', AnimatedComponent: RainyAnimation },
    'snow': { name: 'cloud-snow', color: '#b3e5fc', AnimatedComponent: CloudyAnimation },
    'thunderstorm': { name: 'cloud-lightning', color: '#ffd54f', AnimatedComponent: CloudyAnimation },
    'drizzle': { name: 'cloud-drizzle', color: '#81d4fa', AnimatedComponent: RainyAnimation },
    'wind': { name: 'wind', color: '#b0bec5', AnimatedComponent: CloudyAnimation },
    'default': { name: 'thermometer', color: '#ff5722', AnimatedComponent: SunnyAnimation },
  };

  const getWeatherIcon = (condition: WeatherCondition): WeatherIcon => {
    return weatherIcons[condition] || weatherIcons['default'];
  }

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permisos para acceder a la ubicación denegados.');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        await getWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImageFromGallery = async (): Promise<void> => {
    if (hasGalleryPermission === false) {
      Alert.alert('Permiso denegado', 'No se ha otorgado permiso para acceder a la galería. Por favor, habilítalo en la configuración.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async (): Promise<void> => {
    if (hasCameraPermission === false) {
      Alert.alert('Permiso denegado', 'No se ha otorgado permiso para acceder a la cámara. Por favor, habilítalo en la configuración.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const resetImage = (): void => {
    setImage(null);
  };

  const processImage = (): void => {
    setIsLoading(true);
    // Simulamos un proceso que tarda 3 segundos
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Procesamiento completado', 'La imagen ha sido procesada exitosamente.');
    }, 3000);
  };

  const icon = weather ? getWeatherIcon(weather.condition) : weatherIcons['default'];
  const AnimatedWeatherIcon = icon.AnimatedComponent;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton}>
              <Feather name="menu" size={24} color="#2e7d32" />
            </TouchableOpacity>
            <View style={styles.weatherContainer}>
              {weather ? (
                <>
                  <AnimatedWeatherIcon />
                  <Text style={styles.weatherText}>{`${weather.temperature}°C`}</Text>
                  <Text style={styles.cityText}>{weather.city}</Text>
                </>
              ) : (
                <Text style={styles.weatherText}>Cargando clima...</Text>
              )}
            </View>
          </View>

          <View style={styles.cameraContainer}>
            <ImageBackground
              source={image ? { uri: image } : defaultBackground}
              style={styles.cameraBackground}
              resizeMode="cover"
            >
              <View style={styles.cameraOverlay}>
                <Feather name="camera" size={40} color="#ffffff" />
                <Text style={styles.cameraText}>Vista de Cámara</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.buttonContainer}>
            {!image ? (
              <>
                <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
                  <MaterialIcons name="photo-library" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Galería</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={captureImage}>
                  <Ionicons name="camera-outline" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Capturar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetImage}>
                  <Ionicons name="refresh-outline" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Restablecer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.processButton]} onPress={processImage}>
                  <Ionicons name="cog-outline" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Procesar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#4caf50" />
            <Text style={styles.modalText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  menuButton: {
    padding: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cameraBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  cameraText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
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
    backgroundColor: '#4caf50',
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
  captureButton: {
    backgroundColor: '#2196f3',
  },
  resetButton: {
    backgroundColor: '#ff5722',
  },
  processButton: {
    backgroundColor: '#9c27b0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});