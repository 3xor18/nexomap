import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name='register' component={RegisterScreen} options={{ title: 'Registro' }} />
        </Stack.Navigator>
    );
}
