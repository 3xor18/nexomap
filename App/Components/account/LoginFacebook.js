import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements'
import * as firebase from 'firebase'
import * as facebook from 'expo-facebook'
import { facebookApi } from '../../utils/Social'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../components/Loading'

export default function LoginFacebook(props) {
    const navigation = useNavigation()
    const { toastRef } = props
    const [isLoading, setisLoading] = useState(false)

    const login = async () => {
        await facebook.initializeAsync(facebookApi.application_id);
        const { type, token } = await facebook.logInWithReadPermissionsAsync({
            permissions: facebookApi.permissions
        })

        if (type === 'success') {
            setisLoading(true)
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials)
                .then(() => {
                    setisLoading(false)
                    navigation.navigate('account')
                }).catch(() => {
                    setisLoading(false)
                    toastRef.current.show('Credenciales Erradas')
                })
        } else if (type === 'cancel') {
            toastRef.current.show('Inicio Cancelado')
        } else {
            toastRef.current.show('Error al Intentar Iniciar')
        }
    }

    return (
        <>
            <SocialIcon
                title='Iniciar con Facebook'
                button
                type='facebook'
                onPress={login}
            />
            <Loading
                isVisible={isLoading}
                text='Accediendo...'
            />
        </>
    );
}
