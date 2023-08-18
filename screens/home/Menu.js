import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Modal, Button } from 'react-native'
import React, {useState} from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Menu() {

    const navigation = useNavigation();

    const drinkNavigate = () => {
        navigation.navigate("Menu_Drinks"); // Navigate to the next screen
      };
    
    const allNavigate = () => {
        navigation.navigate("Home");
    }
    const deatailsnavigate = () => {
        navigation.navigate("FoodDetails");
    }

    const cart = () => {
        setModalVisible(false);
        navigation.navigate("Cart");
    }

    const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenWrapper>
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
                <TouchableOpacity style={{backgroundColor: "#FE6400", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm text-white font-bold text-center">Pizza</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={drinkNavigate} style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "20%"}}>
                    <Text className="text-sm font-bold text-center">Drinks</Text>
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

            {/* PIZZA */}
            <View className="mt-8">
                <ScrollView>
                <TouchableOpacity onPress={deatailsnavigate} className="flex-row items-center justify-between" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P2.png")}/>
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
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor:"#FE6400", padding: 5, borderRadius: 10}}>
                                <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-between mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P2.png")}/>
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

                <TouchableOpacity className="flex-row items-center justify-between mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P2.png")}/>
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

                <TouchableOpacity className="flex-row items-center justify-between mt-4" style={{backgroundColor: "#fff", padding: 10, borderRadius: 10, shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 4, width: "100%"}}>
                    <Image source={require("../../assets/images/P2.png")}/>
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
                </ScrollView>
            </View>
        
            {/* MODAL DESIGN */}
            <Modal animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity onPress={() => setModalVisible(false)} className="h-full flex flex-col item-center justify-center">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View className="bg-white p-4 rounded-lg" style={{width: "75%", height: 400, elevation: 5, padding: 10, borderRadius: 10}}>
                        <View className="flex flex-col p-2 justify-center items-center">
                            <Image source={require("../../assets/images/P1.png")}/>
                            <Text>Pizza with chicken salad</Text>
                            <View className="flex flex-row items-center mt-1">
                                <Ionicons name="flash" size={10} color="#464646" />
                                <Text className="ml-2 text-xs font-light">60 cal</Text>
                            </View>
                            <Text className="text-justify font-medium mt-1" style={{fontSize: 8, lineHeight: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit eget nibh pretium, hendrerit posuere. Viverra scelerisque egestas ut tempor diam ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tortor, volutpat sit.</Text>
                            <View className="flex flex-row justify-around items-center mt-2">
                                <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                    <AntDesign name="plus" size={16} color="white" />
                                </TouchableOpacity>
                                <Text className="ml-2 mr-2 text-sm font-bold">1</Text>
                                <TouchableOpacity style={{backgroundColor:"#FE6400", padding: 2, borderRadius: 5}}>
                                    <AntDesign name="minus" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={cart} className="mt-10 w-full items-center" style={{padding: 10, backgroundColor:"#FE6400", borderRadius: 5}}>
                                <Text className="text-base font-bold text-white">Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </TouchableOpacity>
                
            </Modal>
            
        </View>
      </View>
    </ScreenWrapper>
  )
}