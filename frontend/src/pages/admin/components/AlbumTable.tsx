import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { AppDispatch } from "@/store/store";
import { fetchAlbum } from "@/store/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AlbumTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { albums } = useSelector((state: any) => state.album);
  useEffect(() => {
    dispatch(fetchAlbum());
  }, [fetchAlbum]);

  const deleteAlbum = async (id: any) => {
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      toast.success("Album deleted successfully");
      dispatch(fetchAlbum());
    } catch (error) {
      toast.error("Error in deleting");
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album: any) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-10 h-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {album.songs.length} songs
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAlbum(album._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AlbumTable;
