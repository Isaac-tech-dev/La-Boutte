import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { register } from "../../redux/thunk/auth";
import { ErrorResponse, RegisterUserResponse } from "../../redux/types/auth";
import { Console, handleErrorEdgeCases } from "../../utils";
import { useAppDispatch } from "../../redux/hooks/hook";
import Toast from "react-native-root-toast";
import LoaderModal from "../../components/LoaderModal";

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

const Register = ({ navigation }: RegisterScreenProps) => {
  const dispatch = useAppDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [showloadingmodal, setShowLoadingModal] = useState(false);
  const passwordMatch = password === confirmPassword;

  const filled = firstname && lastname && email && passwordMatch;

  // const handleRegister = () => {
  //   auth.createUserWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user
  //     console.log(user.email)
  //   })
  //   .catch(error => alert(error.message))
  // }

  const registerUser = async () => {
    try {
      setShowLoadingModal(true);
      const result = await dispatch(
        register({
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
          confirmpassword: confirmPassword,
        })
      );

      setShowLoadingModal(false);
      const { meta, payload } = result;
      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        handleErrorEdgeCases(dispatch, err, () => {
          Toast.show(err.message || "Something went wrong please try again", {
            duration: Toast.durations.SHORT,
          });
        });
        //Alert.alert(err.message);

        Console.log("Register err", err.message);
        return;
      }

      if (meta.requestStatus == "fulfilled") {
        let res_data = payload as RegisterUserResponse;
        navigation.navigate("Login");

        // Clear the fields by resetting the state
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassowrd("");

        Toast.show(res_data.message || "Registration Successsfull!", {
          duration: Toast.durations.SHORT,
          backgroundColor: "green",
          position: Toast.positions.TOP,
        });
        //Alert.alert(res_data.message);

        console.log("Register User:", res_data);
      }
    } catch (error) {
      setShowLoadingModal(false);
    }
  };

  const loginNavigate = () => {
    navigation.navigate("Login"); // Navigate to the next screen
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/img/1.png")} // Replace './background-image.jpg' with the path to your image
      style={{ flex: 1, justifyContent: "center" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.07 }} // Adjust the opacity as needed
    >
      <SafeAreaView className={`flex-1`}>
        <View
          className={`flex-1 justify-center items-center px-[20px] space-y-4`}
        >
          {/* Header */}
          <Text className={`text-[32px]`}>Create an Account</Text>
          <Text className={`text-14px`}>Please fill in your information</Text>

          {/* Form */}
          <View className={`w-full space-y-3 mb-[20px]`}>
            <Input
              placeholder="Firstname"
              className={`w-full bg-white shadow-md shadow-neutral-500`}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
              placeholderTextColor={`#B3B3B3`}
              textInputClassName={`text-[14px]`}
            />
            <Input
              placeholder="Lastname"
              className={`w-full bg-white shadow-md shadow-neutral-500`}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
              placeholderTextColor={`#B3B3B3`}
              textInputClassName={`text-[14px]`}
            />
            <Input
              placeholder="Email Address"
              className={`w-full bg-white shadow-md shadow-neutral-500`}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={`#B3B3B3`}
              textInputClassName={`text-[14px]`}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              className={`w-full bg-white shadow-md shadow-neutral-500`}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={`#B3B3B3`}
              textInputClassName={`text-[14px]`}
            />
            <Input
              placeholder="Confirm Password"
              secureTextEntry={true}
              className={`w-full bg-white shadow-md shadow-neutral-500`}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassowrd(text)}
              placeholderTextColor={`#B3B3B3`}
              textInputClassName={`text-[14px]`}
            />
          </View>

          {/* Button */}
          <Button text="Submit" onPress={registerUser} disabled={!filled} />

          {/* Link */}
          <View
            className={`flex-row justify-center items-center mt-[10px] space-x-3`}
          >
            <Text className={`text-[14px]`}>You already have an account,</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className={`text-[#FE6400] text-[16px] font-bold`}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoaderModal visible={showloadingmodal} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({});
