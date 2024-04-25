import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const createService = createAsyncThunk(
  "service/createService",
  async (params) => {
    try {
      const response = await axiosInstance.post("/admin/service", params);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getServices = createAsyncThunk(
  "service/getServices",
  async (params) => {
    try {
      const response = await axiosInstance.get("/admin/service");
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (params) => {
    try {
      const response = await axiosInstance.delete(`/admin/service/${params} `);
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateService = createAsyncThunk(
  "service/updateService",
  async (params) => {
    try {
      const response = await axiosInstance.put(
        `/admin/service/${params?._id} `,
        {
          service: params?.service,
        }
      );
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: {},
  },
  extraReducers: {
    [getServices.fulfilled]: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const selectServices = ({ services }) => services.services;

export default servicesSlice.reducer;
