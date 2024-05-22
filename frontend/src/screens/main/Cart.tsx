import {
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStackNavigation";

import { CompositeScreenProps, Theme, useFocusEffect, useTheme } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../navigation/RootBottomTabNavigtion";
import { BACKARROW, CART_MAIN, EMPTYCART } from "../../svg";
import { SvgXml } from "react-native-svg";
import {
  CartData,
  CartItem,
  FetchAllCartResponse,
} from "../../redux/types/cart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { fecthallcart } from "../../redux/thunk/cart";
import { ErrorResponse } from "../../redux/types/auth";
import { Console, addCommasToNumber, handleErrorEdgeCases } from "../../utils";
import Toast from "react-native-root-toast";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import Container from "../../components/Container";

type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

let currencySymbol = "₦";
let fetchallcart_count = 0;

const Cart = ({ navigation }: CartScreenProps) => {
  const { dark, colors } = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [allCart, setAllCart] = useState<CartData>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showloadingmodal, setShowLoadingModal] = useState(false);

  useEffect(() => {
    if (fetchallcart_count == 0) {
      setTimeout(() => {
        fetchAllCart();

        fetchallcart_count++;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (allCart) {
      setCartItems(allCart.items);
    }
  }, [allCart]);

  Console.log("----------ALL CARTITEM-----------", cartItems);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fetchAllCartSilently();
      }, 100);
      return () => {};
    }, ["1"])
  );

  const fetchAllCart = async () => {
    try {
      // setTimeout(() => setShowLoadingModal(true), 1000);
      setShowLoadingModal(true);
      const result = await dispatch(
        fecthallcart({
          userId: user.uuid,
        })
      );
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        Console.error("fetchAllCart err:", err.message);
        navigation.goBack();
        handleErrorEdgeCases(dispatch, err, () => {
          Toast.show(err.message || "Something went wrong please try again", {
            duration: Toast.durations.SHORT,
            backgroundColor: "red",
            position: Toast.positions.TOP,
            animation: true,
          });
        });
        return;
      }
      if (meta.requestStatus == "fulfilled") {
        let cart_data = payload as FetchAllCartResponse;
        setAllCart(cart_data.cart);
        Console.log("Fetched Cart----------", cart_data);
      }
      setTimeout(() => setShowLoadingModal(false), 50);
      setTimeout(() => setLoading(false), 100);
    } catch (err) {
      setTimeout(() => setShowLoadingModal(false), 100);
      setTimeout(() => setLoading(false), 100);
      Console.error("fetchAllCart err1:", err);
    }
  };

  const fetchAllCartSilently = async () => {
    try {
      const result = await dispatch(
        fecthallcart({
          userId: user.uuid,
        })
      );
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        Console.error("fetchAllCart err:", err.message);
        handleErrorEdgeCases(dispatch, err, () => {
          Toast.show(err.message || "Something went wrong please try again", {
            duration: Toast.durations.SHORT,
            backgroundColor: "red",
            position: Toast.positions.TOP,
            animation: true,
          });
        });
        return;
      }
      if (meta.requestStatus == "fulfilled") {
        let cart_data = payload as FetchAllCartResponse;
        setAllCart(cart_data.cart);
        Console.log("Fetched Cart----------", cart_data);
      }
      setTimeout(() => setLoading(false), 100);
    } catch (err) {
      Console.error("fetchAllCart err1:", err);
      setTimeout(() => setLoading(false), 100);
    }
  };

  const renderCartItems: ListRenderItem<CartItem> | null | undefined = ({
    index,
    item,
  }) => {
    //const { product_id, unit_price } = item;
    console.log("ITEM", item.productId);
    console.log("Cart", item);
    //const quantity = productCounts[product_id];
    //const totalPrice = unit_price * quantity;

    // Add totalPrice to the totalCartPrice
    //totalCartPrice += totalPrice;

    return (
      <View className={`mb-[2.5px] w-full`}>
        <View
          className={`${dark ? "bg-[#2a2a2a]" : "bg-[#fff]"} shadow-md h-[120px] w-full rounded-[5px] px-[20px] py-[10px] flex-row items-center justify-between mb-[20px]`}
        >
          <View className={`space-y-3`}>
            <Image
              source={{ uri: item.productId.image }}
              width={80}
              height={80}
              className={`rounded-full`}
            />
          </View>

          {/* ITEMS */}
          <View className={`flex-row items-center justify-center space-x-4`}>
            <View>
              <Text className={`${dark ? "text-[#fff]" : "text-[#000]"}`}>{item.productName}</Text>
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
                {addCommasToNumber(item.productId.price)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <View className="flex-row justify-around items-center">
                <TouchableOpacity
                  className={`bg-[#FE6400] p-[2px] rounded-[5px]`}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
                <Text className={`ml-2 mr-2 text-sm font-bold ${dark ? "text-[#fff]" : "text-[#000]"}`}>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  className={`bg-[#FE6400] p-[2px] rounded-[5px]`}
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

  const EmptyCart = () => {
    return (
      <View className="flex-1">
        <View className={`flex-1 justify-center items-center`}>
          <SvgXml xml={EMPTYCART} />
          <Text className={`text-[24px]`} style={{ fontFamily: "bold" }}>
            Your cart is empty
          </Text>
        </View>
      </View>
    );
  };

  const FullCart = () => {
    return (
      <View className={`flex-1 w-full`}>
        {/* List of Cart */}
        <View className={`flex-[1] mt-[20px]`}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allCart?.items}
            renderItem={renderCartItems}
            keyExtractor={(item) => item.productId.toString()} // Assuming index is unique, replace it with unique key if available
            style={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    );
  };

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
      {allCart == null ? EmptyCart() : FullCart()}
    </Container>
  );
};

export default Cart;

const styles = StyleSheet.create({});
