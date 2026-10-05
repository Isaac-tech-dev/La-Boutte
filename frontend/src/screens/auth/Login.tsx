import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigation";
import { useTheme } from "@react-navigation/native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthLayout from "../../components/AuthLayout";
import FormError from "../../components/FormError";
import LoaderModal from "../../components/LoaderModal";
import { useAppDispatch } from "../../redux/hooks/hook";
import { login } from "../../redux/thunk/auth";
import { setUser } from "../../redux/slice/UserSlice";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Supabase's messages, rewritten to say what to do next. */
function friendlyLoginError(message: string) {
  if (/invalid login credentials/i.test(message)) {
    return "That email and password don't match. Check them and try again.";
  }
  if (/email not confirmed/i.test(message)) {
    return "Confirm your email first. Open the link we sent to your inbox, then log in.";
  }
  return message;
}

const Login = ({ navigation }: LoginScreenProps) => {
  const { dark } = useTheme();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = EMAIL_PATTERN.test(email.trim()) && password.length > 0 && !loading;
  const labelClass = `text-[13px] font-semibold ${dark ? "text-[#D4D4D8]" : "text-[#52525B]"}`;
  const fieldClass = `border ${dark ? "border-[#3F3F46]" : "border-[#E4E4E7]"}`;

  const submit = async () => {
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    const result = await dispatch(login({ email, password }));
    setLoading(false);

    if (login.rejected.match(result)) {
      setError(friendlyLoginError(result.payload?.message ?? "Couldn't log you in. Try again."));
      return;
    }
    // authSync also picks up the new session; setting it here switches screens immediately
    const { user, accessToken } = result.payload;
    dispatch(
      setUser({
        loggedIn: true,
        accessToken,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        uuid: user.id,
      })
    );
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to order your favourite pizza."
      footer={
        <View className={`flex-row items-center gap-[6px]`}>
          <Text className={`text-[14px] ${dark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}>New here?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")} hitSlop={8}>
            <Text className={`text-[14px] font-bold text-[#FE6400]`}>Create an account</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <View className={`gap-[16px]`}>
        <Input
          label="Email"
          labelClassName={labelClass}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          className={fieldClass}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(null);
          }}
        />
        <Input
          label="Password"
          labelClassName={labelClass}
          placeholder="Your password"
          secureTextEntry
          textContentType="password"
          className={fieldClass}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
        />
        <FormError message={error} />
      </View>

      <View className={`mt-[28px]`}>
        <Button
          text={loading ? "Logging in…" : "Log in"}
          onPress={submit}
          disabled={!canSubmit}
          containerClassName={`w-full`}
          className={`w-full rounded-[14px]`}
        />
      </View>
      <LoaderModal visible={loading} />
    </AuthLayout>
  );
};

export default Login;
