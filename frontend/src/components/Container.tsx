import {
  StyleProp,
  View,
  ViewStyle,
  ScrollView,
  useWindowDimensions,
  Platform,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import CustomStatusBar from './CustomStatusBar';
import {StatusBarStyle} from 'expo-status-bar';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../types/theme';
import NavigationHeader from './NavigationHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {twMerge} from 'tailwind-merge';

type ContainerProps = {
  style?: StyleProp<ViewStyle>;
  className?: string;
  removePadding?: boolean;
  hideScrollView?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  hidelefticon?: boolean;
  HeaderLeftIcon?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  HeaderRightIcon2?: React.ReactNode;
  statusbar_background?: string;
  showHeader?: boolean;
  HeaderRightIcon?: React.ReactNode;
  headerLeftIconPress?: () => void;
  headerText?: string;
  statusbar?: StatusBarStyle;
  children: ReactNode | undefined;
};

const Container: FC<ContainerProps> = ({
  children,
  style,
  className,
  removePadding,
  hidelefticon,
  HeaderLeftIcon,
  headerStyle,
  refreshing,
  onRefresh,
  hideScrollView = false,
  headerText = '',
  headerLeftIconPress,
  HeaderRightIcon,
  HeaderRightIcon2,
  statusbar_background,
  showHeader = false,
  statusbar,
}) => {
  const {dark, colors} = useTheme() as Theme;
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const CONTENT = (
      <KeyboardAvoidingView
        className={twMerge(
          `max-w-xl w-full self-center ${className} ${
            !removePadding && 'pl-6 pr-4'
          } ${dark? 'bg-[#1A1A1A]':'bg-white'}`,
        )}
        style={[
          {
            minHeight: height,
            paddingTop: Platform.OS == 'android' ? insets.top : 0,
            paddingBottom: insets.bottom,
          },
          style,
        ]}>
        {children}
      </KeyboardAvoidingView>
    );

    return hideScrollView ? (
      CONTENT
    ) : (
      <ScrollView
        keyboardShouldPersistTaps={'never'}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}>
        {CONTENT}
      </ScrollView>
    );
  };

  return (
    <>
      <CustomStatusBar
        style={statusbar || dark ? 'light' : 'dark'}
        backgroundColor={statusbar_background || colors.statusbar}
      />
      {showHeader && (
        <NavigationHeader
          LeftIcon={HeaderLeftIcon}
          RightIcon2={HeaderRightIcon2}
          hideLeftArrow={hidelefticon}
          leftIconPress={headerLeftIconPress}
          title={headerText}
          RightIcon={HeaderRightIcon}
          style={
            Platform.OS == 'android' && [headerStyle, {marginTop: insets.top}]
          }
        />
      )}
      {renderContent()}
    </>
  );
};

export default Container;
