import {
    StyleSheet,
    Modal,
    View,
    Text,
    ActivityIndicator,
    Image,
  } from "react-native";
  import React from "react";
  import { useTheme } from "@react-navigation/native";
  //import LogoGreenSvg from '../assets/images/logo-green.svg';
  //import LogoWhiteSvg from '../assets/images/logo-white.svg';
  //import {Theme} from '../types/theme';
  import * as Animatable from "react-native-animatable";
  
  type LoaderModalProps = {
    visible: boolean;
  };
  const LoaderModal = ({ visible = true }: LoaderModalProps) => {
    //const {dark, colors} = useTheme() as Theme;
  
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        statusBarTranslucent
      >
        <View
          className="flex-[1] items-center justify-center"
          style={styles.modalContainer}
        >
          <Animatable.View
            //   animation={'slideOutUp'}
            iterationDelay={500}
            //   iterationCount={'infinite'}
            className={`mb-10 p-[100px] w-[100px] h-[100px] items-center justify-center rounded-full`}
            style={{ backgroundColor: "#fff" }}
          >
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.image}
            />
  
            <ActivityIndicator className="mt-5" size={40} color={"#FE6400"} />
          </Animatable.View>
        </View>
      </Modal>
    );
  };
  
  export default LoaderModal;
  
  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: "contain", // or 'cover', 'stretch', etc.
    },
  });
  