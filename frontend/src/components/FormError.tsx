import React, { FC } from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

/** Red message box that stays under a form until the next attempt (unlike a toast). */
const FormError: FC<{ message?: string | null }> = ({ message }) => {
  const { dark } = useTheme();
  if (!message) return null;
  return (
    <View
      className={`flex-row items-start gap-[8px] px-[14px] py-[12px] rounded-[12px] ${dark ? "bg-[#3A2222]" : "bg-[#FDECEC]"}`}
      accessibilityRole="alert"
    >
      <Feather name="alert-circle" size={16} color="#E5484D" style={{ marginTop: 2 }} />
      <Text className={`flex-1 text-[14px] leading-[20px] text-[#C62828]`}>{message}</Text>
    </View>
  );
};

export default FormError;
