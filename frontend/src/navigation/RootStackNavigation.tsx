import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RootBottomTabNavigtion from './RootBottomTabNavigtion'
import MenuDescription from '../screens/main/menu/MenuDescription';
import EditProfile from '../screens/main/profile/EditProfile';
import Settings from '../screens/main/profile/Settings';

export type RootStackParamList = {
  MainTab: undefined;
  MenuDescription: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
  };
  EditProfile: undefined;
  Settings: undefined;
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
      <RootStack.Screen name="EditProfile" component={EditProfile} />
      <RootStack.Screen name="Settings" component={Settings} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigation

const styles = StyleSheet.create({})