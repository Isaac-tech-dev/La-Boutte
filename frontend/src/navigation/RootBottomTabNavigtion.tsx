import { StyleSheet } from "react-native";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type RootBottomTabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const ACTIVE = "#FE6400";
const INACTIVE = "#AFBDC4";
const ICON_SIZE = 26;

/** Tab icon that swaps between the filled (active) and outline (inactive) SVG. */
const tabIcon =
  (active: string, inactive: string) =>
  ({ focused }: { focused: boolean }) => (
    <SvgXml xml={focused ? active : inactive} width={ICON_SIZE} height={ICON_SIZE} />
  );

const RootBottomTabNavigtion = () => {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        // Use the tab bar's own label slot. Text placed inside tabBarIcon gets squeezed
        // into the icon's narrow box in React Navigation 7, which is what wrapped "Hom / e".
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: styles.label,
        // Room for a 26px icon + label, plus the iPhone home-indicator inset.
        tabBarStyle: [
          styles.bar,
          {
            backgroundColor: dark ? "#1A1A1A" : "#FFFFFF",
            height: 62 + insets.bottom,
            paddingBottom: insets.bottom + 6,
          },
        ],
      }}
    >
      <RootBottomTab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: tabIcon(HOME, NHOME) }}
      />
      <RootBottomTab.Screen
        name="Menu"
        component={Menu}
        options={{ tabBarIcon: tabIcon(MENU, NMENU) }}
      />
      <RootBottomTab.Screen
        name="Cart"
        component={Cart}
        options={{ tabBarIcon: tabIcon(CART, NCART) }}
      />
      <RootBottomTab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: tabIcon(PROFILE, NPROFILE) }}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootBottomTabNavigtion;

const styles = StyleSheet.create({
  bar: {
    paddingTop: 6,
    borderTopWidth: 0,
    // Soft shadow along the top edge
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
