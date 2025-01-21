import { createSlice, current, isPending } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
};

const playerStore = createSlice({
  name: "Player",
  initialState,

  reducers: {
    initaliseQueue: (state, action) => {
      state.queue = action.payload;
      state.queue = state.queue || action.payload.songs[0];
      state.currentIndex === -1 ? 0 : state.currentIndex;
    },

    playAlbum: (state, action) => {
      if (action.payload.songs.length === 0) return;

      const song = action.payload.songs[action.payload.startIndex];

      state.queue = action.payload.songs;
      state.currentSong = song;
      state.currentIndex = action.payload.startIndex;
      state.isPlaying = true;
    },

    setCurrentSong: (state, action) => {
      if (!action.payload.song) return;

      const songIndex = state.queue.findIndex((s) => s._id === song._id);

      state.currentSong = action.payload.song;
      state.isPlaying = true;
      state.currentIndex = songIndex !== -1 ? songIndex : state.currentIndex;
    },

    togglePlay: (state) => {
      const willStartPlaying = !state.isPlaying;

      state.isPlaying = willStartPlaying;
    },

    playNext: (state) => {
      const nextIndex = state.currentIndex + 1;

      //if there is next song to play , let play

      if (nextIndex < state.queue.length) {
        const nextSong = state.queue[nextIndex];
        state.currentSong = nextIndex;
        state.currentIndex = nextIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },

    playPrevious: (state) => {
      const prevIndex = state.currentIndex - 1;

      if (prevIndex >= 0) {
        const prevSong = state.queue[prevIndex];

        state.currentSong = prevSong;
        state.currentIndex = prevIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
  },
});

export const {
  playAlbum,
  initaliseQueue,
  setCurrentSong,
  togglePlay,
  playNext,
  playPrevious,
} = playerStore.actions;

export default playerStore.reducer;
