import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements'
import { size, isEmpty } from 'lodash'
import { validateEmail } from '../../Utils/Validation'
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../Components/Loading'

export default function LoginForm(props) {
    const navigation = useNavigation()
    const { toastRef } = props
    const [verpass, setverpass] = useState(true)
    const [formData, setformData] = useState(defaultValueForm())
    const [isLoading, setisLoading] = useState(false)

    const onSumit = () => {
        const { email, password } = formData
        if (isEmpty(email) || isEmpty(password)) {
            toastRef.current.show('Todos los campos Obligatorios')
        } else if (size(password) < 6) {
            toastRef.current.show('Password mayor a 6')
        } else if (!validateEmail(email)) {
            toastRef.current.show('Email errado')
        } else {
            setisLoading(true)
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    setisLoading(false)
                    console.log(">>>Aquiiii")
                    navigation.navigate('account')
                }).catch(e => {
                    setisLoading(false)
                    toastRef.current.show('Credenciales Erradas')
                })
        }
    }

    const onChage = (event, type) => {
        setformData({ ...formData, [type]: event.nativeEvent.text });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Email'
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={(event) => onChage(event, 'email')}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={verpass}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={verpass ? 'eye-outline' : 'eye-off-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setverpass(!verpass)}
                    />
                }
                onChange={(event) => onChage(event, 'password')}
            />
            <Button
                title='Acceder'
                containerStyle={styles.btnLogin}
                buttonStyle={styles.btn}
                onPress={onSumit}
            />
            <Loading
                text='Accediendo...'
                isVisible={isLoading}
            />
        </View>
    );
}

function defaultValueForm() {
    return {
        email: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%'
        , marginTop: 20
    },
    btnLogin: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#ff6e17ff'
    },
    iconRight: {
        color: '#c1c1c1'
    }
})