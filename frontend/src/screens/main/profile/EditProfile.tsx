import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import { useAppSelector } from "../../../redux/hooks/hook";
import { InputState } from "../../../types";
import Button from "../../../components/Button";

type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;

const EditProfile = ({ navigation }: EditProfileScreenProps) => {
  const user = useAppSelector((state) => state.user);
  const [firstname, setFirstName] = useState<InputState>({
    value: user.firstname || "",
    error: "",
  });
  const [lastname, setLastname] = useState<InputState>({
    value: user.lastname || "",
    error: "",
  });
  const [email, setEmail] = useState<InputState>({
    value: user.email || "",
    error: "",
  });
  const filled = firstname.value && lastname.value && email.value
  return (
    <Container showHeader headerText="Edit Profie">
      <View className={`flex justify-center items-center`}>
        <Input
          value={firstname.value}
          onChangeText={(text) => {
            setFirstName({
              error: "",
              value: text,
            });
          }}
        />
        <Input
          value={lastname.value}
          onChangeText={(text) => {
            setLastname({
              error: "",
              value: text,
            });
          }}
        />
        <Input
          value={email.value}
          onChangeText={(text) => {
            setEmail({
              error: "",
              value: text,
            });
          }}
        />
        <Button text="Edit"/>
      </View>
    </Container>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
