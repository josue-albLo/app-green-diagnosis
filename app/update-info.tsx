import { Feather } from '@expo/vector-icons'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { SecurityKeys } from '../enums/security-keys.enum'
import { getItem } from '../helper/storage'

export const UpdateFormValues = {
    email: '',
    full_name: '',
    department: '',
    town: '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    full_name: Yup.string().required('Nombre completo es requerido'),
    department: Yup.string().required('Departamento es requerido'),
    town: Yup.string().required('Ciudad es requerida'),
})

export default function ProfileForm() {
    const router = useRouter();
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [town, setTown] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const loadingText = 'Cargando datos del usuario...';
    const userProfileText = 'Perfil de Usuario';

    const handleSubmit = async (values: typeof UpdateFormValues) => {
        setIsSaving(true);
        const url = `${process.env.EXPO_PUBLIC_API_GATEWAY_AUTH_URL}/update-info`
        console.log({ ...values, avatar })
        console.log('URL:', url);
        try {
            const res = await axios.post(url, { ...values, avatar }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            if (res.status === 200) {
                console.log('Datos actualizados correctamente:', res.data);
                router.push('/home');
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        getEmail();
    }, []);

    const getUser = async (token_param: string, email_param: string) => {
        try {
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_GATEWAY_AUTH_URL}/get-user`, { email: email_param }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token_param}`
                }
            });
            if (res.status === 200) {
                console.log('Datos del usuario:', res.data);
                setFullName(res.data.full_name);
                setDepartment(res.data.department);
                setTown(res.data.town);
            }
        } catch (error) {
            console.log('Error:', error);
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
    }

    const getEmail = async () => {
        try {
            const email = await getItem(SecurityKeys.USER);
            const token = await getItem(SecurityKeys.ACCESS_TOKEN);
            if (email && token) {
                console.log('Email encontrado:', email);
                setEmail(email);
                setToken(token);
                getUser(token, email);
            } else {
                console.log('No se encontró un email en el almacenamiento.');
                router.push('/login');
            }
        } catch (error) {
            console.log('Error obteniendo el email:', error);
            router.push('/login');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setAvatar(null);
        }
    }

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loaderText}>{loadingText ?? ''}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#e8f5e9', '#46af4e']}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoidingView}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.header}>
                                <Button
                                    icon={<Feather name="arrow-left" size={wp('6%')} color="#2e7d32" />}
                                    onPress={() => router.back()}
                                    type="clear"
                                />
                                <Text style={styles.headerText}>{userProfileText ?? ''}</Text>
                            </View>

                            <View style={styles.avatarContainer}>
                                <Image
                                    source={avatar ? { uri: avatar } : require('../assets/images/splash.png')}
                                    style={styles.avatar}
                                />
                                <Button
                                    title="Editar Avatar"
                                    onPress={pickImage}
                                    buttonStyle={styles.editAvatarButton}
                                    titleStyle={styles.editAvatarButtonText}
                                />
                            </View>

                            <Formik
                                enableReinitialize={true}
                                initialValues={{ email: email, full_name: fullName, department: department, town: town }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View style={styles.formContainer}>
                                        <Input
                                            placeholder="Correo Electrónico"
                                            leftIcon={<Feather name="mail" size={wp('5%')} color="#4CAF50" />}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            inputContainerStyle={styles.inputContainer}
                                            inputStyle={styles.input}
                                            disabled={true}
                                        />
                                        <Input
                                            placeholder="Nombre Completo"
                                            leftIcon={<Feather name="user" size={wp('5%')} color="#4CAF50" />}
                                            onChangeText={handleChange('full_name')}
                                            onBlur={handleBlur('full_name')}
                                            value={values.full_name}
                                            errorMessage={touched.full_name ? errors.full_name : ''}
                                            inputContainerStyle={styles.inputContainer}
                                            inputStyle={styles.input}
                                        />
                                        <Input
                                            placeholder="Departamento"
                                            leftIcon={<Feather name="map-pin" size={wp('5%')} color="#4CAF50" />}
                                            onChangeText={handleChange('department')}
                                            onBlur={handleBlur('department')}
                                            value={values.department}
                                            errorMessage={touched.department ? errors.department : ''}
                                            inputContainerStyle={styles.inputContainer}
                                            inputStyle={styles.input}
                                        />
                                        <Input
                                            placeholder="Ciudad"
                                            leftIcon={<Feather name="map-pin" size={wp('5%')} color="#4CAF50" />}
                                            onChangeText={handleChange('town')}
                                            onBlur={handleBlur('town')}
                                            value={values.town}
                                            errorMessage={touched.town ? errors.town : ''}
                                            inputContainerStyle={styles.inputContainer}
                                            inputStyle={styles.input}
                                        />

                                        <Button
                                            title={isSaving ? "Guardando..." : "Guardar Cambios"}
                                            onPress={() => handleSubmit()}
                                            buttonStyle={styles.submitButton}
                                            titleStyle={styles.buttonTitle}
                                            disabled={isSaving}
                                            loading={isSaving}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9',
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: wp('5%'),
        paddingBottom: hp('5%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    headerText: {
        color: '#2e7d32',
        marginLeft: wp('2%'),
        fontSize: wp('5%'),
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    avatar: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('12.5%'),
    },
    editAvatarButton: {
        backgroundColor: '#4CAF50',
        borderRadius: wp('5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        marginTop: hp('1%'),
    },
    editAvatarButtonText: {
        fontSize: wp('3.5%'),
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: wp('3%'),
        padding: wp('5%'),
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
        fontSize: wp('4%'),
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: wp('6%'),
        marginTop: hp('2%'),
        paddingVertical: hp('1.5%'),
    },
    buttonTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f5e9',
    },
    loaderText: {
        marginTop: hp('2%'),
        fontSize: wp('4%'),
        color: '#4CAF50',
    },
})