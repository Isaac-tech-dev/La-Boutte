import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu_Drinks() {

    const navigation = useNavigation();

    const pizzaNavigate = () => {
        navigation.navigate("Menu"); // Navigate to the next screen
      };
    
    const allNavigate = () => {
        navigation.navigate("Home");
    }  

  return (
    <SafeAreaView>
      <View className="p-2 m-2 flex flex-col item-center justify-center">
        <View>
            {/* TOP DESIGN */}
            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row items-center">
                    <Text className="text-lg font-bold" style={{color: "#464646"}}>Menu</Text>
                </View>
                <View className="flex-row items-center">
                    <View style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md">
                        <MaterialIcons name="double-arrow" size={20} color="white"/>
                    </View>
                    <View style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md ml-2">
                        <Ionicons name="ios-menu-sharp" size={20} color="white"/>
                    </View>
                </View>
            </View>

            {/* OFFERS */}
            <View className="flex-row justify-around items-center mt-4">
                <TouchableOpacity onPress={allNavigate} style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm font-bold text-center">All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pizzaNavigate} style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm font-bold text-center">Pizza</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: "#FE6400", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm text-white font-bold text-center">Drinks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm font-bold text-center">Snacks</Text>
                </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View className="flex-row items-center justify-between mt-4 p-3 rounded-lg" style={{backgroundColor: "#fff"}}>
                <View className="flex-row items-center">
                    <Feather name="search" size={18} color="#A7A7A7" />
                    <TextInput className="text-sm ml-6" placeholder="Search for today’s meal"/>
                </View>
                <Ionicons name="filter" size={18} color="#BFBFBF" />
            </View>

            {/* DRINKS */}
            <View className="mt-8">

                <TouchableOpacity className="flex-row items-center justify-around" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../../assets/images/D1.png")}/>
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
                            <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 5, borderRadius: 10}}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../../assets/images/D2.png")}/>
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
                            <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 5, borderRadius: 10}}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../../assets/images/D3.png")}/>
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
                            <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 5, borderRadius: 10}}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-around mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../../assets/images/D4.png")}/>
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
                            <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 5, borderRadius: 10}}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        
            {/* BOTTOM DESIGN */}
        </View>
      </View>
    </SafeAreaView>
  )
}