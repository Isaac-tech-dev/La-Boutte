import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

type QuantityStepperProps = {
  quantity: number;
  name: string;
  busy?: boolean;
  onChange: (delta: 1 | -1) => void;
};

/** − qty + control. At 1 the minus becomes a bin, because pressing it removes the item. */
const QuantityStepper: FC<QuantityStepperProps> = ({ quantity, name, busy, onChange }) => {
  const { dark } = useTheme();
  return (
    <View className={`flex-row items-center ${busy ? "opacity-50" : ""}`}>
      <TouchableOpacity
        disabled={busy}
        onPress={() => onChange(-1)}
        hitSlop={8}
        className={`w-[32px] h-[32px] rounded-full items-center justify-center ${dark ? "bg-[#3A2A1F]" : "bg-[#FFF0E6]"}`}
        accessibilityLabel={quantity === 1 ? `Remove ${name} from cart` : `Remove one ${name}`}
      >
        <Feather name={quantity === 1 ? "trash-2" : "minus"} size={15} color="#FE6400" />
      </TouchableOpacity>
      <Text className={`w-[30px] text-center text-[15px] font-bold ${dark ? "text-white" : "text-[#1A1A1A]"}`}>
        {quantity}
      </Text>
      <TouchableOpacity
        disabled={busy}
        onPress={() => onChange(1)}
        hitSlop={8}
        className={`w-[32px] h-[32px] rounded-full items-center justify-center bg-[#FE6400]`}
        accessibilityLabel={`Add one ${name}`}
      >
        <Feather name="plus" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityStepper;
