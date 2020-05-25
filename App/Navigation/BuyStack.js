import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BuyScreen from '../Screens/BuyScreen'
import FormBuy from '../Components/buy/FormBuy'
const Stack = createStackNavigator()

export default function BuyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='buy' component={BuyScreen} options={{ title: 'Mis Compras' }} />
            <Stack.Screen name='buyform' component={FormBuy} options={{ title: 'Compra Seleccionada' }} />
        </Stack.Navigator>
    );
}
