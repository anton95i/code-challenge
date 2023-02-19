import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CartState {
  value: {
    productId: number;
    name: string;
    amount: number;
    price: number;
  }[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
  value: [],
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex((product) => product.productId === action.payload);
      state.value[index].amount += 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex((product) => product.productId === action.payload);
      if (state.value[index].amount > 1) {
        state.value[index].amount -= 1;
      } else {
        state.value.splice(index, 1);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex((product) => product.productId === action.payload);
      state.value.splice(index, 1);
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const payload = action.payload.split(",");
      const productId = parseInt(payload[0]);
      const name = payload[1];
      const price = parseFloat(payload[2]);
      const index = state.value.findIndex((product) => product.name === name);
      if (index === -1) {
        state.value.push({
          productId: productId,
          name: name,
          amount: 1,
          price: price,
        });
      } else {
        state.value[index].amount += 1;
      }
    },

  }
});

export const selectCart = (state: RootState) => state.cart.value;

//export const addToCart = cartSlice.actions.addToCart;

//export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const { increment, decrement, deleteProduct, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
