import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Panel from "../../../components/Panel";
import { SvgXml } from "react-native-svg";
import { BACK, DARK, LOGOUT, SAVE } from "../../../svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { logUserOut } from "../../../redux/slice/UserSlice";
import { Theme, useTheme } from "@react-navigation/native";
import { setSettings } from "../../../redux/slice/SettingsSlice";
import Container from "../../../components/Container";

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

const Settings = ({ navigation }: SettingsScreenProps) => {
    const dispatch = useAppDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const {dark, colors} = useTheme() as Theme;
    const displaymode = useAppSelector(state => state.settings.displaymode);


    const toggleSwitch = () => {
        //console.log("Toggled:", "True")
        dispatch(
          setSettings({
            displaymode: displaymode != 'dark' ? 'dark' : 'light',
          }),
        );
        setIsEnabled(previousState => !previousState);
      };

  return (
    <Container showHeader headerText="Settings">
      <View className={`w-full mt-[20px] space-y-5`}>
        {/* PREFERENCES */}
        <View className={`flex-col space-y-3`}>
          <Text className={`text-[20px] font-bold`}>Preferences</Text>
          <Panel
            title="Dark Mode"
            subtitle=""
            LeftIcon={
                <View
                  className={`w-[30] h-[30] bg-[rgba(239,68,68,0.10)] rounded-full justify-center items-center`}>
                  <SvgXml xml={DARK} />
                </View>
              }
            className={`bg-[#FE6400]`}
            titleClassName={`text-[#fff]`}
            RightIcon={
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: dark ? '#0DDE65' : '#CCD6EB',
                      borderRadius: 20,
                      width: 45,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: isEnabled ? 'flex-end' : 'flex-start',
                      padding: 5,
                      paddingLeft: 2,
                    }}
                    onPress={toggleSwitch}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: isEnabled ? 'white' : 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              }
          />
          {/* <Panel
            title="Dark Mode"
            subtitle=""
            className={`bg-[#FE6400]`}
            titleClassName={`text-[#fff]`}
          /> */}
        </View>

        {/* SERVICES */}
        <View className={`flex-col space-y-3`}>
          <Text className={`text-[20px] font-bold`}>About</Text>
          <Panel
            title="Visit Us"
            subtitle=""
            className={`bg-[#FE6400]`}
            titleClassName={`text-[#fff]`}
          />
          <Panel
            title="Contact Us"
            subtitle=""
            className={`bg-[#FE6400]`}
            titleClassName={`text-[#fff]`}
          />
        </View>

        {/* SIGN OUT */}
        <View className={`flex-col space-y-3`}>
          <Text className={`text-[20px] font-bold`}>Preferences</Text>
          <Panel
          LeftIcon={
            <View
              className={`w-[30] h-[30] bg-[rgba(239,68,68,0.10)] rounded-full justify-center items-center`}>
              <SvgXml xml={LOGOUT} />
            </View>
          }
          title="Logout"
          subtitle=""
          className={`mb-[10px] bg-[#FE6400]`}
          titleClassName={`text-[#fff]`}
          onPress={() => dispatch(logUserOut())}
        />
          <Panel
            title="Dark Mode"
            subtitle=""
            className={`bg-[#FE6400]`}
            titleClassName={`text-[#fff]`}
          />
        </View>
      </View>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({});
