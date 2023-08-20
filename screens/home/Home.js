import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Home() {

    const navigation = useNavigation();

    const menuNavigate = () => {
        navigation.navigate("Menu"); // Navigate to the next screen
      };

  return (
    <ScreenWrapper>
      <View className="p-2 m-2 flex flex-col item-center justify-center">
        <View>
            {/* TOP DESIGN */}
            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={24} color="#B7B7B7"/>
                    <Text style={{color: "#B7B7B7"}}>Your Location</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#B7B7B7"/>
                </View>
                <View className="flex-row items-center">
                    <View style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md">
                        <MaterialIcons name="double-arrow" size={20} color="white"/>
                    </View>
                    <TouchableOpacity onPress={menuNavigate} style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md ml-2">
                        <Ionicons name="ios-menu-sharp" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* SEARCH */}
            <View className="flex-row items-center mt-4 p-3 rounded-lg" style={{backgroundColor: "#fff"}}>
                <Feather name="search" size={18} color="#A7A7A7" />
                <TextInput className="text-sm ml-2 p-2" placeholder="Search for today’s meal"/>
            </View>

            {/* OFFERS */}
            <View className="flex-row items-center justify-around mt-4">
                <TouchableOpacity className="items-center">
                    <View style={{backgroundColor: "#fff", padding: 15, borderRadius: 6, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color="#464646" />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">Dishes</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <View style={{backgroundColor: "#fff", padding: 15, borderRadius: 6, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
                        <Entypo name="drink" size={24} color="#464646" />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">Drinks</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <View style={{backgroundColor: "#fff", padding: 15, borderRadius: 6, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
                        <FontAwesome5 name="pizza-slice" size={24} color="#464646" />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">Pizza</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <View style={{backgroundColor: "#fff", padding: 15, borderRadius: 6, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
                        <Ionicons name="md-fast-food" size={24} color="#464646" />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">Dessert</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <View style={{backgroundColor: "#fff", padding: 15, borderRadius: 6, borderRadius: 15, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4,}}>
                        <MaterialIcons name="fastfood" size={24} color="#464646" />
                    </View>
                    <Text className="mt-2 text-sm font-semibold">Other's</Text>
                </TouchableOpacity>
            </View>

            {/* RESTURANT */}
            <View className="mt-4 p-2">
                <Text className="mt-4 text-base font-semibold" style={{color: "#446644"}}>Resturant</Text>
                <View>

                </View>
            </View>

            {/* INFO */}
            <View className="mt-4 p-2 justify-center flex-row items-center" style={{backgroundColor: "#F93F2D", width: "100%", borderRadius: 10, height: 165}}>
                <Image source={require("../../assets/images/Pizza.png")}/>
                <View>
                    <Text className="ml-4 text-2xl font-bold" style={{color: "#fff"}}>New meal prepared </Text>
                    <Text className="ml-4 mt-2 text-xs text-right font-medium" style={{ maxWidth:200, color: "#FFD600"}}>Order now and get it delivered to your location as soon as possible</Text>
                </View>
            </View>

            {/* PIZZA */}
            <View className="mt-4 p-2">
                <View className="flex-row items-center justify-between">
                    <Text className="text-base font-bold">Popular</Text>
                    <TouchableOpacity>
                        <Text className="text-sm font-regular" style={{color: "#FE6400"}}>See all</Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-2">
                    <View className="flex-row items-center justify-around">
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P1.png")}/>
                        </View>
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P2.png")}/>
                        </View>
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P3.png")}/>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-around">
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P4.png")}/>
                        </View>
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P5.png")}/>
                        </View>
                        <View className="w-1/3">
                            <Image source={require("../../assets/images/P6.png")}/>
                        </View>
                    </View>
                </View>
            </View>
            
            {/* BOTTOM DESIGN */}
        </View>
      </View>
    </ScreenWrapper>
  )
}