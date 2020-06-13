import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { Input } from 'react-native-elements'

export default function ListProducts(props) {
    const navigation = useNavigation()
    const { products } = props

    return (
        <View>
            {size(products) > 0 ? (
                <FlatList
                    data={products}
                    renderItem={(product) => <Buys product={product} navigation={navigation} />}
                    keyExtractor={item => item.id}
                />
            ) : (
                    <View style={styles.loaderRestaurants}>
                        <ActivityIndicator size="large" />
                        <Text>Cargando Productos</Text>
                    </View>
                )}
        </View>
    );
}

function Buys(props) {
    const { product, navigation } = props
    const { nombre, desc, id, elaborado, marca, organico, ingredientes, unidadmedida } = product.item
    console.log(product)
    const goCompra = () => {
        navigation.navigate('formhome', {
            id,
            nombre,
            desc,
            elaborado,
            marca,
            organico,
            ingredientes,
            unidadmedida
        })
    }
    return (
        <TouchableOpacity onPress={goCompra}>
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
                    <Text style={styles.producName}>{nombre}</Text>
                    <Text style={styles.producdesc}>Descripcion:{desc}</Text>
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
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
})