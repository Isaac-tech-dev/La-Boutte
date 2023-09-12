import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const navigation = useNavigation();

  const registerNavigate = () => {
    navigation.navigate("Register"); // Navigate to the next screen
  };

  const loginNavigate = () => {
    navigation.navigate("Login"); // Navigate to the next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* TOP DESIGN */}
        <View
          style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              backgroundColor: "linear-gradient(to bottom, #FE502D, #FE6400)",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../../assets/images/Logo.png")}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
            <Text
              style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}
            >
              La Nourriture
            </Text>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              We make the best for you
            </Text>
          </View>
        </View>

        {/* BOTTOM DESIGN */}
        <View>
          <View style={{ marginBottom: 40 }}>
            <TouchableOpacity
              onPress={registerNavigate}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: "#FE6400",
                borderRadius: 10,
                alignItems: "center",
                marginBottom: 10,
                width: 300,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
                Create an Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={loginNavigate}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: "#388B24",
                borderRadius: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}
                className="text-white text-base font-bold"
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 40 }}>
              Connect with
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 8,
                flexDirection: "row",
              }}
            >
              <FontAwesome5 name="facebook" size={24} color="#5675C5" />
              <FontAwesome name="google-plus" size={24} color="#F93F2D" />
              <AntDesign name="apple1" size={24} color="#88A396" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
