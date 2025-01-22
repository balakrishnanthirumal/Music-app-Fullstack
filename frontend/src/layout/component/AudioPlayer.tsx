import { playNext } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state: any) => state.player);

  //handle play/pause music
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  //handle song ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      dispatch(playNext());
    };

    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  //handle song changes

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    //check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
    }

    if (isPlaying) audio.play();
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};
export default AudioPlayer;
