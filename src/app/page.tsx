"use client";
import { Chart } from "@/components/chart";
import DataCard from "@/components/data-card";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { useEffect, useState } from "react";

export default function Home() {
  const [current_points, setCurrentPoints] = useState<number>(0);
  const [startPoints, setStartPoints] = useState<number>(0);
  const player_id = usePlayerId();

  const { data: PlayerData } = useGetSpecificPlayer(player_id);
  const { data: GameData } = useGetUserGames(player_id);

  useEffect(() => {
    if (!GameData || GameData.length === 0) {
      setStartPoints(0);
      return;
    }
    if (GameData) {
      const startGame = GameData[0];
      setStartPoints(startGame.player_rating);
    }
  }, [GameData]);

  useEffect(() => {
    if (PlayerData) {
      setCurrentPoints(PlayerData.current_points);
    }
  }, [PlayerData]);

  return (
    <div className="flex-1 p-4 gap-4 flex flex-col">
      <div className="flex gap-4">
        <DataCard description="Rating start sæson" data1={startPoints} />
        <DataCard description="Din nuværende rating" data1={current_points} />
        <DataCard
          description="Sæsonens rating ændring"
          data1={current_points - startPoints}
        />
      </div>
      <div className="flex flex-col gap-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
