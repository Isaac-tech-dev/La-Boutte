import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import * as LightTheme from '../constants/themes/LightTheme.json';
import * as DarkTheme from '../constants/themes/DarkTheme.json';
import AuthStackNavigation from "./AuthStackNavigation";
import RootStackNavigation from "./RootStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default Navigation;
