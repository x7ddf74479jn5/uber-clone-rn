import "react-native-gesture-handler";

import { registerRootComponent } from "expo";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { StackNavigator } from "~/StackNavigator";

import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <StackNavigator />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(App);
