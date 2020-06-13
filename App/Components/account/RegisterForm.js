import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../Utils/Validation'
import { size, isEmpty } from 'lodash'
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../Components/Loading'

export default function RegisterForm(props) {
    const { toasRef } = props
    const [mostarPass, setmostarPass] = useState(true)
    const [mostrarRepass, setmostrarRepass] = useState(true)
    const navigation = useNavigation()
    const [formData, setformData] = useState(defaultFormValue())
    const [isLoading, setisLoading] = useState(false)

    const oSubmit = () => {

        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repassword)) {
            toasRef.current.show('Todos Los campos Son Olbigatorios')
        } else if (!validateEmail(formData.email)) {
            toasRef.current.show('Email Invalid')
        } else if (formData.password !== formData.repassword) {
            toasRef.current.show('Claves No Coinciden')
        } else if (size(formData.password) < 6 || size(formData.repassword) < 6) {
            toasRef.current.show('Minimo 6 caracteres')
        } else {
            setisLoading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(resp => {
                    setisLoading(false)
                    navigation.navigate('account')
                }).catch(err => {
                    setisLoading(false)
                    toasRef.current.show('Email ya esta en uso')
                })
        }
    }

    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.iconRight}
                    />
                }
                onChange={x => onChange(x, 'email')}
            />
            <Input
                placeholder='Contraseña'
                password={true}
                secureTextEntry={mostarPass}
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={mostarPass ? 'eye-outline' : 'eye-off-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setmostarPass(!mostarPass)}
                    />
                }
                onChange={x => onChange(x, 'password')}
            />
            <Input
                placeholder='Repetir Contraseña'
                password={true}
                secureTextEntry={mostrarRepass}
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={mostrarRepass ? 'eye-outline' : 'eye-off-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setmostrarRepass(!mostrarRepass)}
                    />
                }
                onChange={x => onChange(x, 'repassword')}
            />
            <Button
                title='Unirse'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={oSubmit}
            />
            <Loading
                isVisible={isLoading}
                text={'Creando Usuario'}
            />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: '',
        password: '',
        repassword: ''
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%',
        marginTop: 20
    },
    btnContainerRegister: {
        marginTop: 20,
        width: '95%'
    },
    btnRegister: {
        backgroundColor: '#ff6e17ff'
    },
    iconRight: {
        color: '#c1c1c1'
    }
})