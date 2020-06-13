import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import LoginForm from '../../Components/account/LoginForm';
import Toast from 'react-native-easy-toast'

export default function Login() {
    const toastRef = useRef()
    return (
        <ScrollView>
            <Image
                source={require('../../../assets/img/nexo.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Toast
                ref={toastRef}
                position='center'
                opasity={0.9}
            />
        </ScrollView>
    );
}

function CreateAccount() {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            ¿Aun No tienes Una Cuenta?{ ' '}
            <Text onPress={() => navigation.navigate('register')}
                style={styles.btnRegister}
            >Registrate</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: '#ff6e17ff',
        fontWeight: 'bold'
    },
    divider: {
        backgroundColor: '#ff6e17ff',
        margin: 40
    }
})
