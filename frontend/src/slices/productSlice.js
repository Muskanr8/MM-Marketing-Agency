import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setProducts, setSelectedProduct, setFilters, setCurrentPage, setLoading, setError, clearError } = productSlice.actions;
export default productSlice.reducer;
