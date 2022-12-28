import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProduct} from "../../types/Product.types";

interface IProductState {
  isLoading: boolean;
  error: string | null;
  products: IProduct[] | null
}

const initialState: IProductState = {
  isLoading: false,
  error: null,
  products: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state: IProductState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    }
  },
  extraReducers: {
  }
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer