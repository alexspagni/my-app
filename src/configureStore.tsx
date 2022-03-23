import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducers from "./reducers";
import { createStore } from "redux";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["images", "imagesHide"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
