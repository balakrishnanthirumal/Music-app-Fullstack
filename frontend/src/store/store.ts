import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./useMusicStore.js";
import chatReducer from "./useChatStore.js";
import adminReducer from "./useAuthStore.js";
import musicPlayerReducer from "./usePlayerStore.js";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    album: albumReducer,
    chat: chatReducer,

    player: musicPlayerReducer,
  },
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
