import Topbar from "@/components/Topbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingSongs,
  fetchMadeForYouSongs,
  fetchFeaturedSongs,
} from "@/store/useMusicStore";
import { AppDispatch } from "@/store/store";
import FeaturedSongs from "./components/FeaturedSongs";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const { madeForYouSongs, featuredSongs, trendingSongs, isLoading } =
    useSelector((state: any) => state.album);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFeaturedSongs());
    dispatch(fetchMadeForYouSongs());
    dispatch(fetchTrendingSongs());
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSongs />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default HomePage;
