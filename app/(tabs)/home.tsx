import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'

export default function Component() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Feather name="menu" size={24} color="#2e7d32" />
          </TouchableOpacity>
          <View style={styles.weatherContainer}>
            <Feather name="sun" size={24} color="#f57c00" />
            <Text style={styles.weatherText}>24°C</Text>
          </View>
        </View>

        <View style={styles.cameraContainer}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww" }}
            style={styles.cameraBackground}
            resizeMode="cover"
          >
            <View style={styles.cameraOverlay}>
              <Feather name="camera" size={40} color="#ffffff" />
              <Text style={styles.cameraText}>Camera View</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="photo-library" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.captureButton]}>
            <Ionicons name="camera-outline" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]}>
            <Ionicons name="refresh-outline" size={24} color="#ffffff" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
})