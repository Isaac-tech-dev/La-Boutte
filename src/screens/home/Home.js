import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResturantCard from "../../components/ResturantCard";

export default function Home() {
  const navigation = useNavigation();

  const menuNavigate = () => {
    navigation.navigate("Menu"); // Navigate to the next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className={`w-full mt-12`}>
        {/* TOP DESIGN */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-outline" size={24} color="#B7B7B7" />
            <Text style={{ color: "#B7B7B7" }}>Your Location</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#B7B7B7"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#FE6400",
                padding: 4,
                borderRadius: 6,
              }}
            >
              <MaterialIcons name="double-arrow" size={20} color="white" />
            </View>
            <TouchableOpacity
              onPress={menuNavigate}
              style={{
                backgroundColor: "#FE6400",
                padding: 4,
                marginLeft: 8,
                borderRadius: 6,
              }}
            >
              <Ionicons name="ios-menu-sharp" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            padding: 14,
            borderRadius: 8,
          }}
        >
          <Feather name="search" size={18} color="#A7A7A7" />
          <TextInput
            style={{
              fontSize: 14,
              lineHeight: 20,
              marginLeft: 8,
              padding: 8,
            }}
            placeholder="Search for today’s meal"
          />
        </View>

        {/* OFFERS */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 16,
          }}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 6,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <MaterialCommunityIcons
                name="food-turkey"
                size={24}
                color="#464646"
              />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              Dishes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 6,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Entypo name="drink" size={24} color="#464646" />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              Drinks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 6,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <FontAwesome5 name="pizza-slice" size={24} color="#464646" />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              Pizza
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 6,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Ionicons name="md-fast-food" size={24} color="#464646" />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              Dessert
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 6,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <MaterialIcons name="fastfood" size={24} color="#464646" />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              Other's
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
          {/* RESTURANT */}
          <View className="p-2 mt-[15px]">
            <Text
              className={`text-[#446644] mt-[16px] text-[16px] font-semibold`}
            >
              Resturant
            </Text>
            <View>
              <ResturantCard/>
            </View>
          </View>

          {/* INFO */}
          <View
            className={`bg-[#f93f2d] w-[100%] rounded-xl h-[165px] mt-1 px-5 flex-row justify-center items-center`}
          >
            <Image source={require("../../../assets/images/Pizza.png")} />
            <View>
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 4,
                  fontSize: 24, // React Native's equivalent for text-2xl
                  fontWeight: "bold",
                }}
              >
                New meal prepared{" "}
              </Text>
              <Text
                style={{
                  maxWidth: 200,
                  color: "#FFD600",
                  marginLeft: 4,
                  marginTop: 2,
                  fontSize: 12,
                  textAlign: "right",
                  fontWeight: "medium",
                }}
              >
                Order now and get it delivered to your location as soon as
                possible
              </Text>
            </View>
          </View>

          {/* PIZZA */}
          <View style={{ marginTop: 10, padding: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "700" }}>
                Popular
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text className={`text-[#fe6400] text-sm`}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 8 }}>
              <View className={`flex-row items-center justify-around`}>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P1.png")} />
                </View>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P2.png")} />
                </View>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P3.png")} />
                </View>
              </View>

              {/* @nd One */}
              <View className={`flex-row items-center justify-around`}>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P4.png")} />
                </View>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P5.png")} />
                </View>
                <View style={{ width: "33.3%" }}>
                  <Image source={require("../../../assets/images/P6.png")} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
