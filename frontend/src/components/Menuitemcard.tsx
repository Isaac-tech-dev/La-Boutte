import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Panel from "../components/Panel"; // adjust path to your Panel

// Use the same `dark`, `navigation`, `addToCart`, `currencySymbol`,
// `addCommasToNumber` and `PIZZA_PLACEHOLDER` you already have in scope.
// They are passed as props here just to keep this file self-contained.
const MenuItemCard = ({
  item,
  dark,
  navigation,
  addToCart,
  currencySymbol,
  addCommasToNumber,
  PIZZA_PLACEHOLDER,
}: any) => {
  const textColor = dark ? "#fff" : "#000";

  return (
    <Panel
      containerClassName="mb-[15px]"
      className={`${dark ? "bg-[#2a2a2a]" : "bg-[#fff]"} px-[10px] py-[5px] shadow-md`}
      title={item.name}
      titleNumberOfLines={2}
      titleClassName={dark ? "text-[#fff]" : "text-[#000]"}
      subtitle={`${currencySymbol}${addCommasToNumber(item.price)}`}
      subTitleClassName="text-base mt-[6px]"
      subTitleStyle={{ color: textColor }}
      onPress={() =>
        navigation.navigate("MenuDescription", {
          id: item.id,
          image: item.image_url,
          name: item.name,
          description: item.description,
          price: item.price,
        })
      }
      LeftIcon={
        <View className="shadow-md rounded-full">
          <Image
            source={item.image_url ? { uri: item.image_url } : PIZZA_PLACEHOLDER}
            style={{ width: 80, height: 80 }}
            className="rounded-full"
          />
        </View>
      }
      RightIcon={
        <TouchableOpacity
          onPress={() => addToCart(item.id, item.name)}
          className="bg-[#FE6400] px-[10px] py-[10px] rounded-[10px]"
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      }
    />
  );
};

export default MenuItemCard;