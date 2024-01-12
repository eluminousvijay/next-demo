// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import productReducer from "./features/product/productSlice";

// const rootReducer = combineReducers({
//   product: productReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import productReducer from "./features/product/productSlice";

const rootReducer = combineReducers({
  data: productReducer,
  // Add other reducers here if you have them
});

const persistConfig = {
  key: "root", // key for the localStorage key
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;


