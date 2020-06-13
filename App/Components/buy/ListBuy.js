import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { Input } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from '../../Utils/FirebaseConfig';
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListBuy() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [ordenes, setOrdenes] = useState([]);
    const [totalOrdenes, setTotalOrdenes] = useState(0);
    const [startOrdenes, setStartOrdenes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const limitOrdenes = 10;

    const buys = [
        {
            id: 'ad7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: 'bac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: 'c8694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: 'dd7acbea-c1b11-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: 'eac68afc-c6205-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: 'f8694a0f-3da31-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: 'gd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: 'hac68afc-c6045-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: 'i8694a0f-3da51-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    useFocusEffect(
        useCallback(() => {
            firebase.auth().onAuthStateChanged((userInfo) => {
                db.collection("ordenes")
                    .get()
                    .then((snap) => {
                        setTotalOrdenes(snap.size);
                    });
                const resultOrdenes = [];
                db.collection("ordenes")
                    .where("createBy", "==", userInfo.uid)
                    .get()
                    .then((response) => {
                        setStartOrdenes(response.docs[response.docs.length - 1]);
                        response.forEach((doc) => {
                            const orden = doc.data();
                            orden.id = doc.id;
                            resultOrdenes.push(orden);
                        });
                        setOrdenes(resultOrdenes);
                    });
            })
        }, [])
    );

    return (
        <View>
            <FlatList
                data={ordenes}
                renderItem={({ item }) => <Buys ordenIn={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

function Buys(props) {
    const { ordenIn, navigation } = props
    const { producto
        , estado, cantidadPedido, tiempoEspera } = ordenIn
    const goProducto = () => {
        navigation.navigate('buyform')
    }
    return (
        <TouchableOpacity onPress={goProducto}>
            <View style={styles.viewProduct}>
                <View style={styles.viewProductImage}>
                    <Image
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                        style={styles.imageProduct}
                    />
                </View>
                <View>
                    <Text style={styles.producName}>{producto.nombre}</Text>
                    <Text style={styles.producdesc}>Cantidad Pedida: {cantidadPedido}</Text>
                    <Text style={styles.producdesc}>Tiempo: {tiempoEspera}</Text>
                    <Text style={styles.producdesc}>Estado: {estado}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewProduct: {
        flexDirection: "row",
        margin: 10,
    },
    viewProductImage: {
        marginRight: 15,
    },
    imageProduct: {
        width: 80,
        height: 80,
    },
    producName: {
        fontWeight: "bold",
    },
    producdesc: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    },
    input: {
        marginTop: 10,
        marginBottom: 15
    }
})