import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

type IconTileProps = {
  children: ReactNode;
  /** brand: solid orange (for the white SVG icons) · soft: light orange · danger: light red */
  tone?: "brand" | "soft" | "danger";
};

/** Small rounded square that holds a row's icon. */
const IconTile: FC<IconTileProps> = ({ children, tone = "brand" }) => {
  const { dark } = useTheme();
  const background = {
    brand: "#FE6400",
    soft: dark ? "#3A2A1F" : "#FFF0E6",
    danger: dark ? "#3A2222" : "#FDECEC",
  }[tone];

  return (
    <View
      className={`w-[40px] h-[40px] rounded-[12px] items-center justify-center`}
      style={{ backgroundColor: background }}
    >
      {children}
    </View>
  );
};

export default IconTile;
