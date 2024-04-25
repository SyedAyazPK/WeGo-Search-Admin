import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://31.220.74.135:8001";

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async (params) => {
    try {
      const response = await axios.post(`${API_URL}/sales`, params);
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await axios.get(`${API_URL}/sales`);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
});
export const getProductsSold = createAsyncThunk(
  "product/getProductsSold",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/sales?isSold=true`);
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const sellProduct = createAsyncThunk(
  "product/sellProduct",
  async (id) => {
    try {
      const response = await axios.put(`${API_URL}/sales/${id}`);
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/sales/${id}`);
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getStats = createAsyncThunk("product/getStats", async () => {
  try {
    const response = await axios.get(`${API_URL}/sales/stats`);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
});
export const getMonthlyRevenue = createAsyncThunk(
  "product/getMonthlyRevenue",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/revenue`);
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    soldProducts: [],
    stats: {},
    monthlyRevenue: {},
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProductsSold.fulfilled]: (state, action) => {
      state.soldProducts = action.payload;
    },
    [getStats.fulfilled]: (state, action) => {
      state.stats = action.payload;
    },
    [getMonthlyRevenue.fulfilled]: (state, action) => {
      state.monthlyRevenue = action.payload;
    },
  },
});

export default productSlice.reducer;

export const selectProducts = ({ product }) => product.products;
export const selectSoldProducts = ({ product }) => product.soldProducts;
export const selectStats = ({ product }) => product.stats;
export const selectMonthlyRevenue = ({ product }) => product.monthlyRevenue;
