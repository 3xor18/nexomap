import React, { useState } from 'react';
import { View, Picker, Text } from 'react-native';
import { Input, Button } from 'react-native-elements'

export default function FormHome() {
    const [selectedValue, setSelectedValue] = useState("30 Minutos");
    return (
        <View>
            <Input
                label='Cantidad De Producto'
                placeholder='Cantidad'
            />
            <Text>Tiempo de Espera</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="30 Minutos" value="30 Minutos" />
                <Picker.Item label="1 Hora" value="js" />
            </Picker>
            <Button title='OK' /><Button title='Cancelar' />
        </View>
    );
}
