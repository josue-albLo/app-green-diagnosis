import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

interface ForgotPasswordFormValues {
  email: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
})

export default function ForgotPasswordScreen() {
  const router = useRouter()

  const handleForgotPassword = (values: ForgotPasswordFormValues) => {
    console.log('Solicitud de recuperación de contraseña para:', values.email)
    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ahora, simplemente mostraremos un mensaje en la consola
    alert('Se ha enviado un correo de recuperación a ' + values.email)
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
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#2e7d32" />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBsb2dvfGVufDB8fDB8fHww" }}
                style={styles.logo}
              />
              <Text style={styles.appName}>PlantCare</Text>
            </View>
            
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.subtitle}>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</Text>
            
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleForgotPassword}
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

                  <Button
                    title="Enviar Instrucciones"
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.submitButton}
                    titleStyle={styles.buttonTitle}
                  />

                  <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
                    <Text style={styles.loginLinkText}>Volver al inicio de sesión</Text>
                  </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
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
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#4CAF50',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
})