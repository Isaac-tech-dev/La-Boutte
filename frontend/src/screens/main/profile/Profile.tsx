import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../../navigation/RootBottomTabNavigtion";
import { Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-root-toast";
import { useAppSelector } from "../../../redux/hooks/hook";
import { FAVOURITE, ORDER, TRACK, WALLET } from "../../../svg";
import Container from "../../../components/Container";
import Avatar from "../../../components/Avatar";
import IconTile from "../../../components/IconTile";
import MenuRow from "../../../components/MenuRow";
import SectionTitle from "../../../components/SectionTitle";

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

const comingSoon = (feature: string) =>
  Toast.show(`${feature} is coming soon`, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
  });

/** The white icons in src/svg are drawn for an orange background, so they sit in a brand tile. */
const svgIcon = (xml: string) => (
  <IconTile>
    <SvgXml xml={xml} width={22} height={22} />
  </IconTile>
);

const Profile = ({ navigation }: ProfileScreenProps) => {
  const { dark } = useTheme();
  const user = useAppSelector((state) => state.user);
  const fullName = [user.firstname, user.lastname].filter(Boolean).join(" ") || "Your name";

  return (
    <Container
      hidelefticon
      showHeader
      headerText="Profile"
      HeaderRightIcon2={
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          className={`w-[40px] h-[40px] rounded-full items-center justify-center ${
            dark ? "bg-[#2A2A2A]" : "bg-[#F4F4F5]"
          }`}
          accessibilityLabel="Settings"
        >
          <Feather name="settings" size={20} color={dark ? "#fff" : "#1A1A1A"} />
        </TouchableOpacity>
      }
    >
      <View className={`w-full pb-[32px]`}>
        {/* PROFILE CARD */}
        <View
          className={`mt-[12px] items-center rounded-[20px] px-[20px] py-[24px] ${
            dark ? "bg-[#262626]" : "bg-white"
          }`}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            activeOpacity={0.85}
            accessibilityLabel="Edit profile"
          >
            <Avatar firstName={user.firstname} lastName={user.lastname} email={user.email} />
            <View
              className={`absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full items-center justify-center bg-[#1A1A1A] border-[3px] ${
                dark ? "border-[#262626]" : "border-white"
              }`}
            >
              <Feather name="edit-2" size={13} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text
            className={`mt-[14px] text-[20px] font-bold ${dark ? "text-white" : "text-[#1A1A1A]"}`}
          >
            {fullName}
          </Text>
          {!!user.email && (
            <Text className={`mt-[2px] text-[14px] text-[#8A8A8A]`}>{user.email}</Text>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            className={`mt-[16px] px-[18px] py-[8px] rounded-full border border-[#FE6400]`}
          >
            <Text className={`text-[13px] font-semibold text-[#FE6400]`}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* ORDERS */}
        <View className={`mt-[28px]`}>
          <SectionTitle>Orders</SectionTitle>
          <View className={`gap-[10px]`}>
            <MenuRow
              title="My orders"
              subtitle="See what you've ordered before"
              icon={svgIcon(ORDER)}
              onPress={() => comingSoon("Order history")}
            />
            <MenuRow
              title="Track order"
              subtitle="Follow your delivery in real time"
              icon={svgIcon(TRACK)}
              onPress={() => comingSoon("Order tracking")}
            />
          </View>
        </View>

        {/* ACCOUNT */}
        <View className={`mt-[24px]`}>
          <SectionTitle>Account</SectionTitle>
          <View className={`gap-[10px]`}>
            <MenuRow
              title="Saved"
              subtitle="Your favourite pizzas"
              icon={svgIcon(FAVOURITE)}
              onPress={() => comingSoon("Saved pizzas")}
            />
            <MenuRow
              title="Wallet"
              subtitle="Balance and payment methods"
              icon={svgIcon(WALLET)}
              onPress={() => comingSoon("Wallet")}
            />
            <MenuRow
              title="Settings"
              subtitle="Appearance, support and log out"
              icon={
                <IconTile tone="soft">
                  <Feather name="sliders" size={18} color="#FE6400" />
                </IconTile>
              }
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
});
