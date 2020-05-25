import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import HomeStack from '../Navigation/HomeStack'
import AccountStack from '../Navigation/AccountStack'
import BuyStack from '../Navigation/BuyStack'
import SellStack from '../Navigation/SellStack'
import FindStack from './FindStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="home"
                tabBarOptions={{
                    inactiveTintColor: '#646464',
                    activeTintColor: '#ff6e17ff'
                }}
                screenOptions={
                    ({ route }) => ({
                        tabBarIcon: ({ color }) => screenOptions(route, color)
                    })
                }
            >
                <Tab.Screen name="homeStack" component={HomeStack}
                    options={{ title: "Ofertas" }} />
                <Tab.Screen name="buyStack" component={BuyStack}
                    options={{ title: "Compras" }} />
                <Tab.Screen name="findStack" component={FindStack}
                    options={{ title: "Solicitudes" }} />
                <Tab.Screen name="sellStack" component={SellStack}
                    options={{ title: "Ventas" }} />
                <Tab.Screen name="accountStack" component={AccountStack}
                    options={{ title: "Perfil" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route, color) {
    let iconName;
    switch (route.name) {
        case 'accountStack':
            iconName = 'account-circle-outline'
            break;

        case 'homeStack':
            iconName = 'home-outline'
            break;

        case 'buyStack':
            iconName = 'cart-outline'
            break;

        case 'sellStack':
            iconName = 'cart-arrow-right'
            break;

        case 'findStack':
            iconName = 'charity'
            break

        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={22} color={color} />
    )
}