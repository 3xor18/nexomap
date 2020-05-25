import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { Input } from 'react-native-elements'

export default function ListProducts() {
    const navigation = useNavigation();
    const products = [
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
    return (
        <View>
            <Input
                style={styles.input}
                placeholder='Buscar'
                rightIcon={{ type: 'material-community', name: 'magnify' }} />
            <FlatList
                data={products}
                renderItem={({ item }) => <Products title={item.title} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

function Products(props) {
    const { title, navigation } = props
    const goProduct = () => {
        navigation.navigate('formhome')
    }

    return (
        <TouchableOpacity onPress={goProduct}>
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
                    <Text style={styles.producName}>Nombre de Producto</Text>
                    <Text style={styles.producdesc}>Descripcion de Producto</Text>
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