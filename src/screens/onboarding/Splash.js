import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set the delay interval (between 5 and 10 seconds)
    // const delayInterval = Math.floor(Math.random() * 6000) + 5000;

    // Wait for the specified delay before navigating
    const delayTimer = setTimeout(() => {
      // Navigate to the next screen
      navigation.navigate("Onboarding"); // Replace 'NextScreen' with the actual screen name
    }, 2500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(delayTimer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ backgroundColor: "linear-gradient(to bottom, #FE502D, #FE6400)", alignItems: 'center', marginBottom: 20}}>
        <Image source={require("../../../assets/images/Logo.png")} style={{ width: 100, height: 100, marginBottom: 10}}/>
        <Text style={{textAlign:'center', fontSize: 20, marginBottom: 10}}>La Nourriture</Text>
        <Text style={{textAlign:'center', fontSize: 16,}}>We make the best for you</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
