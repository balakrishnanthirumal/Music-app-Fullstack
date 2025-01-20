import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
};

export const fetchAlbum = createAsyncThunk(
  "fetchAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/albums");
      if (!response.status) {
        throw new Error("Failed to fetch album");
      }
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const useMusicStore = createSlice({
  name: "music",
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbum.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        (state.isLoading = false), (state.albums = action.payload);
      })
      .addCase(fetchAlbum.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      });
  },
});

export const { addSong } = useMusicStore.actions;

export default useMusicStore.reducer;
