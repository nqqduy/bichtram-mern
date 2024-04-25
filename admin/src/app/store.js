import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar/sidebarSlice";
import userReducer from "./user/userSlice";
import productSlice from "./product/productSlice";

const rootReducer = {
  sidebar: sidebarReducer,
  user: userReducer,
  product: productSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
