import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { CompositeScreenProps, useFocusEffect, useTheme } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../../navigation/RootBottomTabNavigtion";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import Container from "../../../components/Container";
import Panel from "../../../components/Panel";
import CartButton from "../../../components/CartButton";
import QuantityStepper from "../../../components/QuantityStepper";
import { useAppDispatch } from "../../../redux/hooks/hook";
import { fetchAllPizza } from "../../../redux/thunk/store";
import { adjustCartItem, fecthallcart } from "../../../redux/thunk/cart";
import type { Pizza } from "../../../redux/types/store";
import { pizzaImageSource } from "../../../lib/pizzaImage";
import { addCommasToNumber } from "../../../utils";

type MenuScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Menu">,
  NativeStackScreenProps<RootStackParamList>
>;

type Filter = "all" | "meat-free";
const BRAND = "#FE6400";
const naira = (amount: number) => `₦${addCommasToNumber(amount)}`;

const Menu = ({ navigation }: MenuScreenProps) => {
  const { dark } = useTheme();
  const dispatch = useAppDispatch();

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  // pizza id -> quantity already in the cart, so each row can show a stepper
  const [inCart, setInCart] = useState<Record<string, number>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [menu, cart] = await Promise.all([dispatch(fetchAllPizza()), dispatch(fecthallcart())]);
    if (fetchAllPizza.fulfilled.match(menu)) {
      setPizzas(menu.payload.data);
      setLoadFailed(false);
    } else {
      setLoadFailed(true);
    }
    if (fecthallcart.fulfilled.match(cart)) {
      setInCart(Object.fromEntries(cart.payload.items.map((i) => [i.pizza.id, i.quantity])));
    }
    setLoading(false);
  }, [dispatch]);

  // Refresh whenever the tab comes into view (the cart may have changed elsewhere)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const changeQuantity = async (pizza: Pizza, delta: 1 | -1) => {
    setBusyId(pizza.id);
    const result = await dispatch(adjustCartItem({ pizzaId: pizza.id, delta }));
    setBusyId(null);
    if (adjustCartItem.fulfilled.match(result)) {
      setInCart((current) => ({ ...current, [pizza.id]: result.payload.quantity }));
      if (delta > 0 && result.payload.quantity === 1) {
        Toast.show(`Added ${pizza.name} to your cart`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    } else {
      Toast.show(result.payload?.message ?? "Couldn't update your cart", {
        duration: Toast.durations.SHORT,
        backgroundColor: "red",
        position: Toast.positions.TOP,
      });
    }
  };

  const openPizza = (pizza: Pizza) =>
    navigation.navigate("MenuDescription", {
      id: pizza.id,
      image: pizza.image_url,
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      isVeg: pizza.is_veg,
    });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pizzas.filter(
      (p) =>
        (filter === "all" || p.is_veg) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [pizzas, query, filter]);

  const cartCount = Object.values(inCart).reduce((sum, n) => sum + n, 0);
  const hasMeatFree = pizzas.some((p) => p.is_veg);
  const text = dark ? "text-white" : "text-[#1A1A1A]";
  const muted = dark ? "text-[#A1A1AA]" : "text-[#71717A]";
  const surface = dark ? "bg-[#262626]" : "bg-[#F4F4F5]";

  const filterChip = (value: Filter, label: string) => {
    const selected = filter === value;
    return (
      <TouchableOpacity
        key={value}
        onPress={() => setFilter(value)}
        className={`px-[16px] py-[8px] rounded-full ${selected ? "bg-[#FE6400]" : surface}`}
        accessibilityState={{ selected }}
      >
        <Text className={`text-[14px] font-semibold ${selected ? "text-white" : text}`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  // Kept as an element (not a component) so the search box keeps focus while typing
  const header = (
    <View className={`pt-[8px] pb-[8px]`}>
      <View className={`flex-row items-center justify-between`}>
        <View>
          <Text className={`text-[24px] font-bold ${text}`}>Menu</Text>
          {!loading && !loadFailed && (
            <Text className={`mt-[2px] text-[13px] ${muted}`}>
              {pizzas.length} {pizzas.length === 1 ? "pizza" : "pizzas"}
            </Text>
          )}
        </View>
        <CartButton count={cartCount} onPress={() => navigation.navigate("Cart")} />
      </View>

      {/* SEARCH */}
      <View className={`mt-[16px] h-[52px] flex-row items-center gap-[10px] px-[16px] rounded-[16px] ${surface}`}>
        <Feather name="search" size={18} color={dark ? "#A1A1AA" : "#71717A"} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search pizzas"
          placeholderTextColor={dark ? "#A1A1AA" : "#71717A"}
          className={`flex-1 h-full text-[15px] ${text}`}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Search pizzas"
        />
        {!!query && (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={10} accessibilityLabel="Clear search">
            <Feather name="x-circle" size={18} color={dark ? "#A1A1AA" : "#71717A"} />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTERS — Meat-free only shows when the menu has vegetarian pizzas */}
      {hasMeatFree && (
        <View className={`mt-[14px] flex-row gap-[8px]`}>
          {filterChip("all", "All")}
          {filterChip("meat-free", "Meat-free")}
        </View>
      )}
    </View>
  );

  const renderPizza = ({ item }: { item: Pizza }) => {
    const quantity = inCart[item.id] ?? 0;
    return (
      <Panel
        title={item.name}
        titleNumberOfLines={1}
        titleClassName={`text-[16px] font-semibold ${text}`}
        subtitle={naira(item.price)}
        subTitleClassName={`text-[15px] mt-[4px] font-bold`}
        subTitleStyle={{ color: BRAND }}
        className={`px-[12px] py-[12px] rounded-[18px]`}
        style={styles.softShadow}
        onPress={() => openPizza(item)}
        LeftIcon={
          <View className={`w-[76px] h-[76px] rounded-[16px] items-center justify-center ${dark ? "bg-[#2F2F2F]" : "bg-[#FFF4EC]"}`}>
            <Image source={pizzaImageSource(item)} style={styles.rowImage} resizeMode="contain" />
          </View>
        }
        RightIcon={
          quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              name={item.name}
              busy={busyId === item.id}
              onChange={(delta) => changeQuantity(item, delta)}
            />
          ) : (
            <TouchableOpacity
              onPress={() => changeQuantity(item, 1)}
              disabled={busyId === item.id}
              hitSlop={8}
              className={`w-[36px] h-[36px] rounded-full items-center justify-center bg-[#FE6400] ${busyId === item.id ? "opacity-50" : ""}`}
              accessibilityLabel={`Add ${item.name} to cart`}
            >
              <Feather name="plus" size={18} color="#fff" />
            </TouchableOpacity>
          )
        }
      />
    );
  };

  const empty = loading ? (
    <View className={`gap-[12px]`}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} className={`h-[100px] rounded-[18px] ${surface}`} />
      ))}
    </View>
  ) : loadFailed ? (
    <View className={`mt-[24px] items-center`}>
      <Text className={`text-[16px] font-semibold ${text}`}>The menu didn't load</Text>
      <Text className={`mt-[4px] text-[14px] text-center ${muted}`}>
        Check your connection, then pull down to try again.
      </Text>
    </View>
  ) : (
    <View className={`mt-[24px] items-center`}>
      <Text className={`text-[16px] font-semibold text-center ${text}`}>
        {query.trim() ? `No pizzas match "${query.trim()}"` : "No meat-free pizzas right now"}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setQuery("");
          setFilter("all");
        }}
        className={`mt-[12px] px-[16px] py-[8px] rounded-full border border-[#FE6400]`}
      >
        <Text className={`text-[14px] font-semibold text-[#FE6400]`}>Show all pizzas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container hideScrollView>
      <FlatList
        data={loading ? [] : visible}
        keyExtractor={(item) => item.id}
        renderItem={renderPizza}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </Container>
  );
};

export default Menu;

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  softShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  rowImage: {
    width: 64,
    height: 64,
  },
});
