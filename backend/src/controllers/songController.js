import { Song } from "../models/songModel.js";

export const getAllSongs = async (req, resizeBy, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {};

export const getMadeForYouSongs = async (req, res, next) => {};

export const getTrendingSongs = async (req, res, next) => {};
