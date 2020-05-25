import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindScreen from '../Screens/FindScreen';
import FormFind from '../Components/find/FormFind';
const Stack = createStackNavigator()

export default function FindStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='find' component={FindScreen} options={{ title: 'Productos Solicitados' }} />
            <Stack.Screen name='formfind' component={FormFind} options={{ title: 'Producto Seleccionado' }} />
        </Stack.Navigator>
    );
}
