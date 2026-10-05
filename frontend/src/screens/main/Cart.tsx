import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStackNavigation";
import { CompositeScreenProps, useFocusEffect, useTheme } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../navigation/RootBottomTabNavigtion";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-root-toast";
import { EMPTYCART } from "../../svg";
import { CartItem } from "../../redux/types/cart";
import { useAppDispatch } from "../../redux/hooks/hook";
import { adjustCartItem, clearCart, fecthallcart } from "../../redux/thunk/cart";
import { addCommasToNumber } from "../../utils";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Panel from "../../components/Panel";
import QuantityStepper from "../../components/QuantityStepper";
import { pizzaImageSource } from "../../lib/pizzaImage";

type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

const BRAND = "#FE6400";
const naira = (amount: number) =>
  `₦${addCommasToNumber(Number.isInteger(amount) ? amount : amount.toFixed(2))}`;

const showError = (message?: string) =>
  Toast.show(message || "Something went wrong, please try again", {
    duration: Toast.durations.SHORT,
    backgroundColor: "red",
    position: Toast.positions.TOP,
  });

const Cart = ({ navigation }: CartScreenProps) => {
  const { dark } = useTheme();
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyPizzaId, setBusyPizzaId] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    const result = await dispatch(fecthallcart());
    if (fecthallcart.fulfilled.match(result)) {
      setCartItems(result.payload.items);
    } else {
      showError(result.payload?.message);
    }
    setLoading(false);
  }, [dispatch]);

  // Refresh every time the tab comes into focus (e.g. after adding from the Menu)
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart])
  );

  const refresh = async () => {
    setRefreshing(true);
    await loadCart();
    setRefreshing(false);
  };

  const changeQuantity = async (pizzaId: string, delta: 1 | -1) => {
    setBusyPizzaId(pizzaId);
    const result = await dispatch(adjustCartItem({ pizzaId, delta }));
    setBusyPizzaId(null);
    if (adjustCartItem.rejected.match(result)) {
      showError(result.payload?.message);
      return;
    }
    const { quantity } = result.payload;
    setCartItems((items) =>
      quantity === 0
        ? items.filter((i) => i.pizza.id !== pizzaId)
        : items.map((i) => (i.pizza.id === pizzaId ? { ...i, quantity } : i))
    );
  };

  const confirmClear = () =>
    Alert.alert("Clear your cart?", "This removes every pizza from your cart.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear cart",
        style: "destructive",
        onPress: async () => {
          const result = await dispatch(clearCart());
          if (clearCart.fulfilled.match(result)) setCartItems([]);
          else showError(result.payload?.message);
        },
      },
    ]);

  const checkout = () =>
    Toast.show("Checkout is coming soon", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });

  const total = cartItems.reduce((sum, i) => sum + i.pizza.price * i.quantity, 0);
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const text = dark ? "text-white" : "text-[#1A1A1A]";
  const muted = dark ? "text-[#A1A1AA]" : "text-[#71717A]";
  const surface = dark ? "bg-[#262626]" : "bg-[#F4F4F5]";

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const { pizza, quantity } = item;
    return (
      <Panel
        title={pizza.name}
        titleNumberOfLines={1}
        titleClassName={`text-[16px] font-semibold ${text}`}
        subtitle={quantity > 1 ? `${naira(pizza.price)} each` : naira(pizza.price)}
        subTitleClassName={`text-[14px] mt-[4px] font-semibold`}
        subTitleStyle={{ color: BRAND }}
        className={`px-[12px] py-[12px] rounded-[18px]`}
        style={styles.softShadow}
        onPress={() =>
          navigation.navigate("MenuDescription", {
            id: pizza.id,
            image: pizza.image_url,
            name: pizza.name,
            description: pizza.description,
            price: pizza.price,
            isVeg: pizza.is_veg,
          })
        }
        LeftIcon={
          <View className={`w-[68px] h-[68px] rounded-[16px] items-center justify-center ${dark ? "bg-[#2F2F2F]" : "bg-[#FFF4EC]"}`}>
            <Image source={pizzaImageSource(pizza)} style={styles.rowImage} resizeMode="contain" />
          </View>
        }
        RightIcon={
          <QuantityStepper
            quantity={quantity}
            name={pizza.name}
            busy={busyPizzaId === pizza.id}
            onChange={(delta) => changeQuantity(pizza.id, delta)}
          />
        }
      />
    );
  };

  const header = (
    <View className={`pt-[8px] pb-[8px] flex-row items-center justify-between`}>
      <View>
        <Text className={`text-[24px] font-bold ${text}`}>Your cart</Text>
        {itemCount > 0 && (
          <Text className={`mt-[2px] text-[13px] ${muted}`}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        )}
      </View>
      {cartItems.length > 0 && (
        <TouchableOpacity onPress={confirmClear} hitSlop={10} accessibilityLabel="Clear cart">
          <Text className={`text-[14px] font-semibold text-[#E5484D]`}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const empty = loading ? (
    <View className={`gap-[12px]`}>
      {[0, 1, 2].map((i) => (
        <View key={i} className={`h-[92px] rounded-[18px] ${surface}`} />
      ))}
    </View>
  ) : (
    <View className={`mt-[32px] items-center px-[12px]`}>
      <SvgXml xml={EMPTYCART} width={180} height={168} />
      <Text className={`mt-[16px] text-[20px] font-bold ${text}`}>Your cart is empty</Text>
      <Text className={`mt-[6px] text-[14px] text-center ${muted}`}>
        Add a pizza from the menu and it will show up here.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Menu")}
        className={`mt-[20px] px-[22px] py-[12px] rounded-full bg-[#FE6400]`}
      >
        <Text className={`text-[15px] font-semibold text-white`}>Browse menu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container hideScrollView>
      <FlatList
        className={`flex-1`}
        data={loading ? [] : cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
      />

      {/* ORDER SUMMARY — pinned above the tab bar */}
      {cartItems.length > 0 && (
        <View className={`mb-[12px] p-[16px] rounded-[20px] ${surface}`}>
          <View className={`flex-row justify-between items-center`}>
            <Text className={`text-[14px] ${muted}`}>
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </Text>
            <Text className={`text-[14px] font-semibold ${text}`}>{naira(total)}</Text>
          </View>
          <View className={`mt-[6px] flex-row justify-between items-center`}>
            <Text className={`text-[14px] ${muted}`}>Delivery</Text>
            <Text className={`text-[14px] ${muted}`}>Added at checkout</Text>
          </View>
          <View className={`my-[12px] h-[1px] ${dark ? "bg-[#3A3A3A]" : "bg-[#E4E4E7]"}`} />
          <View className={`flex-row justify-between items-center`}>
            <Text className={`text-[16px] font-bold ${text}`}>Total</Text>
            <Text className={`text-[22px] font-bold ${text}`}>{naira(total)}</Text>
          </View>
          <View className={`mt-[14px]`}>
            <Button
              text="Checkout"
              onPress={checkout}
              containerClassName={`w-full`}
              className={`w-full rounded-[14px]`}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

export default Cart;

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 16,
  },
  softShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  rowImage: {
    width: 56,
    height: 56,
  },
});
