import { User } from "../models/userModel.js";
import { Album } from "../models/albumModel.js";
import { Song } from "../models/songModel.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalAlbum = await Album.countDocuments();

    const [totalSongs, totalAlbum, totalUsers, uniqueArtist] =
      await Promise.all([
        await Song.countDocuments(),
        await Album.countDocuments(),
        await User.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbum,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtist[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
