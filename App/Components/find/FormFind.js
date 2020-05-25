import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function FormFind() {
    return (
        <View>
            <Text>Nombre Del Producto</Text>
            <Text>Cantidad Del Producto</Text>
            <Text>GeoLocalizacion</Text>
            <Text>Tiempo de Espera</Text>
            <Text></Text><Text></Text><Text></Text>

            <Input
                placeholder='Ingrese Oferta'
            />
            <Input
                placeholder='Ingrese Tiempo'
            />
            <Button title='OK' />
            <Button title='Cancelar' />
        </View>
    );
}
