import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import { useNavigation } from '@react-navigation/native'

export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo } = props
    const [showModal, setshowModal] = useState(false)
    const [renderComponent, setrenderComponent] = useState(null)
    const navigation = useNavigation();

    const selectedComponent = (key) => {
        switch (key) {
            case 'DisplayName':
                setrenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setshowModal={setshowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />)
                setshowModal(true)
                break;

            case 'DisplayEmail':
                setrenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setshowModal={setshowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                )
                setshowModal(true)
                break;

            case 'DisplayPasword':
                setrenderComponent(
                    <ChangePasswordForm
                        setshowModal={setshowModal}
                        toastRef={toastRef}
                    />
                )
                setshowModal(true)
                break;

            case 'myproduts':
                navigation.navigate('myproduts')
                break;

            default:
                setrenderComponent(false);
                setshowModal(false)
                break;
        }
    }
    const menuOptions = generatedOptions(selectedComponent)

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent && (
                <Modal
                    isVisible={showModal} setIsVisible={setshowModal} >
                    {renderComponent}
                </Modal>
            )}
        </View>
    );
}

function generatedOptions(selectedComponent) {
    return [
        {
            title: 'Cambiar Nombre Y Apellidos',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('DisplayName')
        },
        {
            title: 'Cambiar Email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('DisplayEmail')
        },
        {
            title: 'Cambiar Contraseña',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('DisplayPasword')
        },
        {
            title: 'Productos en Venta',
            iconType: 'material-community',
            iconNameLeft: 'cart',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('myproduts')
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})