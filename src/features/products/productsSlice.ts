import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ProductsState {
  value: {
    id: number;
    name: string;
    price: number;
  }[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  value: [],
  status: 'idle',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<string>) => {
      const products = action.payload.split(",");
      for (let i = 0; i < products.length; i += 2) {
        if (products[i] === "" || products[i] == null) continue;
        if (products[i + 1] === "" || products[i + 1] == null) continue;
        if (isNaN(parseFloat(products[i + 1]))) continue;
        state.value.push({
          id: state.value.length + 1,
          name: products[i],
          price: parseFloat(products[i + 1]),
        });
      }
    }
  }
});

export const selectProducts = (state: RootState) => state.products.value;

export const addProducts = productsSlice.actions.addProducts;

export default productsSlice.reducer;
