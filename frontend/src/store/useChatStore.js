import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch album");
      }
      return response.data; // Return the album data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle and return error message on failure
    }
  }
);

const chatStore = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.users = action.payload);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      });
  },
});

export default chatStore.reducer;
