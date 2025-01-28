import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },
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

export const fetchAlbumById = createAsyncThunk(
  "music/fetchAlbumById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch album");
      }
      return response.data; // Return the album data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle and return error message on failure
    }
  }
);

export const fetchFeaturedSongs = createAsyncThunk(
  "featuredSong",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/featured");
      if (response.status !== 200) throw new Error("Error in fetching data");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMadeForYouSongs = createAsyncThunk(
  "madeForYouSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/made-for-you");

      if (response.status !== 200)
        throw new Error("Error in fetching the data");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrendingSongs = createAsyncThunk(
  "trendingSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/trending");

      if (response.status !== 200)
        throw new Error("Error in fetching the data");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchStats = createAsyncThunk(
//   "fetchStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/stats");

//       if (response.status !== 200)
//         throw new Error("Error in fetching the data");
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchSongs = createAsyncThunk(
//   "fetchSongs",

//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/songs/");

//       if (response.status !== 200)
//         throw new Error("Error in fetching the data");
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

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
      })

      .addCase(fetchAlbumById.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        (state.isLoading = false), (state.currentAlbum = action.payload);
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      })

      .addCase(fetchFeaturedSongs.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchFeaturedSongs.fulfilled, (state, action) => {
        (state.isLoading = false), (state.featuredSongs = action.payload);
      })
      .addCase(fetchFeaturedSongs.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      })

      .addCase(fetchMadeForYouSongs.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchMadeForYouSongs.fulfilled, (state, action) => {
        (state.isLoading = false), (state.madeForYouSongs = action.payload);
      })
      .addCase(fetchMadeForYouSongs.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      })

      .addCase(fetchTrendingSongs.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(fetchTrendingSongs.fulfilled, (state, action) => {
        (state.isLoading = false), (state.trendingSongs = action.payload);
      })
      .addCase(fetchTrendingSongs.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.payload | "error occured");
      });

    // .addCase(fetchSongs.pending, (state) => {
    //   (state.isLoading = true), (state.error = null);
    // })
    // .addCase(fetchSongs.fulfilled, (state, action) => {
    //   (state.isLoading = false), (state.trendingSongs = action.payload);
    // })
    // .addCase(fetchSongs.rejected, (state, action) => {
    //   (state.isLoading = false),
    //     (state.error = action.payload | "error occured");
    // });

    // .addCase(fetchStats.pending, (state) => {
    //   (state.isLoading = true), (state.error = null);
    // })
    // .addCase(fetchStats.fulfilled, (state, action) => {
    //   (state.isLoading = false), (state.trendingSongs = action.payload);
    // })
    // .addCase(fetchStats.rejected, (state, action) => {
    //   (state.isLoading = false),
    //     (state.error = action.payload | "error occured");
    // });
  },
});

export const { addSong } = useMusicStore.actions;

export default useMusicStore.reducer;
