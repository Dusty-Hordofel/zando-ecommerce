import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
const reducers = combineReducers({ cart });

const persistConfig = {
  key: "root",
  storage,
};

// const reducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  // reducer: reducer,
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
console.log("🚀 ~ file: index.js:21 ~ store", store);

export default store;
