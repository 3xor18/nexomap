import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function FormSell() {
    return (
        <View>
            <Text>Nombre Del Producto</Text>
            <Text>Cantidad Del Producto</Text>
            <Text>GeoLocalizacion</Text>
            <Text>Tiempo de Espera</Text>
            <Text></Text><Text></Text>
            <Text>Datos del Comprador</Text>
            <Text>Datos del Comprador</Text>
            <Text>Datos del Comprador</Text>
            <Text>Datos del Comprador</Text>
            <Text></Text><Text></Text>
            <Button title='Ir A Destino' />
            <Button title='Entregado' />
            <Button title='Cancelar' />
        </View>
    );
}
