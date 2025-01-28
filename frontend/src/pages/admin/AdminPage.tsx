import { useAuth } from "@clerk/clerk-react";
import { checkAdminStatus } from "@/store/useAuthStore";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import DashBoardStat from "./components/DashBoardStat";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { fetchAlbum } from "@/store/useMusicStore";
import { UseDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const AdminPage = () => {
  const isAdmin = useSelector((state: any) => state.admin.isAdmin);
  const isLoading = useSelector((state: any) => state.admin.isLoading);

  const dispatch = useDispatch<AppDispatch>();

  if (isAdmin && !isLoading) return <div>Unauthorised</div>;

  useEffect(() => {
    // dispatch(fetchAlbum());
    // dispatch(fetchSongs());
    // dispatch(fetchStats());
  }, [fetchAlbum]);
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header />

      <DashBoardStat />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50 flex items-center">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700 w-[70px] flex items-center rounded-md"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700  w-[90px] items-center flex rounded-md px-2"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
