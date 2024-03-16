import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "../slices/products";
import orderSlice from "../slices/orders";
import customerSlice from "../slices/customers";
import reportSlice from "../slices/report";

const rootReducer = combineReducers({
  products: productSlice.reducer,
  orders: orderSlice.reducer,
  customers: customerSlice.reducer,
  report: reportSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
