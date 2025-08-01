"use client";
import { Chart } from "@/components/chart";
import DataCard from "@/components/data-card";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { WonLostChart } from "@/components/won-lost-chart";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { calculateWonLost } from "@/utils/calculate-won-lost-games";

export default function Home() {
  const player_id = usePlayerId();
  const { data: playerData } = useGetSpecificPlayer(player_id);
  const { data: gameData, isLoading, error } = useGetUserGames(player_id);

  const { won, lost } = calculateWonLost(gameData);

  const startPoints = gameData?.[0]?.player_rating ?? 0;
  const current_points = playerData?.current_points ?? 0;
  const rank = playerData?.rank ?? 0;

  return (
    <div className="flex-1 flex flex-col items-center px-2 sm:px-4 py-4 overflow-x-hidden">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <div className="flex gap-4 h-2/4">
            <DataCard description="Placering på ratinglisten" data1={rank} />
            <DataCard description="Rating start sæson" data1={startPoints} />
          </div>
          <div className="flex gap-4 h-2/4">
            <DataCard
              description="Din nuværende rating"
              data1={current_points}
            />
            <DataCard
              description="Sæsonens rating ændring"
              data1={current_points - startPoints}
            />
          </div>
        </div>
        <div className="w-full lg:flex-1">
          <WonLostChart
            lost={lost}
            won={won}
            loading={isLoading}
            error={!!error}
            errorMessage={error?.message}
          />
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-col gap-4 mt-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
