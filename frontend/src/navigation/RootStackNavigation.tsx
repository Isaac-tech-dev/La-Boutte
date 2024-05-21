import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootBottomTabNavigtion from './RootBottomTabNavigtion'
import MenuDescription from '../screens/main/menu/MenuDescription';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

export type RootStackParamList = {
  MainTab: undefined;
  MenuDescription: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <RootStack.Screen name="MainTab" component={RootBottomTabNavigtion} />
      <RootStack.Screen name="MenuDescription" component={MenuDescription} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigation

const styles = StyleSheet.create({})