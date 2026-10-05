import { Alert, Switch, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { logout } from "../../../redux/thunk/auth";
import { setSettings } from "../../../redux/slice/SettingsSlice";
import Container from "../../../components/Container";
import IconTile from "../../../components/IconTile";
import MenuRow from "../../../components/MenuRow";
import SectionTitle from "../../../components/SectionTitle";
import appConfig from "../../../../app.json";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, "Settings">;

const BRAND = "#FE6400";

const comingSoon = (feature: string) =>
  Toast.show(`${feature} is coming soon`, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
  });

const softIcon = (name: React.ComponentProps<typeof Feather>["name"]) => (
  <IconTile tone="soft">
    <Feather name={name} size={18} color={BRAND} />
  </IconTile>
);

const Settings = (_props: SettingsScreenProps) => {
  const dispatch = useAppDispatch();
  const displaymode = useAppSelector((state) => state.settings.displaymode);
  const darkMode = displaymode === "dark";

  const toggleDarkMode = () => {
    dispatch(setSettings({ displaymode: darkMode ? "light" : "dark", isEnabled: !darkMode }));
  };

  const confirmLogout = () =>
    Alert.alert("Log out?", "You'll need to log in again to see your cart.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => dispatch(logout()) },
    ]);

  return (
    <Container showHeader headerText="Settings">
      <View className={`w-full mt-[12px] pb-[32px]`}>
        {/* APPEARANCE */}
        <SectionTitle>Appearance</SectionTitle>
        <MenuRow
          title="Dark mode"
          subtitle={darkMode ? "On" : "Off"}
          icon={softIcon("moon")}
          onPress={toggleDarkMode}
          right={
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ true: BRAND, false: "#D4D4D8" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D4D4D8"
              accessibilityLabel="Dark mode"
            />
          }
        />

        {/* SUPPORT */}
        <View className={`mt-[24px]`}>
          <SectionTitle>Support</SectionTitle>
          <View className={`gap-[10px]`}>
            <MenuRow
              title="Contact us"
              subtitle="Questions about an order"
              icon={softIcon("message-circle")}
              onPress={() => comingSoon("Contact")}
            />
            <MenuRow
              title="Visit us"
              subtitle="Find our nearest kitchen"
              icon={softIcon("map-pin")}
              onPress={() => comingSoon("Store locations")}
            />
          </View>
        </View>

        {/* ACCOUNT */}
        <View className={`mt-[24px]`}>
          <SectionTitle>Account</SectionTitle>
          <MenuRow
            title="Log out"
            icon={
              <IconTile tone="danger">
                <Feather name="log-out" size={18} color="#E5484D" />
              </IconTile>
            }
            onPress={confirmLogout}
            destructive
          />
        </View>

        <Text className={`mt-[28px] text-center text-[12px] text-[#A1A1AA]`}>
          La-Boutte · Version {appConfig.expo.version}
        </Text>
      </View>
    </Container>
  );
};

export default Settings;
