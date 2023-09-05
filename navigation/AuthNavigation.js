import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Splash_1 from "../screens/Splash-1";
import Splash_2 from "../screens/Splash-2";
import Splash_3 from "../screens/Spalsh-3";
import Welcome from "../screens/auth/Welcome";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={Splash}
      />
      <AuthStack.Screen
        name="Splash1"
        options={{ headerShown: false }}
        component={Splash_1}
      />
      <AuthStack.Screen
        name="Splash2"
        options={{ headerShown: false }}
        component={Splash_2}
      />
      <AuthStack.Screen
        name="Splash3"
        options={{ headerShown: false }}
        component={Splash_3}
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
