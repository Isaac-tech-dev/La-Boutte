import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation/index";
import AuthNavigation from "./src/navigation/AuthNavigation";
import AppNaviagtion from "./src/navigation/AppNaviagtion";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
