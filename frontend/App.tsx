import "./global.css";
import "./src/lib/nativewind";
import { useEffect } from "react";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import { startAuthSync } from "./src/lib/authSync";

export default function App() {
  // Restore a saved Supabase login on launch and keep Redux in sync with it.
  useEffect(() => startAuthSync(store.dispatch), []);

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Navigation />
      </RootSiblingParent>
    </Provider>
  );
}
