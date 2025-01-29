import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { Calendar, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongsTable = () => {
  const [songs, setSongs] = useState<any>(null);
  const [isSongsLoading, setIsSongsLoading] = useState(false);
  // const [isAlbumLoading, setIsAlbumLoading] = useState(false);
  const [albums, setAlbums] = useState(null);

  const fetchSongs = async () => {
    setIsSongsLoading(true);
    try {
      const response = await axiosInstance.get("/songs/");
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
      toast.error("Failed to fetch song");
    } finally {
      setIsSongsLoading(false);
    }
  };

  const deleteSong = async (id: any) => {
    try {
      setIsSongsLoading(true);
      console.log(id);
      await axiosInstance.delete(`/admin/songs/${id}`);
      setIsSongsLoading(false);
      toast.success("Song deleted");
    } catch (error) {
      toast.error("Error in deleting");
    }
  };

  const fetchAlbum = async () => {
    try {
      const response = await axiosInstance.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch albums");
    }
  };

  // const deleteAlbum = async (id:any) => {
  //   try {
  //     setIsAlbumLoading(true);
  //     await axiosInstance.delete(`/admin/albums/${id}`);
  //     setIsAlbumLoading(false);
  //     toast.success("Album deleted successfully");
  //   } catch (error) {
  //     toast.error("Error in deleting");
  //   }
  // };

  console.log(albums);

  useEffect(() => {
    fetchSongs();
    fetchAlbum();
  }, []);

  if (isSongsLoading) {
    <div className="flex items-center justify-center py-8">
      <div className="text-[100px]">Loading...</div>
    </div>;
  }

  console.log(songs);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs?.map((song: any) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={song.imageUrl}
                className="size-10 rounded object-cover"
                alt=""
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteSong(song._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default SongsTable;
