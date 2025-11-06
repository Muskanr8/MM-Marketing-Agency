import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalPrice = action.payload.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
      state.loading = false;
    },
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateCartItem: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItem, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
