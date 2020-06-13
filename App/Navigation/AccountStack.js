import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../Screens/Account/LoginScreen';
import RegisterScreen from '../Screens/Account/RegisterScreen';
import AccountScreen from '../Screens/Account/AccountScreen'
import MyProducts from '../Components/account/MyProducts';
const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='account' component={AccountScreen} options={{ title: 'Cuenta' }} />
            <Stack.Screen name='login' component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name='register' component={RegisterScreen} options={{ title: 'Registro' }} />
            <Stack.Screen name='myproduts' component={MyProducts} options={{ title: 'Productos en Venta' }} />
        </Stack.Navigator>
    );
}
