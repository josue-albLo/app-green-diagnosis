import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { removeItem } from '../../helper/storage'

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#4caf50" />
    <Text style={styles.loaderText}>Cerrando sesión...</Text>
  </View>
)

export default function Component() {
  const settingsOptions: { icon: 'user' | 'lock' | 'settings' | 'mail' | 'bell' | 'help-circle', text: string }[] = [
    { icon: 'user', text: 'Editar Perfil' },
    { icon: 'settings', text: 'Preferencias' },
    { icon: 'bell', text: 'Notificaciones' },
    { icon: 'help-circle', text: 'Ayuda y Soporte' },
  ];
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      console.log('Cerrando sesión...')
      await removeItem('access_token')
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.replace('/login')
    } catch (error) {
      console.log('Error al cerrar sesión:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#2e7d32" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Bienvenido, Usuario</Text>
              <Text style={styles.subHeaderText}>Administra tu cuenta y preferencias</Text>
            </View>
          </View>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Feather name="edit-2" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsContainer}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.settingCard}>
                <Feather name={option.icon} size={24} color="#4caf50" style={styles.settingIcon} />
                <Text style={styles.settingText}>{option.text}</Text>
                <Feather name="chevron-right" size={24} color="#4caf50" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#ffffff" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#4caf50',
    marginTop: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#2e7d32',
    borderRadius: 15,
    padding: 8,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4caf50',
  },
})