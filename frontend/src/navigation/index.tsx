import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthStackNavigation from "./AuthStackNavigation";
import RootStackNavigation from "./RootStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAppSelector } from "../redux/hooks/hook";

const Navigation = () => {
  const displaymode = useAppSelector((state) => state.settings.displaymode);
  const user = useAppSelector((state) => state.user);

  const checkIfUserIsLoggedIn = () => {
    return user.accessToken && user.loggedIn;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
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
