import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SellScreen from '../Screens/SellScreen'
import FormSell from '../Components/sell/FormSell';
const Stack = createStackNavigator()

export default function SellStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='sell' component={SellScreen} options={{ title: 'Mis Ventas' }} />
            <Stack.Screen name='formSell' component={FormSell} options={{ title: 'Venta Seleccionada' }} />

        </Stack.Navigator>
    );
}
