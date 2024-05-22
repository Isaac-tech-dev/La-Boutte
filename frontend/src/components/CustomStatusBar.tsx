// CustomStatusBar.tsx

import {StatusBar, StatusBarProps} from 'expo-status-bar';
import React from 'react';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type CustomStatusBarProps = {
  backgroundColor: string;
} & StatusBarProps;

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          height: Platform.OS === 'ios' ? 50 : 0,
        },
        {backgroundColor},
      ]}>
      <StatusBar backgroundColor={backgroundColor} {...rest} />
    </View>
  );
};

export default CustomStatusBar;
