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
import { AntDesign } from "@expo/vector-icons";
import Container from "../../components/Container";
import Button from "../../components/Button";
import LoaderModal from "../../components/LoaderModal";
import Panel from "../../components/Panel";
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

const Cart = ({ navigation }: CartScreenProps) => {
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
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const renderCartItems: ListRenderItem<CartItem> = ({ item }) => {
    const { pizza, quantity } = item;
    const busy = busyPizzaId === pizza.id;
    const unitPrice = `${currencySymbol}${addCommasToNumber(pizza.price)}`;
    const subtitle =
      quantity > 1
        ? `${unitPrice} × ${quantity} = ${currencySymbol}${addCommasToNumber(pizza.price * quantity)}`
        : unitPrice;

    return (
      <Panel
        title={pizza.name}
        titleClassName={`text-[15px] font-semibold ${dark ? "text-white" : "text-black"}`}
        subtitle={subtitle}
        subTitleClassName={`text-[13px] mt-[4px]`}
        subTitleStyle={{ color: "#FE6400" }}
        className={`px-[12px] py-[10px] rounded-[12px]`}
        style={styles.cardShadow}
        onPress={() =>
          navigation.navigate("MenuDescription", {
            id: pizza.id,
            image: pizza.image_url,
            name: pizza.name,
            description: pizza.description,
            price: pizza.price,
          })
        }
        LeftIcon={
          <Image
            source={pizzaImageSource(pizza)}
            style={{ width: 64, height: 64 }}
            resizeMode="contain"
          />
        }
        RightIcon={
          <View className={`flex-row items-center ${busy ? "opacity-50" : ""}`}>
            <TouchableOpacity
              disabled={busy}
              onPress={() => changeQuantity(pizza.id, -1)}
              hitSlop={8}
              className={`w-[30px] h-[30px] items-center justify-center rounded-[8px] ${
                dark ? "bg-[#3A3A3A]" : "bg-[#FFF0E6]"
              }`}
              accessibilityLabel={
                quantity === 1 ? `Remove ${pizza.name} from cart` : `Remove one ${pizza.name}`
              }
            >
              {/* At 1, the minus button removes the line, so show a bin */}
              <AntDesign name={quantity === 1 ? "delete" : "minus"} size={16} color="#FE6400" />
            </TouchableOpacity>
            <Text
              className={`w-[32px] text-center text-[15px] font-bold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              disabled={busy}
              onPress={() => changeQuantity(pizza.id, 1)}
              hitSlop={8}
              className={`w-[30px] h-[30px] items-center justify-center rounded-[8px] bg-[#FE6400]`}
              accessibilityLabel={`Add one ${pizza.name}`}
            >
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>
        }
      />
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
      <FlatList
        className={`flex-1 mt-[16px]`}
        showsVerticalScrollIndicator={false}
        data={cartItems}
        renderItem={renderCartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* Footer stays pinned above the tab bar */}
      <View className={`pt-[12px] pb-[16px] items-center gap-[12px]`}>
        <View className={`w-full flex-row justify-between items-center`}>
          <Text className={`text-[16px] ${dark ? "text-[#B3B3B3]" : "text-[#4D4D4D]"}`}>
            Total ({itemCount} {itemCount === 1 ? "item" : "items"})
          </Text>
          <Text className={`text-[20px] font-bold ${dark ? "text-white" : "text-black"}`}>
            {currencySymbol}
            {addCommasToNumber(Number.isInteger(total) ? total : total.toFixed(2))}
          </Text>
        </View>
        <Button text="Checkout" containerClassName={`w-full`} className={`w-full`} />
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

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingVertical: 4,
    paddingBottom: 20,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
});
