import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login, register } from "../../redux/thunk/auth";
import {
  ErrorResponse,
  LogUserInResponse,
  RegisterUserResponse,
} from "../../redux/types/auth";
import { Console, handleErrorEdgeCases } from "../../utils";
import { useAppDispatch } from "../../redux/hooks/hook";
import Toast from "react-native-root-toast";
import LoaderModal from "../../components/LoaderModal";
import { setUser } from "../../redux/slice/UserSlice";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login = ({ navigation }: LoginScreenProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showloadingmodal, setShowLoadingModal] = useState(false);
  const filled = email && password;

  const loginUser = async () => {
    try {
      setShowLoadingModal(true);
      const result = await dispatch(
        login({
          email: email,
          password: password,
        })
      );

      setShowLoadingModal(false);
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        handleErrorEdgeCases(dispatch, err, () => {
          Toast.show(err.message || "Something went wrong please try again", {
            duration: Toast.durations.SHORT,
            backgroundColor: "red",
            position: Toast.positions.TOP,
            animation: true,
          });
        });

        Console.log("Login err", err);
        return;
      }

      if (meta.requestStatus == "fulfilled") {
        let res_data = payload as LogUserInResponse;
        Console.log("Login Response", res_data);
        Toast.show(res_data.message || "Login Successsfull!", {
          duration: Toast.durations.SHORT,
          backgroundColor: "green",
          position: Toast.positions.TOP,
        });
        //navigation.navigate("Login");
        dispatch(
          setUser({
            loggedIn: true,
            accessToken: res_data.accessToken,
            email: res_data.user.email,
            firstname: res_data.user.firstName,
            lastname: res_data.user.lastName,
            uuid: res_data.user._id,
          })
        );

        // Clear the fields by resetting the state
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setShowLoadingModal(false);
      console.log(error);
    }
  };

  const homeNavigate = () => {
    navigation.navigate("Register"); // Navigate to the next screen
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
          <Text className={`text-[32px]`}>Welcome Back!</Text>
          <Text className={`text-14px`}>Please Log In to your account</Text>

          {/* Form */}
          <View className={`w-full space-y-3 mb-[20px]`}>
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
          </View>

          {/* Button */}
          <Button text="Sign In" onPress={loginUser} disabled={!filled} />

          <View className={`space-y-4`}>
            <View className={`flex-row justify-around space-x-4 items-center`}>
              <View className={`border-[1px] border-[#D9D9D9] w-[122px]`} />
              <Text>Connect with</Text>
              <View className={`border-[1px] border-[#D9D9D9] w-[122px]`} />
            </View>

            <View
              className={`flex-row justify-center items-center space-x-[70px]`}
            >
              <FontAwesome5 name="facebook" size={24} color="#5675C5" />
              <FontAwesome name="google-plus" size={24} color="#F93F2D" />
              <AntDesign name="apple1" size={24} color="#88A396" />
            </View>
          </View>

          {/* Link */}
          <View
            className={`flex-row justify-center items-center mt-[10px] space-x-3`}
          ></View>
        </View>
        <LoaderModal visible={showloadingmodal} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({});
