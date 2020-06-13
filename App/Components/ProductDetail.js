import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import Carousel from '../Components/Carrousel'
import Loading from '../Components/Loading'
const screenWidth = Dimensions.get('window').width

export default function ProductDetail(props) {
    const { nombre, desc,
        elaborado,
        marca,
        organico,
        ingredientes } = props

    const arrayi = ['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png']

    return (
        <ScrollView vertical >
            <Carousel
                arrayImages={arrayi}
                height={250}
                width={screenWidth}
            />
            <Text style={styles.desc}>{desc}</Text>
            <View style={styles.separado}>
                <Text style={styles.nombre}>Origen:</Text><Text>{elaborado}</Text>
                <Text style={styles.nombre}>Organico:</Text><Text>{organico}</Text>
            </View>
            <View style={styles.separado}>
                <Text style={styles.nombre}>Ingredientes:</Text><Text>
                    {
                        ingredientes.map(ing => (
                            ing + ', '
                        ))
                    }
                </Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    desc: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 15
    },
    nombre: {
        marginLeft: 15,
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 14
    },
    separado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewRestaurantTitle: {
        padding: 15
    },
    nameRest: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    descriptionRest: {
        marginTop: 5,
        color: 'grey'
    },
    raiting: {
        position: 'absolute',
        marginTop: 25,
        marginRight: 15,
        right: 0
    },
    viewRestaruntaInfo: {
        marginTop: 10
    },
    restaurnatInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1
    }
})