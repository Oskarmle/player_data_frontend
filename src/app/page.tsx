"use client";
import DataCard from "@/components/custom/data-card";
import { GainedLostRatingMonthly } from "@/components/custom/gained-lost-rating-monthly";
import { WonLostChart } from "@/components/custom/won-lost-chart";
import { useGetGames } from "@/hooks/use-games";
import { useGetMonthlyStats } from "@/hooks/use-get-monthly-stats";
import { useUsers } from "./providers/user-provider";

export default function Home() {
  const { userId, playerId } = useUsers();

  const { data: GameData } = useGetGames(userId, playerId);
  const { data: MonthlyStats } = useGetMonthlyStats(userId, playerId);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col justify-between gap-4  basis-1/2">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col basis-1/2 gap-4">
                <DataCard
                  data={GameData?.totalGames ?? 0}
                  title="Antal kampe"
                />
                <DataCard data={GameData?.won ?? 0} title="Vundne kampe" />
              </div>
              <div className="flex flex-col basis-1/2 gap-4">
                <DataCard data={GameData?.lost ?? 0} title="Tabte kampe" />
                <DataCard
                  data={GameData?.winRate ?? 0}
                  title="Procent vundne"
                />
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl flex-1 p-4 flex items-center justify-center">
              testbox
            </div>
          </div>
          <div className="basis-1/2">
            <WonLostChart lost={GameData?.lost ?? 0} won={GameData?.won ?? 0} />
          </div>
        </div>
        <GainedLostRatingMonthly data={MonthlyStats ?? []} />
      </div>
    </div>
  );
}
