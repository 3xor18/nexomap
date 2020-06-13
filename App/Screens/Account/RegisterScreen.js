import React, { useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RegisterForm from '../../Components/account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

export default function RegisterScreen() {
    const toasRef = useRef()
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../assets/img/nexo.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <RegisterForm toasRef={toasRef} />
            </View>
            <Toast
                ref={toasRef}
                position='center'
                opacity={0.9}
            />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
})
