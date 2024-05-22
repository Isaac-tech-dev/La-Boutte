import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
  Touchable,
  TouchableOpacity,
  GestureResponderEvent,
  TextStyle,
} from "react-native";
import React, { FC, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Theme } from "../types/theme";
import { twMerge } from "tailwind-merge";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Animatable from "react-native-animatable";

type PanelProps = {
  LeftIcon?: React.ReactNode;
  CollapsableCustomView?: React.ReactNode;
  RightIcon?: React.ReactNode;
  titleNumberOfLines?: number | undefined;
  title?: string;
  activeOpacity?: number;
  animation?: string;
  showCheckBox?: boolean;
  containerClassName?: string;
  onPress?: () => void;
  isChecked?: boolean;
  onCheckPress?: () => void;
  titleClassName?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
  subTitleClassName?: string;
  subTitleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
};
const Panel: FC<PanelProps> = ({
  LeftIcon,
  CollapsableCustomView,
  titleNumberOfLines = 1,
  RightIcon,
  titleClassName,
  animation,
  containerClassName,
  activeOpacity = 0.8,
  onPress,
  isChecked = false,
  showCheckBox = false,
  subTitleStyle,
  className,
  onCheckPress,
  style,
  subTitleClassName,
  title = "Title",
  subtitle = "Subtitle",
}) => {
  const { dark, colors } = useTheme() as Theme;
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={() => {
        setIsCollapsed(!isCollapsed);
        onPress && onPress();
      }}
      className={`${containerClassName}`}
    >
      <Animatable.View
        useNativeDriver
        animation={animation}
        iterationCount={1}
        style={[{ backgroundColor: colors.panel }, style]}
        className={twMerge(`w-full rounded-[10px] p-[10px] ${className}`)}
      >
        <View className="flex-row items-center w-full">
          {LeftIcon}
          <View className="flex-[1] ml-[10px]">
            {title && (
              <Text
                numberOfLines={titleNumberOfLines}
                ellipsizeMode="tail"
                className={twMerge(
                  `text-base leading-normal font-sequel-sans-medium-body ${titleClassName}`
                )}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                className={twMerge(
                  `text-xs leading-normal font-sequel-sans-book-body ${subTitleClassName}`
                )}
                style={[{ color: dark ? "#B3B3B3" : "#4D4D4D" }, subTitleStyle]}
              >
                {subtitle}
              </Text>
            )}
          </View>
          {RightIcon}
          {showCheckBox && (
            <BouncyCheckbox
              size={19}
              isChecked={isChecked}
              disableBuiltInState
              iconImageStyle={{ tintColor: dark ? colors.blue : colors.white }}
              fillColor={dark ? colors.white : "#003399"}
              unfillColor="transparent"
              useNativeDriver
              innerIconStyle={{
                borderWidth: 1,
                borderColor: dark ? "#E6EBF5" : "#666666",
              }}
              onPress={(isChecked: boolean) => {
                onCheckPress && onCheckPress();
              }}
            />
          )}
        </View>
        {isCollapsed && CollapsableCustomView}
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default Panel;

const styles = StyleSheet.create({});
