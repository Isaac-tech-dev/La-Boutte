import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Img from "../../assets/images/Restarants.png";
import { Image } from "react-native";

const ResturantCard = () => {
  return (
    <View className={`flex-row`}>
      <View className={`w-[231px] h-[69px] mx-2 rounded-t-[25px]`}>
        <Image source={Img} />
        <View className={`bg-[#fff] rounded-b-[25px] -mt-3`}></View>
      </View>
      <View className={`w-[231px] h-[69px]`}>
        <Image source={Img} />
      </View>
    </View>
  );
};

export default ResturantCard;

const styles = StyleSheet.create({});
