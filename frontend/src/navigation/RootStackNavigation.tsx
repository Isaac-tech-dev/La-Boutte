import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootBottomTabNavigtion from './RootBottomTabNavigtion'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

export type RootStackParamList = {
  MainTab: undefined
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
    </RootStack.Navigator>
  )
}

export default RootStackNavigation

const styles = StyleSheet.create({})