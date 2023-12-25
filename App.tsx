import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Platform, UIManager } from "react-native";
import AppNavigator from "./AppNavigator";
import { reduxPersistor, store } from "./redux/store";
import SplashScreen from "./screens/splash";
import { sleep } from "./utils";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={async () => {
          await sleep(0.1);
        }}
        persistor={reduxPersistor}
        loading={<SplashScreen />}
      >
        {/* Áp dụng style cho container của Android */}
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
