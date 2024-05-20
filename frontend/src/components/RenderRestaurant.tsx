import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, ViewStyle, ImageStyle, Text } from 'react-native';

interface RestaurantProps {
  images: ImageSourcePropType[];
}

const RenderRestaurant: React.FC<RestaurantProps> = ({ images }) => {
  return (
    <View className={`rounded-[10px] mx-[10px]`}>
      <View className={`w-[230px] h-[80px] overflow-hidden rounded-[10px]`}>
        <Image source={images[0]} className={`w-full h-[70px] bg-no-repeat`} />
        <View className={`bg-[#fff] rounded-b-[10px] -mt-[15px] h-[80px] w-full flex-row justify-between items-center`}>
            {/* LOCATION */}
            <View className={`flex-row justify-center items-center space-x-2`}>
                <Text className={`text-black`}>Location:</Text>
                <Text>3KM</Text>
            </View>
            {/* TIME */}
            <View className={`flex-row justify-center items-center space-x-2`}>
                <Text>Location:</Text>
                <Text>3KM</Text>
            </View>
            {/* RATING */}
            <View className={`flex-row justify-center items-center space-x-2`}>
                <Text>Location:</Text>
                <Text>3KM</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RenderRestaurant;
