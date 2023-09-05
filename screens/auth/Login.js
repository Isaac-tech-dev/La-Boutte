import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { MaterialIcons, Feather, Entypo, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../components/context';

export default function Login() {

  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const navigation = useNavigation();

  const homeNavigate = () => {
    navigation.navigate("Hom"); // Navigate to the next screen
  };

  const {signIn} = React.useContext(AuthContext)
  
  return (
    <ScreenWrapper>
      <View className="h-full p-2 m-2 flex flex-col item-center justify-center">
        <Text className="text-center text-xl font-black">Welcome Back!</Text>
        <Text className="text-center text-sm font-medium">Please Log In to your account</Text>

        <View className="flex flex-col">
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            {/* <Feather name="phone" size={20} color="#FE6400" /> */}
            <MaterialIcons name="email" size={20} color="#FE6400" />
            <TextInput className="text-sm ml-4" placeholder="Email"/>
          </View>
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            <Entypo name="eye-with-line" size={20} color="#FE6400" />
            <TextInput value={password} secureTextEntry onChangeText={handlePasswordChange}  className="text-sm ml-4" placeholder="Password"/>
          </View>
        </View>

        <TouchableOpacity onPress={signIn} className="items-center mt-10" style={{padding: 10, backgroundColor:"#FE6400", borderRadius: 10}}>
            <Text className="text-white text-base font-bold">Sign In</Text>
        </TouchableOpacity>
        
        <View className="flex flex-row items-end self-end justify-center mt-4">
          <TouchableOpacity><Text className="font-medium text-xs">Forget Password?</Text></TouchableOpacity>
        </View>

        <Text className="text-center text-base font-bold mt-4">Connect with</Text>

          <View className="flex flex-row items-center justify-around mt-6">
            <FontAwesome5 name="facebook" size={24} color="#5675C5" />
            <FontAwesome name="google-plus" size={24} color="#F93F2D" />
            <AntDesign name="apple1" size={24} color="#88A396" />
          </View>
      </View>
    </ScreenWrapper>
  )
}