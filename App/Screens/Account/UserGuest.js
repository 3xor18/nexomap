import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation();

    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image
                source={require('../../../assets/img/nexo.png')}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.title}>Perfil NexoMap</Text>
            <Text style={styles.description}>¿Necesitas Algo? Solo Crea tu perfil y selecciona lo que quieres comprar y espera que te lleguen Ofertas ¿Quieres Vender Algo? Registrate, Compra 1 plan, agrega Productos a veder y espera que te lleguen solicitudes</Text>
            <View style={styles.view}>
                <Button
                    title='Ver Tu Perfil'
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        width: '100%',
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        marginBottom: 20
    },
    btnStyle: {
        backgroundColor: '#ff6e17ff'
    },
    btnContainer: {
        width: '70%',
    },
    view: {
        flex: 1,
        alignItems: 'center'
    }
})
