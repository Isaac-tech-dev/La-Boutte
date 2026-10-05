import React, { FC, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Panel from "./Panel";

type MenuRowProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  onPress?: () => void;
  /** Replaces the chevron, e.g. with a Switch */
  right?: ReactNode;
  destructive?: boolean;
};

/** A settings-style row (icon · title/subtitle · chevron) built on Panel. */
const MenuRow: FC<MenuRowProps> = ({ title, subtitle, icon, onPress, right, destructive }) => {
  const { dark } = useTheme();
  const titleColor = destructive ? "text-[#E5484D]" : dark ? "text-white" : "text-[#1A1A1A]";

  return (
    <Panel
      title={title}
      titleClassName={`text-[15px] font-semibold ${titleColor}`}
      subtitle={subtitle ?? ""}
      subTitleClassName={`text-[12px] mt-[2px]`}
      className={`px-[14px] py-[12px] rounded-[14px]`}
      style={styles.shadow}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      LeftIcon={icon}
      RightIcon={
        right ??
        (onPress && !destructive ? (
          <Feather name="chevron-right" size={20} color={dark ? "#808080" : "#B3B3B3"} />
        ) : null)
      }
    />
  );
};

export default MenuRow;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
});
