import {
    KeyboardTypeOptions,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
    TouchableOpacity,
  } from 'react-native';
  import React, {FC, useState} from 'react';
  import {Theme} from '../types/theme';
  import {useTheme} from '@react-navigation/native';
  import {twMerge} from 'tailwind-merge';
  import * as Animatable from 'react-native-animatable';
  import {SvgXml} from 'react-native-svg';
  import {InputAutoCompleteType, InputTextContentType} from '../types';
  
  export type InuptProps = {
    containerClassName?: string;
    className?: string;
    labelClassName?: string;
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    rightIconPress?: () => void;
    mutiline?: boolean;
    maxLength?: number;
    animation?: string;
    textInputClassName?: string;
    label?: string;
    textInputStyle?: StyleProp<TextStyle>;
    placeholderTextColor?: string;
    success?: string;
    error?: string;
    autoComplete?: InputAutoCompleteType;
    editable?: boolean | undefined;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    value?: string | undefined;
    placeholder?: string;
    onChangeText?: ((text: string) => void) | undefined;
    textContentType?: InputTextContentType;
  };
  const Input: FC<InuptProps> = ({
    className,
    placeholder = 'Input',
    secureTextEntry,
    autoComplete,
    containerClassName,
    mutiline,
    labelClassName,
    rightIconPress,
    animation,
    maxLength,
    RightIcon,
    style,
    label,
    error,
    success,
    LeftIcon,
    placeholderTextColor,
    textInputClassName,
    textInputStyle,
    onChangeText,
    value,
    keyboardType,
    editable,
    textContentType,
  }) => {
    const {dark, colors} = useTheme() as Theme;
    const [showtext, setShowText] = useState(secureTextEntry);
    const EYE_SVG = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6852 9.50043C11.6852 10.9854 10.4852 12.1854 9.00019 12.1854C7.51519 12.1854 6.31519 10.9854 6.31519 9.50043C6.31519 8.01543 7.51519 6.81543 9.00019 6.81543C10.4852 6.81543 11.6852 8.01543 11.6852 9.50043Z" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.99988 15.7025C11.6474 15.7025 14.1149 14.1425 15.8324 11.4425C16.5074 10.385 16.5074 8.60754 15.8324 7.55004C14.1149 4.85004 11.6474 3.29004 8.99988 3.29004C6.35238 3.29004 3.88488 4.85004 2.16738 7.55004C1.49238 8.60754 1.49238 10.385 2.16738 11.4425C3.88488 14.1425 6.35238 15.7025 8.99988 15.7025Z" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    const EYE_SLASH_SVG = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8977 7.60293L7.10269 11.3979C6.61519 10.9104 6.31519 10.2429 6.31519 9.50043C6.31519 8.01543 7.51519 6.81543 9.00019 6.81543C9.74269 6.81543 10.4102 7.11543 10.8977 7.60293Z" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3649 4.82785C12.0524 3.83785 10.5524 3.29785 8.99988 3.29785C6.35238 3.29785 3.88488 4.85785 2.16738 7.55785C1.49238 8.61535 1.49238 10.3929 2.16738 11.4504C2.75988 12.3804 3.44988 13.1829 4.19988 13.8279" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.31519 15.1473C7.17019 15.5073 8.07769 15.7023 9.00019 15.7023C11.6477 15.7023 14.1152 14.1423 15.8327 11.4423C16.5077 10.3848 16.5077 8.60727 15.8327 7.54977C15.5852 7.15977 15.3152 6.79227 15.0377 6.44727" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.6323 10.0254C11.4373 11.0829 10.5748 11.9454 9.51733 12.1404" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.1025 11.3975L1.5 17" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.4997 2L10.8972 7.6025" stroke="#99ADD6" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  
    const returnRightIcon = () => {
      if (RightIcon)
        return (
          <TouchableOpacity
            onPress={() => {
              rightIconPress && rightIconPress();
            }}
            activeOpacity={0.8}>
            <View className="ml-[10px]">{RightIcon}</View>
          </TouchableOpacity>
        );
      if (!secureTextEntry) {
        return;
      }
      if (!showtext) {
        return (
          <TouchableOpacity onPress={() => setShowText(true)} activeOpacity={0.8}>
            <SvgXml xml={EYE_SVG} width={24} height={24} />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowText(false)}>
          <SvgXml xml={EYE_SLASH_SVG} width={24} height={24} />
        </TouchableOpacity>
      );
    };
  
    return (
      <Animatable.View
        iterationCount={1}
        useNativeDriver
        animation={animation}
        className={twMerge(`w-full ${containerClassName}`)}>
        {label && (
          <Text
            className={twMerge(
              `text-base leading-normal font-sequel-sans-medium-head mb-[10] ${labelClassName}`,
            )}
            style={[{color: colors.text}]}>
            {label}
          </Text>
        )}
        <View
          className={twMerge(
            `flex-row items-center h-[63px] ${
              dark ? 'bg-[#333]' : 'bg-white'
            } px-5 rounded-[10px] ${className}`,
          )}
          style={[style]}>
          {LeftIcon && <View className="mr-[10px]">{LeftIcon}</View>}
          <TextInput
            style={[{color: colors.text}, textInputStyle]}
            className={twMerge(
              `h-full flex-[1] font-sequel-sans-roman-disp ${textInputClassName}`,
            )}
            autoCapitalize={'none'}
            multiline={mutiline}
            selectionColor={colors.text}
            cursorColor={dark ? '#fff' : colors.primary}
            maxLength={maxLength}
            placeholder={placeholder}
            editable={editable}
            placeholderTextColor={
              placeholderTextColor || dark ? '#808080' : '#99ADD6'
            }
            autoComplete={autoComplete}
            secureTextEntry={showtext}
            value={value}
            keyboardType={keyboardType}
            textContentType={textContentType}
            onChangeText={text => {
              let newtext = text.trim();
              if (
                keyboardType == 'email-address' ||
                textContentType == 'emailAddress' ||
                textContentType == 'password' ||
                secureTextEntry
              )
                onChangeText && onChangeText(newtext);
              else onChangeText && onChangeText(text);
            }}
          />
          {returnRightIcon()}
        </View>
        <View className="pl-2">
          {success && (
            <Text
              className={`font-sequel-sans-book-body mt-1 text-xs text-[#08853D] leading-normal`}>
              {success}
            </Text>
          )}
  
          {error && (
            <Text
              className={`font-sequel-sans-book-body text-xs mt-1 text-[#F60D0E] leading-normal`}>
              {error}
            </Text>
          )}
        </View>
      </Animatable.View>
    );
  };
  
  export default Input;
  
  const styles = StyleSheet.create({});
  