import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACK, SAVE } from "../../../svg";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import Container from "../../../components/Container";
import { Theme, useTheme } from "@react-navigation/native";

type MenuDescriptionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MenuDescription"
>;

const MenuDescription = ({ navigation, route }: MenuDescriptionScreenProps) => {
    const { dark, colors } = useTheme() as Theme;
  const { id, name, image, description, price } = route.params;
  //console.log(name);
  return (
    <Container
      showHeader
      HeaderRightIcon={<SvgXml xml={SAVE} />}
    >
      <View>
        {/* Description */}
        <View className={`flex items-center space-y-4`}>
          <Image
            source={{ uri: image }}
            width={250}
            height={250}
            className={`rounded-full`}
          />
          <Text className={`text-[24px] font-bold ${dark ? "text-[#fff]" : "text-[#000]"}`}>{name}</Text>
          <View className="flex-row items-center">
            <Feather name="star" size={14} color="#FE6400" />
            <Feather name="star" size={14} color="#FE6400" />
            <Feather name="star" size={14} color="#FE6400" />
            <Feather name="star" size={14} color="#FE6400" />
            <Text className="ml-2" style={{ color: "#FE6400" }}>
              4.5
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-row items-center">
              <FontAwesome5 name="dumbbell" size={12} color="#464646" />
              <Text className="ml-1">5.0g</Text>
            </View>
            <View className="flex-row items-center ml-2">
              <Ionicons name="flash" size={12} color="#464646" />
              <Text className="ml-1">60 cal</Text>
            </View>
          </View>
        </View>
        <View
          className={`flex items-start justify-start text-left mt-[10px] space-y-2`}
        >
          <Text className={`text-[18px] font-bold ${dark ? "text-[#fff]" : "text-[#000]"}`}>Description</Text>
          <Text className={`text-[10px] ${dark ? "text-[#fff]" : "text-[#000]"}`}>{description}</Text>
        </View>
      </View>
    </Container>
  );
};

export default MenuDescription;

const styles = StyleSheet.create({});
