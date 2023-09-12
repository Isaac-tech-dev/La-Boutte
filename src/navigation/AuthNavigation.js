import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/onboarding/Splash";
import Swipe from "../screens/onboarding/Onboarding"
import Welcome from "../screens/auth/Welcome";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName="Splash">
      <AuthStack.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={Splash}
      />
       <AuthStack.Screen
        name="Onboarding"
        options={{ headerShown: false }}
        component={Swipe}
      />
      <AuthStack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <AuthStack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Register}
      />
      <AuthStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
