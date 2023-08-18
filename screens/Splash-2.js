import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Octicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

export default function Splash_2() {

  const navigation = useNavigation();

  const nextNavigate = () => {
    navigation.navigate("Splash3"); // Navigate to the next screen
  };
  return (
    <ScreenWrapper classname="p-4 m-4">
      <View className="h-full p-2 m-2 flex flex-col item-center justify-center">
      <View className="p-2 m-2">
        <Image source={require('../assets/images/splash2.png')} className="items-center w-60 h-60 justify-center"/>
      </View>

      <View className="justify-center items-center p-4 mt-4">
        <Text className="text-3xl font-bold">Pay at A-Go</Text>
        <Text className="text-xs font-medium mt-2 leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet volutpat cursus quis massa. Facilisi mattis interdum viverra nam. Quis nunc aliquam nunc justo, lectus gravida facilisi risus. Tempus adipiscing ridiculus ut morbi cursus condimentum volutpat at. </Text>
        <TouchableOpacity onPress={nextNavigate} className="self-end">
          <View className="flex-row items-center mt-6 p-2">
            <Octicons name="dot-fill" size={18} color="#FE6400"/>
            <Text className="ml-1 text-xs text-end" style={{color: "#FE6400"}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </ScreenWrapper>
  )
}