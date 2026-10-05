import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import LightThemeJson from "../constants/themes/LightTheme.json";
import DarkThemeJson from "../constants/themes/DarkTheme.json";
import AuthStackNavigation from "./AuthStackNavigation";
import RootStackNavigation from "./RootStackNavigation";
import {
  NavigationContainer,
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import type { Theme } from "../types/theme";

// React Navigation 7 themes must include `fonts`, so start from its built-in themes
// and layer the app's colours on top.
const LightTheme: Theme = {
  ...NavigationLightTheme,
  dark: false,
  colors: { ...NavigationLightTheme.colors, ...LightThemeJson.colors },
};
const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: { ...NavigationDarkTheme.colors, ...DarkThemeJson.colors },
};

import { useAppSelector } from "../redux/hooks/hook";

const Navigation = () => {
  const settings = useAppSelector(state => state.settings);
  const appearance = useColorScheme();
  const displaymode = useAppSelector((state) => state.settings.displaymode);
  const user = useAppSelector((state) => state.user);

  const checkIfUserIsLoggedIn = () => {
    return user.accessToken && user.loggedIn;
  };

  const returnAppTheme = () => {
    if (!settings || settings.displaymode == 'none') {
      return appearance == 'dark' ? DarkTheme : LightTheme;
    }
    return settings.displaymode == 'dark' ? DarkTheme : LightTheme;
  };

  return (
      <NavigationContainer
      theme={returnAppTheme()}
      // theme={DarkTheme}
      >
        {checkIfUserIsLoggedIn() ? (
          <RootStackNavigation />
        ) : (
          <AuthStackNavigation />
        )}
      </NavigationContainer>
  );
};

export default Navigation;
