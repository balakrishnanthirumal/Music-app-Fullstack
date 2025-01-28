import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumTable from "./AlbumTable";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum } from "@/store/useMusicStore";
import { AppDispatch } from "@/store/store";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
  return (
    <div>
      <Card className="bg-zinc-80/95 border-zinc-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Library className="h-5 w-5 text-violet-500" />
                Albums Library
              </CardTitle>
              <CardDescription>Manage your album collection</CardDescription>
            </div>
            <AddAlbumDialog />
          </div>
        </CardHeader>

        <CardContent>
          <AlbumTable />
        </CardContent>
      </Card>
    </div>
  );
};
export default AlbumsTabContent;
