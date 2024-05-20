import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Navigation />
      </RootSiblingParent>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
