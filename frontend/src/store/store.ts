import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./useMusicStore.js";
import chatReducer from "./useChatStore.js";
import adminReducer from "./useAuthStore.js";
import musicPlayerReducer from "./usePlayerStore.js";
const store = configureStore({
  reducer: {
    album: albumReducer,
    chat: chatReducer,
    admin: adminReducer,
    player: musicPlayerReducer,
  },
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
