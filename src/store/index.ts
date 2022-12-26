import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "@reduxjs/toolkit";
import ProductSlice from "./Slices/Product.slice";

const combinedReducer = combineReducers({
  product: ProductSlice,
});

export const store = configureStore({
    reducer: combinedReducer,
});

export type RootState = ReturnType<typeof combinedReducer>
export type AppDispatch = typeof store.dispatch