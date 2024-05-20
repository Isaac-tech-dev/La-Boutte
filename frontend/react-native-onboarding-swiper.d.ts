declare module 'react-native-onboarding-swiper' {
    import React from 'react';
    import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
  
    export interface Page {
      backgroundColor: string;
      image: React.ReactNode;
      title: string;
      subtitle: string;
    }
  
    export interface OnboardingProps {
      pages: Page[];
      onDone?: () => void;
      onSkip?: () => void;
      containerStyles?: ViewStyle;
      imageContainerStyles?: ViewStyle;
      titleStyles?: TextStyle;
      subTitleStyles?: TextStyle;
      bottomBarHighlight?: boolean;
    }
  
    const Onboarding: React.FC<OnboardingProps>;
    export default Onboarding;
  }
  