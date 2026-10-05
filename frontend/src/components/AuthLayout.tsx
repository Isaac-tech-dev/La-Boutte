import React, { FC, ReactNode } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Shown under the form, e.g. "New here? Create an account" */
  footer?: ReactNode;
};

/**
 * Shared shell for Login and Register: soft orange header with the logo and a back
 * button, then a keyboard-aware scrolling form.
 */
const AuthLayout: FC<AuthLayoutProps> = ({ title, subtitle, children, footer }) => {
  const { dark } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: dark ? "#1A1A1A" : "#FFFFFF" }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Math.max(insets.bottom, 20) }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View
          className={`items-center pb-[28px] rounded-b-[36px] ${dark ? "bg-[#2A211B]" : "bg-[#FFF4EC]"}`}
          style={{ paddingTop: insets.top + 8 }}
        >
          <View className={`w-full px-[20px]`}>
            {navigation.canGoBack() && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className={`w-[44px] h-[44px] rounded-full items-center justify-center ${dark ? "bg-[#1A1A1A]" : "bg-white"}`}
                style={styles.softShadow}
                accessibilityLabel="Back"
              >
                <Feather name="arrow-left" size={20} color={dark ? "#fff" : "#1A1A1A"} />
              </TouchableOpacity>
            )}
          </View>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
            accessibilityLabel="La Nourriture"
          />
        </View>

        {/* TITLE + FORM */}
        <View className={`flex-1 px-[20px] pt-[28px]`}>
          <Text className={`text-[28px] font-bold ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{title}</Text>
          {!!subtitle && (
            <Text className={`mt-[6px] text-[15px] leading-[22px] ${dark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}>
              {subtitle}
            </Text>
          )}
          <View className={`mt-[24px]`}>{children}</View>
        </View>

        {!!footer && <View className={`px-[20px] pt-[24px] items-center`}>{footer}</View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logo: {
    width: 88,
    height: 88,
    marginTop: 4,
  },
  softShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});
