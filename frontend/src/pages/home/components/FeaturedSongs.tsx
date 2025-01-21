import FeaturedSongSkeletion from "@/layout/component/skeletons/FeaturedSongSkeletion";

import { useSelector } from "react-redux";
const FeaturedSongs = () => {
  const { isLoading, featuredSongs, error } = useSelector(
    (state: any) => state.album
  );

  if (isLoading) return <FeaturedSongSkeletion />;
  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song: any) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transiton-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt=""
            className="2-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />

          <div className="flex-1 p-4">
            <div className="font-medium truncate">{song.title}</div>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FeaturedSongs;
