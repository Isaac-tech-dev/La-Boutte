import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Cart() {

    const navigation = useNavigation();

    const pizzaNavigate = () => {
        navigation.navigate("Menu"); // Navigate to the next screen
      };
    
    const allNavigate = () => {
        navigation.navigate("Home");
    }  

  return (
    <ScreenWrapper>
      <View className="p-2 m-2 flex flex-col item-center justify-center">
        <View>
            {/* TOP DESIGN */}
            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row items-center">
                    <Text className="text-lg font-bold" style={{color: "#464646"}}>Cart</Text>
                    <Ionicons name="cart" size={20} color="black" />
                </View>
                <View className="flex-row items-center">
                    <View style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md ml-2">
                        <Ionicons name="ios-menu-sharp" size={20} color="white"/>
                    </View>
                </View>
            </View>

          <ScrollView>
              {/* DRINKS */}
            <View className="mt-8 mb-2">

                <TouchableOpacity className="flex-row items-center justify-around" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P1.png")}/>
                    <View>
                        <Text>Pizaa with chicken salad</Text>
                        <View className="flex-row items-center">
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Text className="ml-2" style={{color: "#FE6400"}}>4.5</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="flex-row items-center">
                             <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                             <Text className="ml-1">5.0g</Text>
                            </View>
                            <View className="flex-row items-center ml-2">
                                <Ionicons name="flash" size={12} color="#464646" />
                                <Text className="ml-1">60 cal</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between mt-4">
                            <Text>$15.99</Text>
                            <View className="flex-row justify-around items-center mt-2">
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="plus" size={16} color="white" />
                              </TouchableOpacity>
                                  <Text className="ml-2 mr-2 text-sm font-bold">1</Text>
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="minus" size={16} color="white" />
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/D2.png")}/>
                    <View>
                        <Text>Pizaa with chicken salad</Text>
                        <View className="flex-row items-center">
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Text className="ml-2" style={{color: "#FE6400"}}>4.5</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="flex-row items-center">
                             <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                             <Text className="ml-1">5.0g</Text>
                            </View>
                            <View className="flex-row items-center ml-2">
                                <Ionicons name="flash" size={12} color="#464646" />
                                <Text className="ml-1">60 cal</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between mt-4">
                            <Text>$15.99</Text>
                            <View className="flex-row justify-around items-center mt-2">
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="plus" size={16} color="white" />
                              </TouchableOpacity>
                                  <Text className="ml-2 mr-2 text-sm font-bold">1</Text>
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="minus" size={16} color="white" />
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P3.png")}/>
                    <View>
                        <Text>Pizaa with chicken salad</Text>
                        <View className="flex-row items-center">
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Text className="ml-2" style={{color: "#FE6400"}}>4.5</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="flex-row items-center">
                             <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                             <Text className="ml-1">5.0g</Text>
                            </View>
                            <View className="flex-row items-center ml-2">
                                <Ionicons name="flash" size={12} color="#464646" />
                                <Text className="ml-1">60 cal</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between mt-4">
                            <Text>$15.99</Text>
                            <View className="flex-row justify-around items-center mt-2">
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="plus" size={16} color="white" />
                              </TouchableOpacity>
                                  <Text className="ml-2 mr-2 text-sm font-bold">1</Text>
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="minus" size={16} color="white" />
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/D4.png")}/>
                    <View>
                        <Text>Pizaa with chicken salad</Text>
                        <View className="flex-row items-center">
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Feather name="star" size={14} color="#FE6400" />
                            <Text className="ml-2" style={{color: "#FE6400"}}>4.5</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="flex-row items-center">
                             <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                             <Text className="ml-1">5.0g</Text>
                            </View>
                            <View className="flex-row items-center ml-2">
                                <Ionicons name="flash" size={12} color="#464646" />
                                <Text className="ml-1">60 cal</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between mt-4">
                            <Text>$15.99</Text>
                            <View className="flex-row justify-around items-center mt-2">
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="plus" size={16} color="white" />
                              </TouchableOpacity>
                                  <Text className="ml-2 mr-2 text-sm font-bold">1</Text>
                              <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                  <AntDesign name="minus" size={16} color="white" />
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

          </ScrollView>

          {/* BOTTOM DESIGN */}
          <TouchableOpacity className="mt-6 w-full items-center" style={{padding: 10, backgroundColor:"#FE6400", borderRadius: 5}}>
              <Text className="text-xl font-bold text-white">Proceed</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScreenWrapper>
  )
}