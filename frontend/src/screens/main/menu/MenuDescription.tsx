import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACK, SAVE } from "../../../svg";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

type MenuDescriptionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MenuDescription"
>;

const MenuDescription = ({ navigation, route }: MenuDescriptionScreenProps) => {
  const { id, name, image, description, price } = route.params;
  //console.log(name);
  return (
    <SafeAreaView className={`flex-1 px-[20px]`}>
      <View>
        {/* TOP DESIGN */}
        <View className={`flex-row justify-between items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={BACK} width={30} height={30} />
          </TouchableOpacity>
          <SvgXml xml={SAVE} />
        </View>
        {/* Description */}
        <View className={`flex items-center`}>
          <Image
            source={{ uri: image }}
            width={250}
            height={250}
            className={`rounded-full`}
          />
          <Text>{name}</Text>
        </View>
        <View className={`flex items-start justify-start text-left`}>
          <Text>Description</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MenuDescription;

const styles = StyleSheet.create({});
