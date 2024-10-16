import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

interface RegisterFormValues {
  fullName: string
  email: string
  password: string
  department: string
  town: string
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('El nombre completo es requerido'),
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es requerida'),
  age: Yup.number().positive('La edad debe ser un número positivo').integer('La edad debe ser un número entero').required('La edad es requerida'),
})

export default function RegisterScreen() {
  const router = useRouter()

  const handleRegister = (values: RegisterFormValues) => {
    console.log('Datos de registro:', values)
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
              initialValues={{ fullName: '', email: '', password: '', department: '', town: '' }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                  <Input
                    placeholder="Nombre Completo"
                    autoCapitalize="words"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    errorMessage={touched.fullName && errors.fullName ? errors.fullName : ''}
                    leftIcon={<Feather name="user" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />
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
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    errorMessage={touched.password && errors.password ? errors.password : ''}
                    leftIcon={<Feather name="lock" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />
                  <Input
                    placeholder="Departamento"
                    keyboardType="default"
                    onChangeText={handleChange('department')}
                    onBlur={handleBlur('department')}
                    value={values.department}
                    errorMessage={touched.department && errors.department ? errors.department : ''}
                    leftIcon={<Feather name="map-pin" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />
                  <Input
                    placeholder="Ciudad"
                    keyboardType="default"
                    onChangeText={handleChange('town')}
                    onBlur={handleBlur('town')}
                    value={values.town}
                    errorMessage={touched.town && errors.town ? errors.town : ''}
                    leftIcon={<Feather name="map-pin" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />

                  <Button
                    title="Registrarse"
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.registerButton}
                    titleStyle={styles.buttonTitle}
                  />

                  <Button
                    title="Ya tengo una cuenta"
                    type="clear"
                    onPress={() => router.push('/login')}
                    titleStyle={styles.loginButtonTitle}
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
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonTitle: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
})