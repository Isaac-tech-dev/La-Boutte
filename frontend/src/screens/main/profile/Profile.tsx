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
import { RootStackParamList } from "../../../navigation/RootStackNavigation";

import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../../navigation/RootBottomTabNavigtion";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { SvgXml } from "react-native-svg";
import { FAVOURITE, ORDER, TRACK, WALLET, EDIT, SETTINGS } from "../../../svg";
import Panel from "../../../components/Panel";
import Container from "../../../components/Container";

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;
const Profile = ({ navigation }: ProfileScreenProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <Container
      hidelefticon
      showHeader
      headerText="Profile"
      HeaderRightIcon2={
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <SvgXml xml={SETTINGS} width={30} height={30} />
        </TouchableOpacity>
      }
    >
      <View className={`flex item-center justify-center w-full`}>
        {/* TOP DESIGN */}
        <View className="items-center justify-center mt-6">
          <View>
            <Image source={require("../../../../assets/images/profile.png")} />
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <SvgXml xml={EDIT} className={`absolute bottom-0 left-[100px]`} />
            </TouchableOpacity>
          </View>
          <Text className="mt-2 text-lg font-semibold">{`${user.firstname} ${user.lastname}`}</Text>
          <Text className="mt-1 text-xs font-regular text-gray-400">
            +234 (0) 90-7458-9958
          </Text>
        </View>

        {/* OTHER DESIGN */}
        <View className={`flex-col items-center mt-[15px]`}>
          {/* FEATURES */}
          <View className={`flex-col w-full items-center mb-2 space-y-2`}>
            <Panel
              title="Wallet"
              subtitle=""
              className={`bg-[#FE6400]`}
              titleClassName={`text-[#fff]`}
              LeftIcon={<SvgXml xml={WALLET} />}
            />
            <Panel
              title="Order"
              subtitle=""
              className={`bg-[#FE6400]`}
              titleClassName={`text-[#fff]`}
              LeftIcon={<SvgXml xml={ORDER} />}
            />
            <Panel
              title="Saved"
              subtitle=""
              className={`bg-[#FE6400]`}
              titleClassName={`text-[#fff]`}
              LeftIcon={<SvgXml xml={FAVOURITE} />}
            />
            <Panel
              title="Track"
              subtitle=""
              className={`bg-[#FE6400]`}
              titleClassName={`text-[#fff]`}
              LeftIcon={<SvgXml xml={TRACK} />}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
