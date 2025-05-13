import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://blog-platform.kata.academy/api";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, {
        user: userData,
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.errors || { server: "Unknown error" },
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, {
        user: userData,
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.errors || { server: "Unknown error" },
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().user.currentUser.token;
    try {
      const response = await fetch(
        "https://blog-platform.kata.academy/api/user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ user: userData }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data.user;
    } catch (err) {
      return rejectWithValue({ errors: { global: ["Server error"] } });
    }
  },
);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  token: null,
  errors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.token = null;
      state.errors = {};
      localStorage.removeItem("user");
    },
    clearErrors(state) {
      state.errors = {};
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.errors = {};
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.errors = {};
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.errors = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.errors = action.payload?.errors || null;
      });
  },
});

export const { logout, clearErrors, setUser } = userSlice.actions;
export default userSlice.reducer;
