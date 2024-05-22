import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
//import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthStackParamList } from "../../navigation/AuthStackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const { dark } = useTheme() as Theme;
  const [view, setView] = useState(false);
  const handleDone = () => {
    setView(true);
  };
  return (
    <View className={`flex-1`}>
      <ImageBackground
        source={require("../../../assets/images/img/1.png")} // Replace './background-image.jpg' with the path to your image
        style={{ flex: 1, justifyContent: "center" }}
        imageStyle={{ resizeMode: "cover", opacity: 0.1 }} // Adjust the opacity as needed
      >
        <View className={`flex-1 w-full`}>
          {/* TOP DESIGN */}
          <View className={`flex-[0.5] justify-center items-center`}>
            <View className={`items-center justify-center`}>
              <Image
                source={require("../../../assets/images/Logo.png")}
                style={{ width: 100, height: 100, marginBottom: 10 }}
              />
              <Text>La Nourriture</Text>
              <Text>We make the best for you</Text>
            </View>
          </View>

          {/* BOTTOM DESIGN */}
          <View
            className={`flex-[0.5] bg-white rounded-t-[77px] py-[20px] space-y-[80px]`}
          >
            {/* Button */}
            <View className={`items-center justify-center space-y-3 mt-[40px]`}>
              <Button
                text="Create an Account"
                onPress={() => navigation.navigate("Register")}
              />
              <Button
                text="Login"
                className={`bg-[#388B24]`}
                onPress={() => navigation.navigate("Login")}
              />
            </View>

            <View className={`space-y-4`}>
              <View className={`flex-row justify-around items-center`}>
                <View className={`border-[1px] border-[#D9D9D9] w-[122px]`} />
                <Text>Connect with</Text>
                <View className={`border-[1px] border-[#D9D9D9] w-[122px]`} />
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: 8,
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="facebook" size={24} color="#5675C5" />
                <FontAwesome name="google-plus" size={24} color="#F93F2D" />
                <AntDesign name="apple1" size={24} color="#88A396" />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: wp(100),
    height: wp(55),
  },
  image2: {
    width: wp(100),
    height: wp(65),
  },
  image3: {
    width: wp(100),
    height: wp(85),
  },
});
