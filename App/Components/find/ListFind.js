import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { Input } from 'react-native-elements'

export default function ListFind() {
    const navigation = useNavigation()
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
    return (
        <View>
            <FlatList
                data={buys}
                renderItem={({ item }) => <Buys title={item.title} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

function Buys(props) {
    const { title, navigation } = props
    const goCompra = () => {
        navigation.navigate('formfind')
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
                    <Text style={styles.producName}>Nombre de Producto</Text>
                    <Text style={styles.producdesc}>Cantidad Pedida= 1 KG</Text>
                    <Text style={styles.producdesc}>Tiempo: 30 Minutos</Text>
                    <Text style={styles.producdesc}>Estado: Buscando Match</Text>
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