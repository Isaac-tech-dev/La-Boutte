import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootStackNavigation";
import {
  CompositeScreenProps,
  Theme,
  useFocusEffect,
  useTheme,
} from "@react-navigation/native";
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
import { FecthAllPizzaResponse, Pizza } from "../../../redux/types/store";
import { fetchAllPizza } from "../../../redux/thunk/store";
import { ErrorResponse } from "../../../redux/types/auth";
import {
  Console,
  addCommasToNumber,
  handleErrorEdgeCases,
} from "../../../utils";
import Toast from "react-native-root-toast";
import { useAppDispatch } from "../../../redux/hooks/hook";
import LoaderModal from "../../../components/LoaderModal";
import { adjustCartItem } from "../../../redux/thunk/cart";
import { AdjustCartItemResponse } from "../../../redux/types/cart";
import Container from "../../../components/Container";
import { pizzaImageSource } from "../../../lib/pizzaImage";
import Panel from "../../../components/Panel";

type MenuScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, "Menu">,
  NativeStackScreenProps<RootStackParamList>
>;

let currencySymbol = "₦";

const Menu = ({ navigation }: MenuScreenProps) => {
  const { dark, colors } = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const [pizza, setPizza] = useState<Pizza[]>([]);
  //const [filteredPizzas, setFilteredPizzas] = useState(pizza);
  const [showloadingmodal, setShowLoadingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let fetchproduct_count = 0;

  useEffect(() => {
    if (fetchproduct_count == 0) {
      setTimeout(() => {
        fetchPizza();

        fetchproduct_count++;
      }, 500);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Component is focused
      setTimeout(() => {
        fetchPizzaSilently();
      }, 500);
      return () => {};
    }, ["1"]),
  );

  //API CALLS
  const fetchPizza = async () => {
    setShowLoadingModal(true);
    try {
      const result = await dispatch(fetchAllPizza());
      const { meta, payload } = result;
      setShowLoadingModal(false);

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
      setShowLoadingModal(false);
      Console.error("fetchStore err1:", String(err));
    }
  };

  const addToCart = async (productId: string, productName: string) => {
    Console.log("Product ID----", productId);
    try {
      setShowLoadingModal(true);
      const result = await dispatch(
        adjustCartItem({
          pizzaId: productId,
          delta: 1,
        }),
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
        let res_data = payload as AdjustCartItemResponse;
        Console.log("AddToCart Response", res_data);
        Toast.show(
          `${productName} added to cart (${res_data.quantity} in cart)`,
          {
            duration: Toast.durations.SHORT,
            backgroundColor: "green",
            position: Toast.positions.TOP,
          },
        );
      }
    } catch (error) {
      setShowLoadingModal(false);
      console.log("AddToCArt-------", error);
    }
  };

  const fetchPizzaSilently = async () => {
    try {
      const result = await dispatch(fetchAllPizza());
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
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderAllPizza = ({ item }: { item: Pizza }) => {
    const handleAddToCart = (productId: string, productName: string) => {
      Console.log("Product ID", productId);
      addToCart(productId, productName);
    };

    return (
      <Panel
        containerClassName="mb-[15px]"
        className={`${dark ? "bg-[#2a2a2a]" : "bg-[#fff]"} px-[10px] py-[5px] shadow-sm`}
        title={item.name}
        titleNumberOfLines={2}
        titleClassName={dark ? "text-[#fff]" : "text-[#000]"}
        subtitle={`${currencySymbol}${addCommasToNumber(item.price)}`}
        subTitleClassName="text-base mt-[6px]"
        subTitleStyle={{ color: dark ? "#fff" : "#000" }}
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
              source={pizzaImageSource(item)}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
        }
        RightIcon={
          <TouchableOpacity
            onPress={() => handleAddToCart(item.id, item.name)}
            className="bg-[#FE6400] px-[10px] py-[10px] rounded-[10px]"
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        }
      />
    );
  };

  const keyProductExtractor: ((item: Pizza) => string) | undefined = (item) => {
    return item.id;
  };

  return (
    <Container hidelefticon showHeader headerText="Menu" hideScrollView={true}>
      <View className={`w-full`}>
        {/* SEARCH */}
        <Input
          placeholder="Search for today’s meal"
          LeftIcon={<SvgXml xml={SEARCH} />}
          containerClassName={`mt-[10px]`}
          value={searchQuery}
          onChangeText={handleSearch}
          className={`shadow-md`}
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
    </Container>
  );
};

export default Menu;

const styles = StyleSheet.create({});
