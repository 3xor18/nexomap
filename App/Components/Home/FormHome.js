import React, { useState, useRef } from 'react';
import { View, Picker, Text } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import Carousel from '../Carrousel'
import Loading from '../Loading'
import ProductDetail from '../ProductDetail';
import { useNavigation } from '@react-navigation/native'
import { firebaseApp } from '../../Utils/FirebaseConfig'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import uuid from 'random-uuid-v4'
import Toast from 'react-native-easy-toast'
import { ScrollView } from 'react-native';
const db = firebase.firestore(firebaseApp)

export default function FormHome(props) {
    const toastRef = useRef();
    const [isLoading, setisLoading] = useState(false)
    const navigation2 = useNavigation()
    const [selectedValue, setSelectedValue] = useState("Tiempo de Espera");
    const [cantidad, setCantidad] = useState(0)
    const { navigation, route } = props;
    const { id, nombre, desc,
        elaborado,
        marca,
        organico,
        ingredientes, unidadmedida } = route.params;

    navigation.setOptions({ title: nombre })

    const goHome = () => {
        navigation2.navigate('home')
    }

    const labelInput = `Unidad de Medida [${unidadmedida}]`

    const addSolicitud = () => {
        if (selectedValue === 'Tiempo de Espera') {
            toastRef.current.show("ERROR Seleccione Tiempo de Espera", 3000)
        } else if (cantidad <= 0) {
            toastRef.current.show("Ingrese Cantidad", 3000)
        } else {
            setisLoading(true)
            db.collection('ordenes')
                .add({
                    producto: { id: id, nombre: nombre, desc: desc, elaborado: elaborado, marca: marca, organico: organico, ingredientes: ingredientes, unidadmedida: unidadmedida },
                    estado: 'Buscando Math',
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid,
                    tiempoEspera: selectedValue,
                    cantidadPedido: cantidad
                }).then(() => {
                    setisLoading(false);
                    toastRef.current.show('Orden Creada!', 3000)
                    navigation2.navigate("buyStack");
                })
                .catch(() => {
                    setisLoading(false);
                    toastRef.current.show(
                        "Error al Intentar Crear la Orden, intentelo más tarde")
                })
        }
    }

    return (
        <ScrollView>
            <ProductDetail desc={desc} elaborado={elaborado}
                marca={marca} organico={organico} ingredientes={ingredientes}
            />

            <Input
                label={labelInput}
                placeholder='Cantidad'
                containerStyle={styles.input}
                onChange={e => setCantidad(e.nativeEvent.text)}
            />

            <Picker
                style={styles.select}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Tiempo de Espera" value="Tiempo de Espera" />
                <Picker.Item label="30 Minutos" value="30" />
                <Picker.Item label="1 Hora" value="60" />
            </Picker>
            <View style={styles.juntos}>
                <Button title='OK'
                    onPress={addSolicitud}
                    containerStyle={styles.btnContainer} buttonStyle={styles.btn} />
                <Button title='Cancelar'
                    onPress={goHome}
                    containerStyle={styles.btnContainer} buttonStyle={styles.btn} />
            </View>
            <Loading isVisible={isLoading}
                text='Creando Pedido' />
            <Toast
                ref={toastRef} position='center' opacity={0.9}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 10,
        width: '40%',
        marginLeft: 25
    },
    btn: {
        backgroundColor: '#ff6e17ff'
    },
    input: {
        marginTop: 20
    },
    select: {
        marginTop: 10
    },
    juntos: {
        flexDirection: 'row',
        marginTop: 10
    }
})