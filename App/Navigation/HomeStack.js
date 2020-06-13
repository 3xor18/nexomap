import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import FormHome from '../Components/Home/FormHome';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={HomeScreen} options={{ title: 'NexoMap' }} />
            <Stack.Screen name='formhome' component={FormHome} />
        </Stack.Navigator>
    );
}
