import { View, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
//import Lottie from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
//import { setItem } from "../../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function Swipe() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Welcome");
    //setItem("onboarded", "1");
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Image
                  source={require("../../../assets/images/splash1.png")}
                  style={styles.image}
                />
              </View>
            ),
            title: "Food At Your Door Step",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet volutpat cursus quis massa. Facilisi mattis interdum viverra nam. Quis nunc aliquam nunc justo, lectus gravida facilisi risus. Tempus adipiscing ridiculus ut morbi cursus condimentum volutpat at. ",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Image
                  source={require("../../../assets/images/splash2.png")}
                  style={styles.image}
                />
              </View>
            ),
            title: "Pay at A-Go",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet volutpat cursus quis massa. Facilisi mattis interdum viverra nam. Quis nunc aliquam nunc justo, lectus gravida facilisi risus. Tempus adipiscing ridiculus ut morbi cursus condimentum volutpat at. ",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Image
                  source={require("../../../assets/images/splash3.png")}
                  style={styles.image}
                />
              </View>
            ),
            title: "Best App for a Foodie",
            subtitle:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet volutpat cursus quis massa. Facilisi mattis interdum viverra nam. Quis nunc aliquam nunc justo, lectus gravida facilisi risus. Tempus adipiscing ridiculus ut morbi cursus condimentum volutpat at. ",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: width,
    height: width,
  },
});
