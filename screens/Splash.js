import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set the delay interval (between 5 and 10 seconds)
    // const delayInterval = Math.floor(Math.random() * 6000) + 5000;

    // Wait for the specified delay before navigating
    const delayTimer = setTimeout(() => {
      // Navigate to the next screen
      navigation.navigate("Splash1"); // Replace 'NextScreen' with the actual screen name
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(delayTimer);
  }, [navigation]);

  return (
    <ScreenWrapper className="p-4 m-4 flex-1">
      <StatusBar style="dark" />
      <View className="h-full p-2 m-2 flex flex-col item-center justify-center">
        <View
          className="flex-auto justify-center items-center"
          style={{
            backgroundColor: "linear-gradient(to bottom, #FE502D, #FE6400)",
          }}
        >
          <Image
            source={require("../assets/images/Logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-xl font-bold">La Nourriture</Text>
          <Text className="text-sm font-medium mt-2">
            We make the best for you
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
