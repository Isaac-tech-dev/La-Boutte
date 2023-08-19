import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScreenWrapper>
      <View className="p-2 m-2 flex flex-col item-center justify-center">

        {/* TOP DESIGN */}
        <View className="mt-4 flex flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-sm font-bold mr-2">Profile</Text>
            <MaterialCommunityIcons name="account" size={20} color="black" />
          </View>
          <TouchableOpacity style={{backgroundColor:"#FE6400"}} className="p-1 rounded-md ml-2">
              <Ionicons name="ios-menu-sharp" size={20} color="white"/>
          </TouchableOpacity>
        </View>

        {/* TOP DESIGN */}
        <View className="items-center justify-center mt-6">
          <Image source={require("../../assets/images/profile.png")}/>
          <Text className="mt-2 text-lg font-semibold">Ben Davis</Text>
          <Text className="mt-1 text-xs font-regular text-gray-400">+234 (0) 90-7458-9958</Text>
        </View>

        {/* TOP DESIGN */}
        <View className="flex flex-col items-center mt-10">

          {/* CARD 1 DESIGN */}
          <View className="flex flex-row justify-around w-full items-center mb-2">
            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <Ionicons name="wallet-outline" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <Feather name="clipboard" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Order</Text>
            </TouchableOpacity>
          </View>

          {/* CARD 2 DESIGN */}
          <View className="flex flex-row justify-around w-full items-center mb-2">
            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <Ionicons name="bookmark" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Saved</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <FontAwesome name="location-arrow" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Track</Text>
            </TouchableOpacity>
          </View>

          {/* CARD 3 DESIGN */}
          <View className="flex flex-row justify-around w-full items-center mb-2">
            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <Ionicons name="location-sharp" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"#FE6400", width: 120, height: 120}} className="p-2 items-center justify-center rounded-md">
              <Ionicons name="analytics" size={30} color="#fff" />
              <Text className="text-center text-white text-base font-bold">Report</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScreenWrapper>
  )
}