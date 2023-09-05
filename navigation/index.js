import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNaviagtion'
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../components/context";

const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setuserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setuserToken("fgkj");
      setIsLoading(false);
    },
    signOut: () => {
      setuserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setuserToken("fgkj");
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <View className="flex justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { userToken !== null ? (
          <AppNavigation />
        )
      :
          <AuthNavigation/>
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
