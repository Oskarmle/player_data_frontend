"use client";
import { Chart } from "@/components/chart";
import DataCard from "@/components/data-card";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { useEffect, useState } from "react";

export default function Home() {
  const [current_points, setCurrentPoints] = useState<number>(0);
  const player_id = usePlayerId();

  const { data: PlayerData } = useGetSpecificPlayer(player_id);

  useEffect(() => {
    if (PlayerData) {
      setCurrentPoints(PlayerData.current_points);
    }
  }, [PlayerData]);

  return (
    <div className="flex-1 p-4 gap-4 flex flex-col">
      <div className="flex gap-4">
        <DataCard description="Din nuværende rating" data1={current_points} />
      </div>
      <div className="flex flex-col gap-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
