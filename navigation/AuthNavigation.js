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




const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AuthNaviagtion() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="Splash" options={{headerShown: false}} component={Splash}/>
            <Stack.Screen name="Splash1" options={{headerShown: false}} component={Splash_1}/>
            <Stack.Screen name="Splash2" options={{headerShown: false}} component={Splash_2}/>
            <Stack.Screen name="Splash3" options={{headerShown: false}} component={Splash_3}/>
            <Stack.Screen name="Welcome" options={{headerShown: false}}  component={Welcome}/>
            <Stack.Screen name="Register" options={{headerShown: false}}  component={Register}/>
            <Stack.Screen name="Login" options={{headerShown: false}}  component={Login}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}