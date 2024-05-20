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

import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
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

type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

let currencySymbol = "₦";
let fetchallcart_count = 0;

const Cart = ({ navigation }: CartScreenProps) => {
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
      <View className={`mb-[2.5px]`}>
        <View
          className={`bg-[#FFFFFF] shadow-md h-[120px] w-full rounded-[5px] px-[20px] py-[10px] flex-row items-center justify-between mb-[20px]`}
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
              <Text>{item.productName}</Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center">
                  <FontAwesome5 name="dumbbell" size={12} color="#464646" />
                  <Text className="ml-1">5.0g</Text>
                </View>
                <View className="flex-row items-center ml-2">
                  <Ionicons name="flash" size={12} color="#464646" />
                  <Text className="ml-1">60 cal</Text>
                </View>
              </View>
              <Text>
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
                <Text className="ml-2 mr-2 text-sm font-bold">
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
      <View className={`flex-1 px-[20px]`}>
        {/* <View className={`flex-row items-center space-x-40 mt-[20px]`}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={BACKARROW} />
          </Pressable>
        </View> */}
        <View className={`flex-1 justify-center items-center`}>
          <SvgXml xml={EMPTYCART} />
          <Text className={`text-[24px]`} style={{ fontFamily: "bold" }}>
            Your cart is empty
          </Text>
          {/* <Text
            className={`text-center w-3/5 text-[15px]`}
            style={{ fontFamily: "light" }}
          >
            Scan the barcode on any product on the shelf or search for it to add
            it to your cart.
          </Text> */}
        </View>
      </View>
    );
  };

  const FullCart = () => {
    return (
      <>
        <View
          className={`py-[10px] px-[20px] mt-[10px] flex-row justify-between items-center w-full`}
        >
          <Text className={`text-[24px]`} style={{ fontFamily: "semibold" }}>
            Cart
          </Text>
          <TouchableOpacity>
            <SvgXml xml={CART_MAIN} />
          </TouchableOpacity>
        </View>

        <View className={`flex-1`}>
          {/* List of Cart */}
          <View className={`flex-[1] mt-[20px] px-[20px]`}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allCart?.items}
              renderItem={renderCartItems}
              keyExtractor={(item) => item.productId.toString()} // Assuming index is unique, replace it with unique key if available
              style={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView className={`bg-[#f0f0f0] flex-1`}>
      {allCart == null ? EmptyCart() : FullCart()}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
