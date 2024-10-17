import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Formik, FormikHelpers } from 'formik';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, ActivityIndicator, Modal } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  town: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('El nombre completo es requerido'),
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es requerida'),
  department: Yup.string().required('El departamento es requerido'),
  town: Yup.string().required('La ciudad es requerida'),
});

export default function RegisterScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>
  ) => {
    setIsLoading(true);
    setEmailError('');
    setMessageError('');
    console.log('Datos de registro:', values);
    try {
      //await new Promise(resolve => setTimeout(resolve, 2000));

      if (values.email === 'existing@example.com') {
        console.log('Correo ya registrado:', values.email);
        setFieldError('email', 'Este correo ya está registrado');
        setEmailError('Este correo ya está registrado');
        setApiError(true);
        setMessageError('Este correo ya está registrado');
      } else {
        console.log('Registro exitoso:', values);
        // Here you would typically make an API call to register the user
        // If successful, you might want to navigate to a success screen or login
        setApiError(true);
        setMessageError('Error durante el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setApiError(true);
      setMessageError('Error durante el registro. Por favor, inténtalo de nuevo.');
      // Handle any errors here
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#e8f5e9', '#c8e6c9']} style={styles.gradient}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBsb2dvfGVufDB8fDB8fHww" }}
                style={styles.logo}
              />
              <Text style={styles.appName}>PlantCare</Text>
            </View>

            <Formik
              initialValues={{ fullName: '', email: '', password: '', confirmPassword: '', department: '', town: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
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
                    errorMessage={(touched.email && errors.email) || emailError ? (errors.email || emailError) : ''}
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
                    placeholder="Confirmar Contraseña"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                    leftIcon={<Feather name="lock" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />
                  <Input
                    placeholder="Departamento"
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
                    onChangeText={handleChange('town')}
                    onBlur={handleBlur('town')}
                    value={values.town}
                    errorMessage={touched.town && errors.town ? errors.town : ''}
                    leftIcon={<Feather name="map-pin" size={24} color="#4CAF50" />}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                  />

                  <Button
                    title={isLoading ? "Guardando..." : "Registrarse"}
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.registerButton}
                    titleStyle={styles.buttonTitle}
                    disabled={isSubmitting || isLoading}
                    icon={isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" style={styles.loader} />
                    ) : undefined}
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
      <Modal
        transparent={true}
        animationType="fade"
        visible={apiError}
        onRequestClose={() => setApiError(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>{messageError}</Text>
            <Button
              title="Cerrar"
              onPress={() => setApiError(false)}
              buttonStyle={styles.modalButton}
              titleStyle={styles.modalButtonText}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
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
  loader: {
    marginRight: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fd3d13',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 12,
    elevation: 2,
    minWidth: 100,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});