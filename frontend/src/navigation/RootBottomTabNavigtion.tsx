import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  HOME,
  MENU,
  CART,
  PROFILE,
  NHOME,
  NMENU,
  NCART,
  NPROFILE,
} from "../svg";
import Home from "../screens/main/Home";
import Menu from "../screens/main/menu/Menu";
import Cart from "../screens/main/Cart";
import Profile from "../screens/main/profile/Profile";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

export type RootBottomTabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const RootBottomTabNavigtion = () => {
  const {dark, colors} = useTheme();
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: dark? "#1a1a1a" : 'rgb(255, 255, 255)',
          paddingHorizontal: 20,
          paddingVertical: 10,
          height: 90,
          // Shadow properties
          shadowColor: "#000", // Shadow color
          shadowOffset: {
            width: 0,
            height: -2.5, // Negative value to create a shadow at the top
          },
          shadowOpacity: 0.25, // Adjust the opacity
          shadowRadius: 3.84, // Adjust the blur radius
          elevation: 5, // Required for Android to show shadow
        },
      }}
    >
      <RootBottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex-col justify-center items-center`}>
              {focused ? (
                <SvgXml xml={HOME} width={30} height={30} />
              ) : (
                <SvgXml xml={NHOME} width={30} height={30} />
              )}

              <Text
                className={`${
                  focused ? "text-[#FE6400]" : "text-[#afbdc4]"
                } text-[12px] mt-[2.5px]`}
                style={{ fontFamily: "bold" }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <RootBottomTab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex-col justify-center items-center`}>
              {focused ? (
                <SvgXml xml={MENU} width={30} height={30} />
              ) : (
                <SvgXml xml={NMENU} width={30} height={30} />
              )}

              <Text
                className={`${
                  focused ? "text-[#FE6400]" : "text-[#afbdc4]"
                } text-[12px] mt-[2.5px]`}
                style={{ fontFamily: "bold" }}
              >
                Menu
              </Text>
            </View>
          ),
        }}
      />

      <RootBottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex-col justify-center items-center`}>
              {focused ? (
                <SvgXml xml={CART} width={30} height={30} />
              ) : (
                <SvgXml xml={NCART} width={30} height={30} />
              )}

              <Text
                className={`${
                  focused ? "text-[#FE6400]" : "text-[#afbdc4]"
                } text-[12px] mt-[2.5px]`}
                style={{ fontFamily: "bold" }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />

      <RootBottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex-col justify-center items-center`}>
              {focused ? (
                <SvgXml xml={PROFILE} width={30} height={30} />
              ) : (
                <SvgXml xml={NPROFILE} width={30} height={30} />
              )}

              <Text
                className={`${
                  focused ? "text-[#FE6400]" : "text-[#afbdc4]"
                } text-[12px] mt-[2.5px]`}
                style={{ fontFamily: "bold" }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootBottomTabNavigtion;

const styles = StyleSheet.create({});
