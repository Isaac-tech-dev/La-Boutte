import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

  const navigation = useNavigation();

  const registerNavigate = () => {
    navigation.navigate("Register"); // Navigate to the next screen
  };

  const loginNavigate = () => {
    navigation.navigate("Login"); // Navigate to the next screen
  };

  return (
    <ScreenWrapper>
      <View className="h-full p-2 m-2 flex flex-col item-center justify-center">
      <View>
        {/* TOP DESIGN */}
        <View>
          <View className="flex-auto justify-center items-center" style={{backgroundColor: 'linear-gradient(to bottom, #FE502D, #FE6400)'}}>
            <Image source={require('../../assets/images/Logo.png')} style={{width: 100, height: 100}}/>
            <Text className="text-xl font-bold">La Nourriture</Text>
            <Text className="text-sm font-medium mt-2">We make the best for you</Text>
          </View>
        </View>

        {/* BOTTOM DESIGN */}
        <View className="flex flex-col p-4 mt-4">
          <TouchableOpacity onPress={registerNavigate} className="items-center mb-2" style={{padding: 10, backgroundColor:"#FE6400", borderRadius: 10}}>
            <Text className="text-white text-base font-bold">Create an Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loginNavigate} className="items-center" style={{padding: 10, backgroundColor:"#388B24", borderRadius: 10}}>
            <Text className="text-white text-base font-bold">Login</Text>
          </TouchableOpacity>

          <Text className="text-center text-base font-bold mt-4">Connect with</Text>

          <View className="flex flex-row items-center justify-around mt-4">
            <FontAwesome5 name="facebook" size={24} color="#5675C5" />
            <FontAwesome name="google-plus" size={24} color="#F93F2D" />
            <AntDesign name="apple1" size={24} color="#88A396" />
          </View>
        </View>
      </View>
      </View>
    </ScreenWrapper>
  )
}