import { Song } from "../models/songModel.js";

export const getAllSongs = async (req, resizeBy, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};
