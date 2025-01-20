import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./useMusicStore.js";

const store = configureStore({
  reducer: {
    album: albumReducer,
  },
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
