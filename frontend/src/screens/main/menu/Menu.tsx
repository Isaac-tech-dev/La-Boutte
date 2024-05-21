import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../../navigation/RootBottomTabNavigtion";
import { SvgXml } from "react-native-svg";
import { ARROW_DOWN, LOCATION, MENUW, SEARCH } from "../../../svg";
import Input from "../../../components/Input";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import {
  FecthAllPizzaResponse,
  StoreProduct,
} from "../../../redux/types/store";
import { fetchAllPizza } from "../../../redux/thunk/store";
import { ErrorResponse } from "../../../redux/types/auth";
import {
  Console,
  addCommasToNumber,
  handleErrorEdgeCases,
} from "../../../utils";
import Toast from "react-native-root-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import LoaderModal from "../../../components/LoaderModal";
import { addCart } from "../../../redux/thunk/cart";
import { AddToCartResponse } from "../../../redux/types/cart";

type MenuScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Menu">,
  NativeStackScreenProps<RootStackParamList>
>;

let currencySymbol = "₦";

const Menu = ({ navigation }: MenuScreenProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [pizza, setPizza] = useState<StoreProduct[]>([]);
  //const [filteredPizzas, setFilteredPizzas] = useState(pizza);
  const [showloadingmodal, setShowLoadingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let fetchproduct_count = 0;

  useEffect(() => {
    if (fetchproduct_count == 0) {
      setTimeout(() => {
        fetchPizza();

        fetchproduct_count++;
      }, 300);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Component is focused
      setTimeout(() => {
        fetchPizzaSilently();
      }, 1000);
      return () => {};
    }, ["1"])
  );

  //API CALLS
  const fetchPizza = async () => {
    setShowLoadingModal(true);
    try {
      const result = await dispatch(fetchAllPizza(""));
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        Console.error("fetchAllStore err:", err);
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
      setShowLoadingModal(false);
      if (meta.requestStatus == "fulfilled") {
        let res_data = payload as FecthAllPizzaResponse;
        setPizza(res_data.data);
        setShowLoadingModal(false); // Set to false to hide loading modal after fetching data
      }
    } catch (err) {
      Console.error("fetchStore err1:", String(err));
    }
  };

  const addToCart = async (productId: string, productName: string) => {
    Console.log("Product ID----", productId);
    try {
      setShowLoadingModal(true);
      const result = await dispatch(
        addCart({
          userId: user.uuid,
          productId: productId,
          productName: productName,
          quantity: 1,
        })
      );

      setShowLoadingModal(false);
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        handleErrorEdgeCases(dispatch, err, () => {
          Toast.show(err.message || "Something went wrong please try again", {
            duration: Toast.durations.SHORT,
            backgroundColor: "red",
            position: Toast.positions.TOP,
            animation: true,
          });
        });

        Console.log("Login err", err);
        return;
      }

      if (meta.requestStatus == "fulfilled") {
        let res_data = payload as AddToCartResponse;
        Console.log("Login Response", res_data);
        Toast.show(res_data.message || "", {
          duration: Toast.durations.SHORT,
          backgroundColor: "green",
          position: Toast.positions.TOP,
        });
      }
    } catch (error) {
      setShowLoadingModal(false);
      console.log("AddToCArt-------", error);
    }
  };

  const fetchPizzaSilently = async () => {
    try {
      const result = await dispatch(fetchAllPizza(""));
      const { meta, payload } = result;

      if (meta.requestStatus == "rejected") {
        let err = payload as ErrorResponse;
        Console.error("fetchAllStore err:", err);
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
        let res_data = payload as FecthAllPizzaResponse;
        setPizza(res_data.data); // Set to false to hide loading modal after fetching data
      }
    } catch (err) {
      Console.error("fetchStore err1:", String(err));
    }
  };

  console.log("Pizza", pizza);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  const filteredPizzas = pizza.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAllPizza = ({ item }: { item: StoreProduct }) => {
    const handleAddToCart = (productId: string, productName: string) => {
      Console.log("Product ID", productId);
      addToCart(productId, productName);
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MenuDescription", {
            id: item._id,
            image: item.image,
            name: item.name,
            description: item.description,
            price: item.price,
          })
        }
      >
        <View
          className={`flex-row items-center justify-between bg-[#fff] px-[10px] py-[5px] rounded-[10px] shadow-md mb-[15px]`}
        >
          <View className={`w-2/4 shadow-md rounded-full`}>
            <Image
              source={{ uri: item.image }}
              width={80}
              height={80}
              className={`rounded-full`}
            />
          </View>
          <View className={`w-2/4`}>
            <Text>{item.name}</Text>
            <View className="flex-row items-center justify-between mt-4">
              <Text>
                {currencySymbol}
                {addCommasToNumber(item.price)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Console.log("ID-----", item._id),
                    addToCart(item._id, item.name);
                }}
                className={`bg-[#FE6400] px-[10px] py-[10px] rounded-[10px]`}
              >
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyProductExtractor: ((item: StoreProduct) => string) | undefined = (
    item
  ) => {
    return `${item._id}`;
  };

  return (
    <SafeAreaView className={`flex-1`}>
      <View className={`px-[20px]`}>
        {/* TOP DESIGN */}
        <View className={`flex-row items-center justify-between mt-[20px]`}>
          <View className={`flex-row items-center space-x-2`}>
            <Text>Menu</Text>
          </View>
          <View className={`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => {}}
              className={`bg-[#FE6400] px-[10px] py-[10px] rounded-[6px]`}
            >
              <SvgXml xml={MENUW} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <Input
          placeholder="Search for today’s meal"
          LeftIcon={<SvgXml xml={SEARCH} />}
          containerClassName={`mt-[10px]`}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* LIST */}
        <View className={`mt-[10px] mb-[20px]`}>
          {filteredPizzas.length === 0 ? (
            <View>
              <Text>Not Available</Text>
            </View>
          ) : (
            <FlatList
              data={filteredPizzas}
              keyExtractor={keyProductExtractor}
              renderItem={renderAllPizza}
              contentContainerStyle={{ paddingBottom: 10 }}
              initialNumToRender={5}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
      <LoaderModal visible={showloadingmodal} />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({});
