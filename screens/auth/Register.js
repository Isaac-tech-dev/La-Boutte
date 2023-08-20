import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {auth} from '../../firebase'


export default function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

  // const handleRegister = () => {
  //   auth.createUserWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user
  //     console.log(user.email)
  //   })
  //   .catch(error => alert(error.message))
  // }

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const navigation = useNavigation();

  const loginNavigate = () => {
    navigation.navigate("Login"); // Navigate to the next screen
  };

  return (
    <KeyboardAvoidingView behavior='padding'>
      <View className="h-full p-2 m-2 flex flex-col item-center justify-center">
        <Text className="text-center text-xl font-black">Create an Account</Text>
        <Text className="text-center text-sm font-medium">Please fill In your informations</Text>

        <View className="flex flex-col">
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            <MaterialIcons name="account-circle" size={20} color="#FE6400" />
            <TextInput className="text-sm ml-4" placeholder="Username"/>
          </View>
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            <MaterialIcons name="email" size={20} color="#FE6400" />
            <TextInput className="text-sm ml-4" placeholder="Email" value={email} onChangeText={text => setEmail(text)}/>
          </View>
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            <Feather name="phone" size={20} color="#FE6400" />
            <TextInput className="text-sm ml-4" placeholder="Phone Number"/>
          </View>
          <View className="flex flex-row p-4 mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
            <Entypo name="eye-with-line" size={20} color="#FE6400" />
            <TextInput value={password} secureTextEntry onChangeText={text => setPassword(text)}  className="text-sm ml-4" placeholder="Password"/>
          </View>
        </View>

        <TouchableOpacity onPress={loginNavigate} className="items-center mt-20" style={{padding: 10, backgroundColor:"#FE6400", borderRadius: 10}}>
            <Text className="text-white text-base font-bold">Submit</Text>
        </TouchableOpacity>
        
        <View className="flex flex-row items-center justify-center mt-4">
          <Text>You already have an account,</Text>
          <TouchableOpacity onPress={loginNavigate}><Text className="font-bold" style={{color:"#FE6400"}}>Log In</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}