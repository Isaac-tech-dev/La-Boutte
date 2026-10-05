import React, { FC } from "react";
import { Text } from "react-native";

/** Small grey uppercase heading above a group of rows. */
const SectionTitle: FC<{ children: string }> = ({ children }) => (
  <Text className={`text-[12px] font-semibold tracking-[1px] uppercase text-[#8A8A8A] mb-[8px] ml-[4px]`}>
    {children}
  </Text>
);

export default SectionTitle;
