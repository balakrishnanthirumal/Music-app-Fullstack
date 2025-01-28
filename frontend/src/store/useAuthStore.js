import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reducer from "./useMusicStore";

const initialState = {
  isAdmin: null,
  error: null,
  isLoading: false,
};

export const checkAdminStatus = createAsyncThunk(
  "AdminCheck",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/check");

      if (response.status !== 200) throw new Error("Fail in fetching data");

      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminCheck = createSlice({
  name: "adminCheck",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAdminStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAdminStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(checkAdminStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload | "Error occured";
      });
  },
});

export default adminCheck.reducer;
