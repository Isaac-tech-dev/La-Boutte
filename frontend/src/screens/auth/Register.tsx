import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigation";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthLayout from "../../components/AuthLayout";
import FormError from "../../components/FormError";
import LoaderModal from "../../components/LoaderModal";
import { useAppDispatch } from "../../redux/hooks/hook";
import { register } from "../../redux/thunk/auth";

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Supabase's default minimum; change both if you raise it in the dashboard
const MIN_PASSWORD_LENGTH = 6;

const Register = ({ navigation }: RegisterScreenProps) => {
  const { dark } = useTheme();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set when Supabase wants the email confirmed before the first login
  const [confirmEmailFor, setConfirmEmailFor] = useState<string | null>(null);

  const emailError =
    email.length > 0 && !EMAIL_PATTERN.test(email.trim()) ? "Enter a valid email address" : undefined;
  const passwordError =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH
      ? `Use at least ${MIN_PASSWORD_LENGTH} characters`
      : undefined;
  const confirmError =
    confirmPassword.length > 0 && confirmPassword !== password ? "Passwords don't match" : undefined;

  const canSubmit =
    !!firstName.trim() &&
    !!lastName.trim() &&
    EMAIL_PATTERN.test(email.trim()) &&
    password.length >= MIN_PASSWORD_LENGTH &&
    confirmPassword === password &&
    !loading;

  const text = dark ? "text-white" : "text-[#1A1A1A]";
  const muted = dark ? "text-[#A1A1AA]" : "text-[#71717A]";
  const labelClass = `text-[13px] font-semibold ${dark ? "text-[#D4D4D8]" : "text-[#52525B]"}`;
  const fieldClass = `border ${dark ? "border-[#3F3F46]" : "border-[#E4E4E7]"}`;

  const submit = async () => {
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    const result = await dispatch(
      register({ firstName, lastName, email, password, confirmpassword: confirmPassword })
    );
    setLoading(false);

    if (register.rejected.match(result)) {
      setError(result.payload?.message ?? "Couldn't create your account. Try again.");
      return;
    }
    // With email confirmation off, Supabase logs the user straight in and authSync switches
    // to the app. With it on, show the "check your email" step.
    if (!result.payload.sessionCreated) setConfirmEmailFor(email.trim());
  };

  const clearError = () => setError(null);

  const footer = (
    <View className={`flex-row items-center gap-[6px]`}>
      <Text className={`text-[14px] ${muted}`}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")} hitSlop={8}>
        <Text className={`text-[14px] font-bold text-[#FE6400]`}>Log in</Text>
      </TouchableOpacity>
    </View>
  );

  if (confirmEmailFor) {
    return (
      <AuthLayout title="Check your email" subtitle={`We sent a confirmation link to ${confirmEmailFor}.`}>
        <View className={`flex-row items-start gap-[12px] p-[16px] rounded-[16px] ${dark ? "bg-[#262626]" : "bg-[#F4F4F5]"}`}>
          <Feather name="mail" size={20} color="#FE6400" style={{ marginTop: 2 }} />
          <Text className={`flex-1 text-[14px] leading-[21px] ${text}`}>
            Open the link to confirm your account, then come back and log in. If you can't find it,
            check your spam folder.
          </Text>
        </View>
        <View className={`mt-[28px]`}>
          <Button
            text="Go to log in"
            onPress={() => navigation.navigate("Login")}
            containerClassName={`w-full`}
            className={`w-full rounded-[14px]`}
          />
        </View>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes a minute, then you can start ordering."
      footer={footer}
    >
      <View className={`gap-[16px]`}>
        <View className={`flex-row gap-[12px]`}>
          <View className={`flex-1`}>
            <Input
              label="First name"
              labelClassName={labelClass}
              placeholder="Ada"
              className={fieldClass}
              value={firstName}
              maxLength={50}
              onChangeText={(t) => {
                setFirstName(t);
                clearError();
              }}
            />
          </View>
          <View className={`flex-1`}>
            <Input
              label="Last name"
              labelClassName={labelClass}
              placeholder="Obi"
              className={fieldClass}
              value={lastName}
              maxLength={50}
              onChangeText={(t) => {
                setLastName(t);
                clearError();
              }}
            />
          </View>
        </View>
        <Input
          label="Email"
          labelClassName={labelClass}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          className={fieldClass}
          value={email}
          error={emailError}
          onChangeText={(t) => {
            setEmail(t);
            clearError();
          }}
        />
        <Input
          label="Password"
          labelClassName={labelClass}
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          secureTextEntry
          textContentType="password"
          className={fieldClass}
          value={password}
          error={passwordError}
          onChangeText={(t) => {
            setPassword(t);
            clearError();
          }}
        />
        <Input
          label="Confirm password"
          labelClassName={labelClass}
          placeholder="Type it again"
          secureTextEntry
          textContentType="password"
          className={fieldClass}
          value={confirmPassword}
          error={confirmError}
          onChangeText={(t) => {
            setConfirmPassword(t);
            clearError();
          }}
        />
        <FormError message={error} />
      </View>

      <View className={`mt-[28px]`}>
        <Button
          text={loading ? "Creating account…" : "Create account"}
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

export default Register;
