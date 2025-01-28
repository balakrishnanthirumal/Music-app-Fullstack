import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAlbum } from "@/store/useMusicStore";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

interface newSong {
  title: string;
  artist: string;
  album: string;
  duration: number;
}

const AddSongDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [songDialogueOpen, setSongDialogoueOpen] = useState(false);
  const { albums } = useSelector((state: any) => state.album);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [newSong, setNewSong] = useState<newSong>({
    title: "",
    artist: "",
    album: "",
    duration: 0,
  });

  const [files, setFiles] = useState<{
    audio: null | File;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  useEffect(() => {
    const fetchAlbumData = async () => {
      dispatch(fetchAlbum());
    };
    fetchAlbumData();
  }, []);

  console.log(albums);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        return toast.error("Please upload both audio and image file");
      }

      const formData = new FormData();

      formData.append("artist", newSong.artist);
      formData.append("title", newSong.title);
      formData.append("duration", newSong.duration.toString());
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }
      console.log(files.audio);
      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: 0,
      });

      setFiles({
        audio: null,
        image: null,
      });
      toast.success("Song added successfully");
    } catch (error: any) {
      toast.error("Failed to add song" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogueOpen} onOpenChange={setSongDialogoueOpen}>
      <DialogTrigger asChild>
        <Button className=" text-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to you music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* image upload area */}
          <div
            className="flex items-center justify-center p-6 border-3 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-400">Image Selected</div>
                  <div>{files.image.name.slice(0, 20)}</div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload Artwork
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Choose audio file"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <Input
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums?.map((album: any) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogoueOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddSongDialog;
