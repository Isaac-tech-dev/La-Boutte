import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStackNavigation";

import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../navigation/RootBottomTabNavigtion";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { SvgXml } from "react-native-svg";
import { FAVOURITE, ORDER, TRACK, WALLET } from "../../svg";

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;
const Profile = ({ navigation }: ProfileScreenProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <SafeAreaView className={`flex-1 justify-center items-center`}>
      <View className={`m-2 flex flex-col item-center justify-center w-full px-[20px]`}>
        {/* TOP DESIGN */}
        <View className="items-center justify-center mt-6">
          <Image source={require("../../../assets/images/profile.png")} />
          <Text className="mt-2 text-lg font-semibold">{`${user.firstname} ${user.lastname}`}</Text>
          <Text className="mt-1 text-xs font-regular text-gray-400">
            +234 (0) 90-7458-9958
          </Text>
        </View>

        {/* TOP DESIGN */}
        <View className="flex flex-col items-center mt-10">
          {/* FEATURES */}
          <View className={`flex-col w-full items-center mb-2 space-y-2`}>
          <TouchableOpacity
              className={`p-2 items-center justify-center rounded-md w-full bg-[#FE6400]`}
            >
              <SvgXml xml={WALLET} />
              <Text className="text-center text-white text-base font-bold">
                Wallet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 items-center justify-center rounded-md w-full bg-[#FE6400]`}
            >
              <SvgXml xml={ORDER} />
              <Text className="text-center text-white text-base font-bold">
                Order
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
             className={`p-2 items-center justify-center rounded-md w-full bg-[#FE6400]`}
            >
              <SvgXml xml={FAVOURITE} />
              <Text className="text-center text-white text-base font-bold">
                Saved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`p-2 items-center justify-center rounded-md w-full bg-[#FE6400]`}
            >
              <SvgXml xml={TRACK} />
              <Text className="text-center text-white text-base font-bold">
                Track
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
