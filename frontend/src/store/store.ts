import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./useChatStore.js";

import albumReducer from "./useMusicStore.js";
import adminReducer from "./useAuthStore.js";
import musicPlayerReducer from "./usePlayerStore.js";
const store = configureStore({
  reducer: {
    chat: chatReducer,
    admin: adminReducer,
    album: albumReducer,

    player: musicPlayerReducer,
  },
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
