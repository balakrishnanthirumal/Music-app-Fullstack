import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./useMusicStore.js";
import chatReducer from "./useChatStore.js";
import adminReducer from "./useAuthStore.js";
const store = configureStore({
  reducer: {
    album: albumReducer,
    chat: chatReducer,
    admin: adminReducer,
  },
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
