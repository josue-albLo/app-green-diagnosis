import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

interface LoginFormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
})

export default function LoginScreen() {
  const router = useRouter()

  const handleLogin = (values: LoginFormValues) => {
    console.log('Datos de inicio de sesión:', values)
    router.push('/(tabs)/home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBsb2dvfGVufDB8fDB8fHww" }}
                style={styles.logo}
              />
              <Text style={styles.appName}>PlantCare</Text>
            </View>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  <Input
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={touched.email && errors.email ? errors.email : ''}
                    leftIcon={<Feather name="mail" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />
                  <Input
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    errorMessage={touched.password && errors.password ? errors.password : ''}
                    leftIcon={<Feather name="lock" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />

                  <Button
                    title="Iniciar Sesión"
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.buttonTitle}
                  />

                  <TouchableOpacity style={styles.linkButton}>
                    <Text onPress={() => router.push('/forgot-password')} style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>

                  <Button
                    title="Registrarse"
                    type="outline"
                    buttonStyle={styles.registerButton}
                    titleStyle={styles.registerButtonTitle}
                    onPress={() => router.push('/register')}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    borderBottomColor: '#4CAF50',
  },
  input: {
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  registerButton: {
    borderColor: '#4CAF50',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
  },
  registerButtonTitle: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
})