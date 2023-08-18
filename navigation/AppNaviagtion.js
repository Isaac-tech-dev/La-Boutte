import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash';
import Splash_1 from '../screens/Splash-1';
import Splash_2 from '../screens/Splash-2';
import Splash_3 from '../screens/Spalsh-3';
import Welcome from '../screens/auth/Welcome'
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'
import Home from '../screens/home/Home';
import Menu from '../screens/home/Menu';
import Cart from '../screens/home/Cart'
import Profile from '../screens/home/Profile'
import Menu_Drinks from '../screens/home/Menu_Drinks'
import FoodDetails from '../screens/details/FoodDetails';
import {Octicons, MaterialCommunityIcons, Entypo, Ionicons} from "@expo/vector-icons";




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

function BottomNav () {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: ({ color, size }) => (
            <Octicons name='home' color="black" size={24} /> ),}}/>
            <Tab.Screen name="Cart" component={Cart} options={{headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={24} color="black" /> ),}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={24} color="black" /> ),}}/>
        </Tab.Navigator>
    )
}

// function AuthNavigation () {
//     return (
//         <Stack.Navigator initialRouteName="Splash" headerMode="none">
//             <Stack.Screen name="Splash" options={{headerShown: false}} component={Splash}/>
//             <Stack.Screen name="Splash1" options={{headerShown: false}} component={Splash_1}/>
//             <Stack.Screen name="Splash2" options={{headerShown: false}} component={Splash_2}/>
//             <Stack.Screen name="Splash3" options={{headerShown: false}} component={Splash_3}/>
//             <Stack.Screen name="Welcome" options={{headerShown: false}}  component={Welcome}/>
//             <Stack.Screen name="Register" options={{headerShown: false}}  component={Register}/>
//             <Stack.Screen name="Login" options={{headerShown: false}}  component={Login}/>
//         </Stack.Navigator>
//     )
// }

// function HomeNavigation () {
//     return (
//     <Stack.Navigator headerMode="none">
//         <Stack.Screen name="Auth" options={{headerShown: false}} component={AuthNavigation}/>
//         <Stack.Screen name="Home" options={{headerShown: false}}  component={Home}/>
//         <Stack.Screen name="Menu" options={{headerShown: false}}  component={Menu}/>
//         <Stack.Screen name="Menu_Drinks" options={{headerShown: false}}  component={Menu_Drinks}/>
//         <Stack.Screen name="FoodDetails" options={{headerShown: false}}  component={FoodDetails}/>
//     </Stack.Navigator>
//     )
//   }

export default function AppNaviagtion() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" options={{headerShown: false}}>
            <Stack.Screen name="Splash" options={{headerShown: false}} component={Splash}/>
            <Stack.Screen name="Splash1" options={{headerShown: false}} component={Splash_1}/>
            <Stack.Screen name="Splash2" options={{headerShown: false}} component={Splash_2}/>
            <Stack.Screen name="Splash3" options={{headerShown: false}} component={Splash_3}/>
            <Stack.Screen name="Welcome" options={{headerShown: false}}  component={Welcome}/>
            <Stack.Screen name="Register" options={{headerShown: false}}  component={Register}/>
            <Stack.Screen name="Login" options={{headerShown: false}}  component={Login}/>
            <Stack.Screen name="Home" options={{headerShown: false}}  component={BottomNav}/>
            <Stack.Screen name="Menu" options={{headerShown: false}}  component={Menu}/>
            <Stack.Screen name="Menu_Drinks" options={{headerShown: false}}  component={Menu_Drinks}/>
            <Stack.Screen name="FoodDetails" options={{headerShown: false}}  component={FoodDetails}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}