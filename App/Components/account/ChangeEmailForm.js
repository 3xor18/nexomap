import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../Utils/Validation'
import { reauthenticate } from '../../Utils/Api'
import * as firebase from 'firebase'

export default function ChangeEmailForm(props) {
    const { email, setshowModal, toastRef, setReloadUserInfo } = props
    const [errors, seterrors] = useState({})
    const [isLoading, setisLoadi] = useState(false)
    const [formData, setFormData] = useState(defaultValue())
    const [passwordVisible, setPasswordVisible] = useState(true)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {
        seterrors({})
        if (!formData.email || email === formData.email) {
            seterrors({
                email: 'El Email No ha Cambiado.'
            })
        } else if (!validateEmail(formData.email)) {
            seterrors({
                email: 'El Email Esta incorrecto'
            })
        } else if (!formData.password) {
            seterrors({
                password: 'Password Requerida'
            })
        } else {
            setisLoadi(true)
            reauthenticate(formData.password).then(response => {
                firebase.auth()
                    .currentUser
                    .updateEmail(formData.email)
                    .then(() => {
                        setisLoadi(false)
                        setReloadUserInfo(true)
                        toastRef.current.show('Email Actualizado')
                        setshowModal(false)
                    }).catch(() => {
                        seterrors({ email: 'Error al Intentar Cambiar el Email' })
                        setisLoadi(false)
                    })
            }).catch(() => {
                setisLoadi(false)
                seterrors({ password: 'Password Errado' })
            })
        }
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.input}
                errorMessage={errors.email}
                defaultValue={email || ''}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
                onChange={(e) => onChange(e, 'email')}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={passwordVisible}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                        color='#c2c2c2'
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
                errorMessage={errors.password}
                onChange={(e) => onChange(e, 'password')}
            />
            <Button
                title='Cambiar Email'
                loading={isLoading}
                containerStyle={styles.btnContainerStyle}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
        </View>
    );
}

function defaultValue() {
    return {
        email: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainerStyle: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#ff6e17ff'
    }
})