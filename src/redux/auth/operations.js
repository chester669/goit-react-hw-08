import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContacts } from "../contacts/operations";

axios.defaults.baseURL = "https://connections-api.goit.global/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      setAuthHeader(data.token);
      thunkAPI.dispatch(fetchContacts());
      return data;
    } catch (error) {
      if (error.response?.data?.code === 11000) {
        return thunkAPI.rejectWithValue(
          "This email is already registered. Try another one."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      if (!email || !password)
        throw new Error("Email and password are required!");
      const { data } = await axios.post("/users/login", { email, password });
      setAuthHeader(data.token);
      thunkAPI.dispatch(fetchContacts());
      return data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      console.warn("❌ No token found in state. Redirecting to login.");
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      console.log("✅ Refresh user success:", data);
      return data;
    } catch (error) {
      console.error(
        "❌ Refresh user failed:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to refresh user"
      );
    }
  }
);
