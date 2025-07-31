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
    if (!gameData || gameData.length === 0) {
      setStartPoints(0);
      return;
    }
    if (gameData) {
      const startGame = gameData[0];
      setStartPoints(startGame.player_rating);
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
    <div className="flex-1 p-4 gap-4 flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/3">
          <DataCard description="Placering på ratinglisten" data1={rank} />
          <DataCard description="Rating start sæson" data1={startPoints} />
          <DataCard description="Din nuværende rating" data1={current_points} />
          <DataCard
            description="Sæsonens rating ændring"
            data1={current_points - startPoints}
          />
        </div>
        <WonLostChart />
      </div>
      <div className="flex flex-col gap-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
