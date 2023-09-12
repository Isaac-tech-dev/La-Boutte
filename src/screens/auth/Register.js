import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { AuthContext } from "../../components/context";

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  // const handleRegister = () => {
  //   auth.createUserWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user
  //     console.log(user.email)
  //   })
  //   .catch(error => alert(error.message))
  // }

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const navigation = useNavigation();

  const loginNavigate = () => {
    navigation.navigate("Login"); // Navigate to the next screen
  };

  const { signUp } = React.useContext(AuthContext);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Please fill in your information</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="account-circle" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="phone" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(number) => setPhoneNumber(number)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="eye-with-line" style={styles.inputIcon} />
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Password"
          />
        </View>

        <TouchableOpacity onPress={loginNavigate} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.accountText}>
          <Text style={styles.accountTextContent}>
            You already have an account,
          </Text>
          <TouchableOpacity onPress={loginNavigate}>
            <Text style={styles.accountTextLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 8,
    color: "#FE6400",
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    width: 300,
    backgroundColor: "#FE6400",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  accountText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  accountTextContent: {
    fontSize: 14,
  },
  accountTextLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FE6400",
  },
});
