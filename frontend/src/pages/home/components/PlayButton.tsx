import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, togglePlay } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }) => {
  const { currentSong, isPlaying } = useSelector((state: any) => state.player);
  const dispatch = useDispatch();
  const isCurrentSong = currentSong?._id === song?._id;

  const handlePlay = () => {
    if (isCurrentSong) dispatch(togglePlay());
    else dispatch(setCurrentSong({ song: song }));
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="sixe-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};
export default PlayButton;
