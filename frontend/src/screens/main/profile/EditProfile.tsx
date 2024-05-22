import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootStackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;

const EditProfile = ({navigation}: EditProfileScreenProps) => {
  return (
    <SafeAreaView className={`flex-1 justify-center items-center`}>
    <View>
      <Text>EditProfile</Text>
    </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({})