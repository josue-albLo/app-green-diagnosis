import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Linking, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Button, Divider, Icon, ListItem, Text } from 'react-native-elements'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const faqs = [
    {
        question: '¿Cómo puedo diagnosticar una planta enferma?',
        answer: 'Tome una foto clara de la planta afectada y use nuestra función de diagnóstico en la aplicación.'
    },
    {
        question: '¿Cuánto tiempo tarda un diagnóstico?',
        answer: 'Normalmente, los resultados están disponibles en segundos después de subir la imagen.'
    },
    {
        question: '¿Puedo guardar mis diagnósticos anteriores?',
        answer: 'Sí, todos los diagnósticos se guardan automáticamente en su perfil para futuras referencias.'
    },
]

export default function HelpSupportScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@greendiagnosis.com')
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#e8f5e9', '#c8e6c9']}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { paddingBottom: insets.bottom + hp('2%') }
                        ]}
                    >
                        <View style={styles.header}>
                            <Button
                                icon={<Feather name="arrow-left" size={wp('6%')} color="#2e7d32" />}
                                onPress={() => router.back()}
                                type="clear"
                            />
                            <Text h4 style={styles.headerText}>Ayuda y Soporte</Text>
                        </View>

                        <View style={styles.section}>
                            <Text h4 style={styles.sectionTitle}>Preguntas Frecuentes</Text>
                            {faqs.map((faq, index) => (
                                <ListItem key={index} bottomDivider containerStyle={styles.faqItem}>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.question}>{faq.question}</ListItem.Title>
                                        <ListItem.Subtitle style={styles.answer}>{faq.answer}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.section}>
                            <Text h4 style={styles.sectionTitle}>Contacto</Text>
                            <Text style={styles.contactText}>
                                Si necesitas ayuda adicional, no dudes en contactarnos:
                            </Text>
                            <Button
                                title="Contactar Soporte"
                                onPress={handleContactSupport}
                                icon={<Icon name="mail" type="feather" color="white" size={wp('4%')} />}
                                buttonStyle={styles.contactButton}
                                titleStyle={styles.buttonTitle}
                            />
                        </View>

                        <Divider style={styles.divider} />
                    </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        padding: 20,
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
    section: {
        marginBottom: hp('3%'),
    },
    sectionTitle: {
        color: '#2e7d32',
        marginBottom: hp('1%'),
        fontSize: wp('5%'),
    },
    faqItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: wp('2%'),
        marginBottom: hp('1%'),
    },
    question: {
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: hp('0.5%'),
        fontSize: wp('4%'),
    },
    answer: {
        color: '#333',
        fontSize: wp('3.5%'),
    },
    divider: {
        backgroundColor: '#4CAF50',
        marginVertical: hp('2%'),
    },
    contactText: {
        fontSize: wp('4%'),
        color: '#333',
        marginBottom: hp('1%'),
    },
    contactButton: {
        backgroundColor: '#4CAF50',
        borderRadius: wp('6%'),
        paddingVertical: hp('1.5%'),
    },
    buttonTitle: {
        fontSize: wp('4%'),
    },
})