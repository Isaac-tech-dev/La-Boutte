import { StyleSheet, Text, View } from "react-native";
import Welcome from "../screens/auth/Welcome";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

export type AuthStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ForgotPasswordSuccess: undefined;
};
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <AuthStack.Screen name="Welcome" component={Welcome}/>
      <AuthStack.Screen name="Register" component={Register}/>
      <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;

const styles = StyleSheet.create({});
