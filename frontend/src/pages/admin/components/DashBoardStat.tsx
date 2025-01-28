import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import StatsCard from "./StatsCard";

const DashBoardStat = () => {
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [isSongsLoading, setIsSongsLoading] = useState(false);
  const [stats, setStats] = useState(null); // Initialize as null
  const [songs, setSongs] = useState(null); // For future use if needed

  const fetchStats = async () => {
    setIsStatsLoading(true);
    try {
      const response = await axiosInstance.get("/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsStatsLoading(false);
    }
  };

  // const fetchSongs = async () => {
  //   setIsSongsLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/songs/");
  //     setSongs(response.data);
  //   } catch (error) {
  //     console.error("Error fetching songs:", error);
  //   } finally {
  //     setIsSongsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchStats();
    // fetchSongs();
  }, []);

  // console.log(songs);

  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: stats?.totalSongs?.toString() || "0", // Safe fallback
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: stats?.totalAlbums?.toString() || "0", // Safe fallback
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: stats?.totalArtists?.toString() || "0", // Safe fallback
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0", // Safe fallback
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];

  if (isStatsLoading || isSongsLoading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default DashBoardStat;
