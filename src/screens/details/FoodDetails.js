import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Modal, Button } from 'react-native'
import React, {useState} from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodDetails() {

    const navigation = useNavigation();

    const drinkNavigate = () => {
        navigation.navigate("Menu_Drinks"); // Navigate to the next screen
      };
    
    const allNavigate = () => {
        navigation.navigate("Home");
    }

    const back = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView>
      <View className="p-2 m-2 flex flex-col item-center justify-center">
        <View>
            {/* TOP DESIGN */}
            <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity onPress={back} className="flex-row items-center">
                    <MaterialIcons name="arrow-back-ios" size={18} color="black" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                    <Ionicons style={{marginRight: 4}} name="alert-circle-outline" size={18} color="#C5C5C5" />
                    <Feather style={{marginLeft: 4}} name="heart" size={18} color="#FE6400" />
                </View>
            </View>

            {/* OFFERS */}
            <View className="justify-center items-center mt-10">
                <Image style={{width: 200, height: 200}} source={require("../../../assets/images/P2.png")}/>
                <View className="flex flex-row justify-between items-center w-full">
                    <Text className="text-sm font-bold">$15.99</Text>
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
                <Text className="text-lg font-bold mt-6">Pizza with chicken salad</Text>
                <View className="flex-row items-center mt-2">
                    <Feather name="star" size={14} color="#FE6400" />
                    <Feather name="star" size={14} color="#FE6400" />
                    <Feather name="star" size={14} color="#FE6400" />
                    <Feather name="star" size={14} color="#FE6400" />
                    <Text className="ml-2" style={{color: "#FE6400"}}>4.5</Text>
                </View>
                <View className="flex-row items-center mt-2">
                    <View className="flex-row items-center">
                        <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                        <Text className="ml-1">5.0g</Text>
                    </View>
                    <View className="flex-row items-center ml-2">
                        <Ionicons name="flash" size={12} color="#464646" />
                        <Text className="ml-1">60 cal</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-xl font-semibold mt-8" style={{textAlign: "left"}}>Ingredients</Text>
                    <Text style={{fontSize: 9, lineHeight: 10}} className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit eget nibh pretium, hendrerit posuere. Viverra scelerisque egestas ut tempor diam ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit eget nibh pretium, hendrerit posuere.  </Text>
                </View>
                <View>
                    <Text className="text-xl font-semibold mt-8" style={{textAlign: "left"}}>Descriptions</Text>
                    <Text style={{fontSize: 9, lineHeight: 10}} className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit eget nibh pretium, hendrerit posuere. Viverra scelerisque egestas ut tempor diam ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit eget nibh pretium, hendrerit posuere.  </Text>
                </View>
            </View>

            {/* SEARCH */}

            {/* PIZZA */}
        
            {/* MODAL DESIGN */}
            
        </View>
      </View>
    </SafeAreaView>
  )
}