import React, { FC } from "react";
import { Text, View } from "react-native";

type AvatarProps = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  size?: number;
};

/** Initials from the user's name, falling back to the first letter of their email. */
export function initialsFor(firstName?: string | null, lastName?: string | null, email?: string | null) {
  const fromName = `${firstName?.trim()[0] ?? ""}${lastName?.trim()[0] ?? ""}`.toUpperCase();
  if (fromName) return fromName;
  return (email?.trim()[0] ?? "?").toUpperCase();
}

/** Round avatar showing the user's initials on the brand colour. */
const Avatar: FC<AvatarProps> = ({ firstName, lastName, email, size = 96 }) => (
  <View
    className={`items-center justify-center bg-[#FE6400]`}
    style={{ width: size, height: size, borderRadius: size / 2 }}
    accessibilityLabel="Profile picture"
  >
    <Text className={`text-white font-bold`} style={{ fontSize: size * 0.36 }}>
      {initialsFor(firstName, lastName, email)}
    </Text>
  </View>
);

export default Avatar;
