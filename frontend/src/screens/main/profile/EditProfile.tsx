import { Text, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Avatar from "../../../components/Avatar";
import LoaderModal from "../../../components/LoaderModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { updateProfile } from "../../../redux/thunk/profile";

type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, "EditProfile">;

const MAX_NAME_LENGTH = 50;

const EditProfile = ({ navigation }: EditProfileScreenProps) => {
  const { dark } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user.firstname ?? "");
  const [lastName, setLastName] = useState(user.lastname ?? "");
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const firstError = touched && !firstName.trim() ? "First name is required" : undefined;
  const lastError = touched && !lastName.trim() ? "Last name is required" : undefined;
  const changed =
    firstName.trim() !== (user.firstname ?? "") || lastName.trim() !== (user.lastname ?? "");
  const canSave = changed && !!firstName.trim() && !!lastName.trim() && !saving;

  const save = async () => {
    setTouched(true);
    if (!canSave) return;
    setSaving(true);
    const result = await dispatch(updateProfile({ firstName, lastName }));
    setSaving(false);

    if (updateProfile.rejected.match(result)) {
      Toast.show(result.payload?.message ?? "Couldn't save your profile", {
        duration: Toast.durations.SHORT,
        backgroundColor: "red",
        position: Toast.positions.TOP,
      });
      return;
    }
    Toast.show("Profile updated", {
      duration: Toast.durations.SHORT,
      backgroundColor: "green",
      position: Toast.positions.TOP,
    });
    navigation.goBack();
  };

  const labelClass = `text-[13px] font-semibold ${dark ? "text-[#D4D4D8]" : "text-[#52525B]"}`;
  // Visible field edges: the inputs are white on a white page otherwise
  const fieldClass = `border ${dark ? "border-[#3F3F46]" : "border-[#E4E4E7]"}`;

  return (
    <Container showHeader headerText="Edit profile">
      <View className={`w-full pb-[32px]`}>
        {/* Live preview of the avatar initials */}
        <View className={`items-center mt-[8px] mb-[24px]`}>
          <Avatar firstName={firstName} lastName={lastName} email={user.email} size={88} />
        </View>

        <View className={`gap-[16px]`}>
          <Input
            label="First name"
            labelClassName={labelClass}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            maxLength={MAX_NAME_LENGTH}
            className={fieldClass}
            error={firstError}
          />
          <Input
            label="Last name"
            labelClassName={labelClass}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            maxLength={MAX_NAME_LENGTH}
            className={fieldClass}
            error={lastError}
          />
          <View>
            <Input
              label="Email"
              labelClassName={labelClass}
              placeholder="Email"
              value={user.email ?? ""}
              editable={false}
              className={`${fieldClass} opacity-60`}
            />
            <Text className={`mt-[6px] ml-[4px] text-[12px] text-[#8A8A8A]`}>
              Your email is your login, so it can't be changed here.
            </Text>
          </View>
        </View>

        <View className={`mt-[32px]`}>
          <Button
            text={saving ? "Saving…" : "Save changes"}
            onPress={save}
            disabled={!canSave}
            containerClassName={`w-full`}
            className={`w-full`}
          />
        </View>
      </View>
      <LoaderModal visible={saving} />
    </Container>
  );
};

export default EditProfile;
