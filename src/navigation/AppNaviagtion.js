import { View, Text, LogBox } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Menu from "../screens/home/Menu";
import Cart from "../screens/home/Cart";
import Profile from "../screens/home/Profile";
import Menu_Drinks from "../screens/home/Menu_Drinks";
import FoodDetails from "../screens/details/FoodDetails";
import {
  Octicons,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        tabBarActiveTintColor: "#FE6400",
        tabBarInactiveTintColor: "#A7A7A7",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNaviagtion() {
  return (
    <Stack.Navigator
      initialRouteName="Hom"
      options={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="Hom"
        options={{ headerShown: false }}
        component={BottomNav}
      />
      <Stack.Screen
        name="Menu"
        options={{ headerShown: false }}
        component={Menu}
      />
      <Stack.Screen
        name="Menu_Drinks"
        options={{ headerShown: false }}
        component={Menu_Drinks}
      />
      <Stack.Screen
        name="FoodDetails"
        options={{ headerShown: false }}
        component={FoodDetails}
      />
    </Stack.Navigator>
  );
}
