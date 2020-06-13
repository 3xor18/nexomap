import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase'


export default function ChangeDisplayNameForm(props) {
    const { displayName, setshowModal, toastRef, setReloadUserInfo } = props
    const [newDisplayName, setnewDisplayName] = useState(null)
    const [error, seterror] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = () => {
        seterror(null)
        if (!newDisplayName) {
            seterror('El Nombre No Puede Estar Vasio')
        } else if (displayName === newDisplayName) {
            seterror('Es El Mismo Nombre')
        } else {
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser
                .updateProfile(update)
                .then(() => {
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setshowModal(false)
                })
                .catch(() => {
                    seterror('Error al Intentar Cambiar El Nombre')
                    setIsLoading(false)
                })
        }
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Ingrese Nuevo Nombre'
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={displayName || ''}
                onChange={e => setnewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar Nombre'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#ff6e17ff'
    }
})