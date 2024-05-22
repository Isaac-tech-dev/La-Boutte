import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Theme } from "../types/theme";
import { twMerge } from "tailwind-merge";
import { BACK, BACK_DARK } from "../svg";
import { SvgXml } from "react-native-svg";

type NavigationHeaderProps = {
  hideLeftArrow?: boolean;
  leftIconPress?: () => void;
  RightIcon?: React.ReactNode;
  LeftIcon?: React.ReactNode;
  RightIcon2?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  title?: string | null;
};
const NavigationHeader: FC<NavigationHeaderProps> = ({
  hideLeftArrow = false,
  leftIconPress,
  RightIcon,
  RightIcon2,
  LeftIcon,
  style,
  className,
  title = "Let’s Get Started!",
}) => {
  const { dark, colors } = useTheme() as Theme;
  const navigation = useNavigation();

  const leftArrowPress = () => {
    if (leftIconPress) {
      return leftIconPress();
    }
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
  };

  const renderLeftIcon = () => {
    if (LeftIcon && !hideLeftArrow) {
      return LeftIcon;
    }

    if (!hideLeftArrow && navigation.canGoBack()) {
      return (
        <TouchableOpacity
          className="w-[50px] h-[40px] p-1 justify-center"
          activeOpacity={0.8}
          onPress={() => leftArrowPress()}
        >
          {dark ? <SvgXml xml={BACK_DARK} width={30} height={30} /> : <SvgXml xml={BACK} width={30} height={30} />}
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View
      className={twMerge(
        `w-full items-start bg-white py-2 pl-6 pr-4 ${className}`
      )}
      style={style}
    >
      <View className="flex-row w-full items-center justify-between">
        {renderLeftIcon()}
        {RightIcon}
      </View>
      <View className="flex-row mt-2 justify-between">
        {title && (
          <Text className="text-xl leading-normal flex-[1]">{title}</Text>
        )}
        {RightIcon2}
      </View>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  leftIconCtn: {},
});
