import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./features/userSlice";
import product from "./features/productSlice";
import services from "./features/servicesSlice";
import searchHistory from "./features/searchHistorySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user,
  product,
  services,
  searchHistory,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const presistor = persistStore(store);
export default store;
