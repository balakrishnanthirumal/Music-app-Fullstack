import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
// import { useDispatch } from "react-redux";
const initialState = {
  users: [],
  isLoading: false,
  error: null,
  isConnected: [],
  socket: null,
  isConnected: false,
  onlineUser: new Set(),
  userActivities: new Map(),
  messages: [],
};

// const dispatch = useDispatch();

// const baseURL = "http://localhost:5000";

// const socket = io(baseURL, {
//   autoConnect: false, //only connect iff user is authenticated
//   withCredentials: true,
// });

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

// export const initSocket = createAsyncThunk(
//   "initSocket",
//   async ({ userId }, { rejectWithValue }) => {
//     try {
//       if (!store.getState().chat.isConnected) {
//         socket.connect();
//         socket.emit("user_connected", userId);

//         socket.on("users_online", (users) => {
//           dispatch(setOnlineUser(users));
//         });

//         socket.on("activities", (activities) => {
//           dispatch(setUserActivities(activities));
//         });

//         socket.on("user_connected", (userId) => {
//           dispatch(setOnlineUser(userId));
//         });

//         socket.on("user_disconnected", (userId, state) => {
//           dispatch(setUserDisconnected);
//         });

//         socket.on("receive_message", (message) => {
//           dispatch(setMessages(message));
//         });

//         socket.on("message_sent", (message) => {
//           dispatch(setMessages(message));
//         });

//         socket.io("activity_updated", ({ userId, activity }) => {});
//       }
//     } catch (error) {}
//   }
// );

// export const disconnectSocket = createAsyncThunk();

// export const sendMessage = createAsyncThunk(
//   "sendMessage",
//   async ({ receiverId, sendId, content }, rejectWithValue) => {
//     try {
//     } catch (error) {}
//   }
// );

const chatStore = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setOnlineUser: (state, action) => {
    //   state.onlineUser = new Set(action.payload);
    //   state.isConnected = true;
    // },
    // setUserActivities: (state, action) => {
    //   state.userActivities = new Map(action.payload);
    // },
    // setOnlineUser: (state, action) => {
    //   state.onlineUser = new Set([...state.onlineUser, action.payload]);
    // },
    // setUserDisconnected: (state, action) => {
    //   const newOnlineUsers = new Set(state.onlineUser);
    //   newOnlineUsers.delete(action.payload);
    //   return { onlineUser: newOnlineUsers };
    // },
    // setMessages: (state, action) => {
    //   state.messages = [...state.messages, action.payload];
    // },
    // setNewActivity: (state, action) => {
    //   const newActivities = new Map(state.userActivities);
    //   newActivities.set(action.payload.userId, action.payload.activity);
    //   const userActivity = state.userActivities;
    //   return { userActivity: newActivities };
    // },
    // setUserConnected: (state, action) => {
    //   if (!state.isConnected) {
    //     socket.connect();
    //     socket.emit("user_connected", userId);
    //     socket.on("users_online", (users) => {
    //       dispatch(setOnlineUser(users));
    //     });
    //     socket.on("activities", (activities) => {
    //       dispatch(setUserActivities(activities));
    //     });
    //     socket.on("user_connected", (userId) => {
    //       dispatch(setOnlineUser(userId));
    //     });
    //     socket.on("user_disconnected", (userId, state) => {
    //       dispatch(setUserDisconnected);
    //     });
    //     socket.on("receive_message", (message) => {
    //       dispatch(setMessages(message));
    //     });
    //     socket.on("message_sent", (message) => {
    //       dispatch(setMessages(message));
    //     });
    //     socket.io("activity_updated", ({ userId, activity }) => {});
    //   }
    // },
  },

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
// export const {
//   setOnlineUser,
//   setUserActivities,
//   setUserDisconnected,
//   setMessages,
// } = chatStore.actions;
export default chatStore.reducer;
