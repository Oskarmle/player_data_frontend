"use client";
import { Chart } from "@/components/chart";
import DataCard from "@/components/data-card";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { WonLostChart } from "@/components/won-lost-chart";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { useEffect, useState } from "react";

export default function Home() {
  const [current_points, setCurrentPoints] = useState<number>(0);
  const [startPoints, setStartPoints] = useState<number>(0);
  const [rank, setRank] = useState<number>(0);

  const player_id = usePlayerId();
  const { data: playerData } = useGetSpecificPlayer(player_id);
  const { data: gameData } = useGetUserGames(player_id);

  useEffect(() => {
    if (gameData?.length) {
      setStartPoints(gameData[0]?.player_rating ?? 0);
    } else {
      setStartPoints(0);
    }
  }, [gameData]);
  useEffect(() => {
    if (playerData) {
      setCurrentPoints(playerData.current_points);
    }
  }, [playerData]);

  useEffect(() => {
    if (playerData) {
      setRank(playerData.rank);
    }
  }, [playerData]);

  return (
    <div className="flex-1 flex flex-col items-center px-2 sm:px-4 py-4 overflow-x-hidden">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <DataCard description="Placering på ratinglisten" data1={rank} />
          <DataCard description="Rating start sæson" data1={startPoints} />
          <DataCard description="Din nuværende rating" data1={current_points} />
          <DataCard
            description="Sæsonens rating ændring"
            data1={current_points - startPoints}
          />
        </div>
        <div className="w-full lg:flex-1">
          <WonLostChart />
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-col gap-4 mt-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
