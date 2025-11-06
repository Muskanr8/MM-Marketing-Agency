import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    addToWishlist: (state, action) => {
      const exists = state.products.find(p => p._id === action.payload._id);
      if (!exists) {
        state.products.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.products = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist, setLoading, setError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
