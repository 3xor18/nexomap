import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function InfoUser(props) {
    const { toastRef, userInfo: { uid, photoURL, displayName, email }, setLoadingText, setLoading } = props
    const changeAvatar = async () => {
        const restulPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = restulPermissions.permissions.cameraRoll.status;
        if (resultPermissionCamera === 'denied') {
            toastRef.current.show("Es Necesario Aceptar Los Permisos de la Galeria")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (result.cancelled) {
                toastRef.current.show('Has Cerrado la Galeria')
            } else {
                uploadImage(result.uri).then(() => {
                    updatePhotoUrl();
                }).catch(() => {
                    toastRef.current.show("Error al Subir la Foto")
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        setLoadingText('Actualizando Avatar')
        setLoading(true)
        const resposne = await fetch(uri);
        const blob = await resposne.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob)
    }

    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = { photoURL: response, }
                await firebase.auth().currentUser.updateProfile(update)
                setLoading(false)
            })
            .catch(() => {
                toastRef.current.show('Error al Actualizar El Avatar')
            })
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size='large'
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : require('../../../assets/img/avatar.jpg')}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : 'Anonimo'}</Text>
                <Text>{email ? email : 'Anonimo'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfoAvatar: {
        marginRight: 20
    },
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    }
})