import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });

      const { title, artist, albumId, duration } = req.body;
      const audioFile = req.file.audioFile;
      const imageFile = req.files.imageFile;

      const audioUrl = await uploadToCloudinary(audioFile);
      const imageUrl = await uploadToCloudinary(imageFile);
      const song = new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId: albumId || null,
      });

      await song.save();

      //if song belongs to album update album's songs array
      if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
          $push: { songs: song._id },
        });
      }
      res.status(201).json(song);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    //of song belongs to the album
    if (song.albumId) {
      await Album.findByAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleting song");
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleted album", error);
    next(error);
  }
};

export const checkAdmin = async (req, res) => {
  res.status(200).json({ admin: true });
};
