import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';
  import React, {FC} from 'react';
  import {twMerge} from 'tailwind-merge';
  import {useTheme} from '@react-navigation/native';
  import {Theme} from '../types/theme';
  
  type ButtonProps = {
    className?: string;
    containerClassName?: string;
    animation?: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    titleClassName?: string;
    titleStyle?: StyleProp<TextStyle>;
    text?: string;
    icon?: React.ReactNode; // Icon prop for the SVG
  };
  
  const Button: FC<ButtonProps> = ({
    className,
    text = 'Button',
    titleClassName,
    containerClassName,
    animation,
    disabled,
    style,
    titleStyle,
    onPress,
    icon, // Accept the icon as a prop
  }) => {
    const {dark, colors} = useTheme() as Theme;
    const BACKGROUND_COLOR = disabled
    ? dark
      ? '#4D4D4D'
      : '#4D4D4D'
    : '#FE6400';
  
    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        className={containerClassName}
        activeOpacity={0.8}>
        <Animatable.View
          iterationCount={1}
          useNativeDriver
          animation={animation}
          className={twMerge(
            `rounded-[10px] justify-center flex-row	 items-center w-[300px] p-[15px] ${className}`,
          )}
          style={[{backgroundColor: BACKGROUND_COLOR}, style]}>
          {icon && icon}
          <Text
            className={twMerge(
              `text-white font-sequel-sans-medium-body text-base ${titleClassName}`,
            )}
            style={titleStyle}>
            {text}
          </Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };
  
  export default Button;
  
  const styles = StyleSheet.create({});
  