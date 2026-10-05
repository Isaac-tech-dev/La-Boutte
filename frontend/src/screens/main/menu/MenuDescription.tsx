import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import Container from "../../../components/Container";
import { pizzaImageSource } from "../../../lib/pizzaImage";
import { useAppDispatch } from "../../../redux/hooks/hook";
import { adjustCartItem, fecthallcart } from "../../../redux/thunk/cart";
import { addCommasToNumber } from "../../../utils";

type MenuDescriptionScreenProps = NativeStackScreenProps<RootStackParamList, "MenuDescription">;

const MAX_QUANTITY = 20;
const naira = (amount: number) => `₦${addCommasToNumber(amount)}`;

const MenuDescription = ({ navigation, route }: MenuDescriptionScreenProps) => {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { id, name, image, description, price, isVeg } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(0);
  const [adding, setAdding] = useState(false);

  // How many of this pizza are already in the cart
  useFocusEffect(
    useCallback(() => {
      dispatch(fecthallcart()).then((result) => {
        if (fecthallcart.fulfilled.match(result)) {
          setInCart(result.payload.items.find((i) => i.pizza.id === id)?.quantity ?? 0);
        }
      });
    }, [dispatch, id])
  );

  const addToCart = async () => {
    setAdding(true);
    const result = await dispatch(adjustCartItem({ pizzaId: id, delta: quantity }));
    setAdding(false);
    if (adjustCartItem.fulfilled.match(result)) {
      setInCart(result.payload.quantity);
      setQuantity(1);
      Toast.show(`Added ${quantity} × ${name} to your cart`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } else {
      Toast.show(result.payload?.message ?? "Couldn't add to your cart", {
        duration: Toast.durations.SHORT,
        backgroundColor: "red",
        position: Toast.positions.TOP,
      });
    }
  };

  const text = dark ? "text-white" : "text-[#1A1A1A]";
  const muted = dark ? "text-[#A1A1AA]" : "text-[#71717A]";
  const surface = dark ? "bg-[#262626]" : "bg-[#F4F4F5]";

  return (
    <Container hideScrollView removePadding>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* HERO */}
        <View className={`items-center pb-[28px] rounded-b-[36px] ${dark ? "bg-[#2A211B]" : "bg-[#FFF4EC]"}`}>
          <View className={`w-full flex-row px-[20px] pt-[8px]`}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className={`w-[44px] h-[44px] rounded-full items-center justify-center ${dark ? "bg-[#1A1A1A]" : "bg-white"}`}
              style={styles.softShadow}
              accessibilityLabel="Back"
            >
              <Feather name="arrow-left" size={20} color={dark ? "#fff" : "#1A1A1A"} />
            </TouchableOpacity>
          </View>
          <Image
            source={pizzaImageSource({ id, image_url: image })}
            style={styles.heroImage}
            resizeMode="contain"
            accessibilityLabel={name}
          />
        </View>

        {/* DETAILS */}
        <View className={`px-[20px] pt-[24px]`}>
          <View className={`flex-row items-start justify-between gap-[12px]`}>
            <Text className={`flex-1 text-[26px] leading-[32px] font-bold ${text}`}>{name}</Text>
            <Text className={`text-[22px] leading-[32px] font-bold text-[#FE6400]`}>{naira(price)}</Text>
          </View>

          {(isVeg || inCart > 0) && (
            <View className={`mt-[12px] flex-row flex-wrap gap-[8px]`}>
              {isVeg && (
                <View className={`flex-row items-center gap-[6px] px-[12px] py-[6px] rounded-full ${dark ? "bg-[#1F2E1A]" : "bg-[#EEF7EA]"}`}>
                  <Feather name="feather" size={13} color="#388B24" />
                  <Text className={`text-[13px] font-semibold text-[#388B24]`}>Meat-free</Text>
                </View>
              )}
              {inCart > 0 && (
                <View className={`flex-row items-center gap-[6px] px-[12px] py-[6px] rounded-full ${surface}`}>
                  <Feather name="shopping-bag" size={13} color={dark ? "#A1A1AA" : "#71717A"} />
                  <Text className={`text-[13px] font-semibold ${muted}`}>{inCart} in your cart</Text>
                </View>
              )}
            </View>
          )}

          {!!description.trim() && (
            <View className={`mt-[24px]`}>
              <Text className={`text-[17px] font-bold ${text}`}>About this pizza</Text>
              <Text className={`mt-[8px] text-[15px] leading-[23px] ${muted}`}>{description}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ADD TO CART — pinned to the bottom */}
      <View
        className={`flex-row items-center gap-[12px] px-[20px] pt-[14px] border-t ${
          dark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-[#F1F1F2]"
        }`}
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <View className={`flex-row items-center h-[56px] px-[6px] rounded-[16px] ${surface}`}>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
            className={`w-[40px] h-[44px] items-center justify-center ${quantity === 1 ? "opacity-30" : ""}`}
            accessibilityLabel="Fewer"
          >
            <Feather name="minus" size={18} color={dark ? "#fff" : "#1A1A1A"} />
          </TouchableOpacity>
          <Text className={`w-[28px] text-center text-[17px] font-bold ${text}`} accessibilityLabel={`Quantity ${quantity}`}>
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            disabled={quantity === MAX_QUANTITY}
            className={`w-[40px] h-[44px] items-center justify-center ${quantity === MAX_QUANTITY ? "opacity-30" : ""}`}
            accessibilityLabel="More"
          >
            <Feather name="plus" size={18} color={dark ? "#fff" : "#1A1A1A"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={addToCart}
          disabled={adding}
          activeOpacity={0.85}
          className={`flex-1 h-[56px] flex-row items-center justify-between px-[20px] rounded-[16px] bg-[#FE6400] ${adding ? "opacity-60" : ""}`}
          accessibilityLabel={`Add ${quantity} to cart for ${naira(price * quantity)}`}
        >
          <Text className={`text-[16px] font-bold text-white`}>{adding ? "Adding…" : "Add to cart"}</Text>
          <Text className={`text-[16px] font-bold text-white`}>{naira(price * quantity)}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default MenuDescription;

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 24,
  },
  heroImage: {
    width: 260,
    height: 260,
    marginTop: 4,
  },
  softShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});
