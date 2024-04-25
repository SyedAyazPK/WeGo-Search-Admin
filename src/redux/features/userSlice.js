import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const API_URL = "http://31.220.74.135:7000/api/v1";

export const loginUser = createAsyncThunk("user/loginUser", async (params) => {
  console.log("🚀 ~ file: userSlice.js:7 ~ loginUser ~ params:", params);
  try {
    const updatedParams = {
      email: params?.email?.toLowerCase(),
      password: params?.password,
    };
    const response = await axios.post(`${API_URL}/login`, updatedParams);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
});

export const getUsers = createAsyncThunk("user/getUsers", async (params) => {
  try {
    const { data } = await axiosInstance.get(`/admin/users`);
    console.log("🚀 ~ file: userSlice.js:24 ~ getUsers ~ data:", data);
    return data;
  } catch (err) {
    return null;
  }
});
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (params) => {
    try {
      const { data } = await axiosInstance.delete(`/admin/users/${params}`);
      console.log("🚀 ~ file: userSlice.js:24 ~ getUsers ~ data:", data);
      return data;
    } catch (err) {
      return null;
    }
  }
);
export const approveUser = createAsyncThunk(
  "user/approveUser",
  async (params) => {
    try {
      const { data } = await axiosInstance.post(
        `/admin/users/approve/${params}`
      );
      console.log("🚀 ~ file: userSlice.js:24 ~ getUsers ~ data:", data);
      return data;
    } catch (err) {
      return null;
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (params) => {
    try {
      const { data } = await axiosInstance.patch(
        `/admin/users/${params?._id}`,
        {
          name: params.name,
          email: params.email,
          password: params.password,
          role: params.role,
        }
      );
      return data;
    } catch (err) {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.data;
    },
  },
});

export const selectUser = ({ user }) => user?.user;
export const selectUsers = ({ user }) => user?.users;
export default userSlice.reducer;
