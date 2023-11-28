import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../components/context";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const navigation = useNavigation();

  const homeNavigate = () => {
    navigation.navigate("Hom"); // Navigate to the next screen
  };

  const { signIn } = React.useContext(AuthContext);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please Log In to your account</Text>

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
          <Entypo name="eye-with-line" style={styles.inputIcon} />
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={handlePasswordChange}
            style={styles.input}
            placeholder="Password"
          />
        </View>

        <TouchableOpacity onPress={signIn} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.connectWithText}>Connect with</Text>

        <View style={styles.socialIconsContainer}>
          <FontAwesome5 name="facebook" style={styles.socialIcon} />
          <FontAwesome name="google-plus" style={styles.socialIcon} />
          <AntDesign name="apple1" style={styles.socialIcon} />
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
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2a2a2a"
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
  signInButton: {
    padding: 10,
    backgroundColor: "#FE6400",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 300,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: "medium",
  },
  connectWithText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
  },
  socialIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 6,
  },
  socialIcon: {
    fontSize: 24,
    padding: 20
  },
});
