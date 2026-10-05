import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

/** Round cart button with an item-count badge, used in the Home and Menu headers. */
const CartButton: FC<{ count: number; onPress: () => void }> = ({ count, onPress }) => {
  const { dark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[46px] h-[46px] rounded-full items-center justify-center ${dark ? "bg-[#262626]" : "bg-[#F4F4F5]"}`}
      accessibilityLabel={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <Feather name="shopping-bag" size={20} color={dark ? "#fff" : "#1A1A1A"} />
      {count > 0 && (
        <View
          className={`absolute -top-[2px] -right-[2px] min-w-[20px] h-[20px] px-[5px] rounded-full items-center justify-center bg-[#FE6400] border-2 ${
            dark ? "border-[#1A1A1A]" : "border-white"
          }`}
        >
          <Text className={`text-[11px] font-bold text-white`}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
