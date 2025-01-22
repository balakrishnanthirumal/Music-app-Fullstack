import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumById } from "@/store/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playAlbum,
  togglePlay,
  initaliseQueue,
  setCurrentSong,
} from "@/store/usePlayerStore";

const AlbumPage = () => {
  const { albumId } = useParams();
  const currentAlbum = useSelector((state) => state.album.currentAlbum);
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumById({ id: albumId }));
  }, [albumId]);

  useEffect(() => {
    dispatch(initaliseQueue(currentAlbum?.songs));
  }, [currentAlbum]);

  const handlePlayAlbum = (index = 0) => {
    console.log("hello");
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) dispatch(togglePlay());
    else {
      dispatch(playAlbum({ songs: currentAlbum?.songs, index: 0 }));
    }
  };

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong({ song: song }));
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 ml-3">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <Button
              size="icon"
              onClick={() => handlePlayAlbum()}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
            >
              {isPlaying &&
              currentAlbum?.songs.some(
                (song) => song._id === currentSong?._id
              ) ? (
                <Pause className="h-7 w-7 text-black" />
              ) : (
                <Play className="h-7 w-7 text-black"></Play>
              )}
            </Button>
          </div>

          {/* table section */}
          <div className="bg-black/20 backdrop-blur-sm mt-5 ml-5">
            {/* table header */}
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 py-2 text-sm pl-5 text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </div>
            {/* song list */}

            <div className="">
              <div className="space-y-4 py-4">
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={index}
                      onClick={() => handlePlaySong(song)}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <div className="size-4 text-green-500">🎵</div>
                        ) : (
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                        )}

                        {!isCurrentSong && (
                          <Play className="h-4 2-4 hidden group-hover:block" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt="song.title"
                          className="size-10"
                        />
                        <div>
                          <div className="font-medium text-white">
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>
                      <div className="flex items-center pl-4">
                        {song.createdAt.split("T")[0]}
                      </div>
                      <div className="flex items-center pl-3">
                        {song.duration}s
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;
