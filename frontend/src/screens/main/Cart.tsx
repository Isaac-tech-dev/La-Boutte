import {
  FlatList,
  ListRenderItem,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStackNavigation";

import {
  CompositeScreenProps,
  Theme,
  useFocusEffect,
  useTheme,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../navigation/RootBottomTabNavigtion";
import { CART_MAIN, EMPTYCART } from "../../svg";
import { SvgXml } from "react-native-svg";
import { CartItem } from "../../redux/types/cart";
import { useAppDispatch } from "../../redux/hooks/hook";
import { adjustCartItem, fecthallcart } from "../../redux/thunk/cart";
import { ErrorResponse } from "../../redux/types/auth";
import { Console, addCommasToNumber, handleErrorEdgeCases } from "../../utils";
import Toast from "react-native-root-toast";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import Container from "../../components/Container";
import Button from "../../components/Button";
import LoaderModal from "../../components/LoaderModal";
import { pizzaImageSource } from "../../lib/pizzaImage";

type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

const currencySymbol = "₦";

const showError = (message: string) =>
  Toast.show(message || "Something went wrong please try again", {
    duration: Toast.durations.SHORT,
    backgroundColor: "red",
    position: Toast.positions.TOP,
    animation: true,
  });

const Cart = (_props: CartScreenProps) => {
  const { dark } = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busyPizzaId, setBusyPizzaId] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      const result = await dispatch(fecthallcart());
      if (fecthallcart.rejected.match(result)) {
        const err = result.payload as ErrorResponse;
        Console.error("fetchAllCart err:", err?.message);
        handleErrorEdgeCases(dispatch, err, () => showError(err?.message));
        return;
      }
      setCartItems(result.payload.items);
    } finally {
      setLoaded(true);
    }
  }, [dispatch]);

  // Refresh every time the tab comes into focus (e.g. after adding from the Menu).
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart])
  );

  const changeQuantity = async (pizzaId: string, delta: number) => {
    setBusyPizzaId(pizzaId);
    try {
      const result = await dispatch(adjustCartItem({ pizzaId, delta }));
      if (adjustCartItem.rejected.match(result)) {
        const err = result.payload as ErrorResponse;
        handleErrorEdgeCases(dispatch, err, () => showError(err?.message));
        return;
      }
      const { quantity } = result.payload;
      setCartItems((items) =>
        quantity === 0
          ? items.filter((i) => i.pizza.id !== pizzaId)
          : items.map((i) => (i.pizza.id === pizzaId ? { ...i, quantity } : i))
      );
    } finally {
      setBusyPizzaId(null);
    }
  };

  const total = cartItems.reduce((sum, i) => sum + i.pizza.price * i.quantity, 0);

  const renderCartItems: ListRenderItem<CartItem> = ({ item }) => {
    const busy = busyPizzaId === item.pizza.id;
    return (
      <View className={`mb-[2.5px] w-full`}>
        <View
          className={`${
            dark ? "bg-[#2a2a2a]" : "bg-[#fff]"
          } shadow-md h-[120px] w-full rounded-[5px] px-[20px] py-[10px] flex-row items-center justify-between mb-[20px]`}
        >
          <View className={`gap-3`}>
            <Image
              source={pizzaImageSource(item.pizza)}
              style={{ width: 80, height: 80 }}
              className={`rounded-full`}
            />
          </View>

          {/* ITEMS */}
          <View className={`flex-row items-center justify-center gap-4`}>
            <View>
              <Text className={`${dark ? "text-[#fff]" : "text-[#000]"}`}>
                {item.pizza.name}
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center">
                  <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                  <Text className={`ml-1 ${dark ? "text-[#fff]" : "text-[#000]"}`}>5.0g</Text>
                </View>
                <View className="flex-row items-center ml-2">
                  <Ionicons name="flash" size={12} color="#464646" />
                  <Text className={`ml-1 ${dark ? "text-[#fff]" : "text-[#000]"}`}>60 cal</Text>
                </View>
              </View>
              <Text className={`${dark ? "text-[#fff]" : "text-[#000]"}`}>
                {currencySymbol}
                {addCommasToNumber(item.pizza.price)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <View className="flex-row justify-around items-center">
                <TouchableOpacity
                  disabled={busy}
                  onPress={() => changeQuantity(item.pizza.id, 1)}
                  className={`bg-[#FE6400] p-[2px] rounded-[5px] ${busy ? "opacity-50" : ""}`}
                  accessibilityLabel={`Add one ${item.pizza.name}`}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
                <Text
                  className={`ml-2 mr-2 text-sm font-bold ${dark ? "text-[#fff]" : "text-[#000]"}`}
                >
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  disabled={busy}
                  onPress={() => changeQuantity(item.pizza.id, -1)}
                  className={`bg-[#FE6400] p-[2px] rounded-[5px] ${busy ? "opacity-50" : ""}`}
                  accessibilityLabel={`Remove one ${item.pizza.name}`}
                >
                  <AntDesign name="minus" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmptyCart = () => (
    <View className="flex-1">
      <View className={`flex-1 justify-center items-center`}>
        <SvgXml xml={EMPTYCART} />
        <Text className={`text-[24px]`} style={{ fontFamily: "bold" }}>
          Your cart is empty
        </Text>
      </View>
    </View>
  );

  const FullCart = () => (
    <View className={`flex-1 w-full`}>
      {/* List of Cart */}
      <View className={`flex-[0.8] mt-[20px]`}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          renderItem={renderCartItems}
          keyExtractor={(item) => item.id}
          style={{ paddingBottom: 20 }}
        />
      </View>
      <View className={`flex-[0.3] items-center`}>
        <Text className={`mb-[10px] text-[18px] font-bold ${dark ? "text-[#fff]" : "text-[#000]"}`}>
          Total: {currencySymbol}
          {addCommasToNumber(total.toFixed(2))}
        </Text>
        <Button text="Checkout" />
      </View>
    </View>
  );

  return (
    <Container
      hidelefticon
      showHeader
      headerText="Cart"
      HeaderRightIcon2={
        <TouchableOpacity>
          <SvgXml xml={CART_MAIN} />
        </TouchableOpacity>
      }
      hideScrollView={true}
    >
      {cartItems.length === 0 ? EmptyCart() : FullCart()}
      <LoaderModal visible={!loaded} />
    </Container>
  );
};

export default Cart;

const styles = StyleSheet.create({});
