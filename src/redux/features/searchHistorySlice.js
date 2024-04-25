import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const createHistory = createAsyncThunk(
  "history/createHistory",
  async (params) => {
    try {
      const response = await axiosInstance.post("/admin/search", params);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getHistory = createAsyncThunk(
  "history/getHistory",
  async (params) => {
    try {
      const response = await axiosInstance.get("/admin/search");
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteHistory = createAsyncThunk(
  "history/deleteHistory",
  async (params) => {
    try {
      const response = await axiosInstance.delete(`/admin/search/${params}`);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteAll = createAsyncThunk(
  "history/deleteAll",
  async (params) => {
    try {
      const response = await axiosInstance.delete(`/admin/search`);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: {
    history: {},
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const selectHistory = ({ searchHistory }) => searchHistory.history;

export default searchHistorySlice.reducer;
