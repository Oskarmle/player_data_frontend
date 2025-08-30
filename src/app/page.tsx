"use client";
import DataCard from "@/components/custom/data-card";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import { GainedLostRatingMonthly } from "@/components/custom/gained-lost-rating-monthly";
import ShowSeason from "@/components/custom/show-season";
import { WonLostChart } from "@/components/custom/won-lost-chart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetGames } from "@/hooks/use-games";
import { useGetMonthlyStats } from "@/hooks/use-get-monthly-stats";
import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedPlayerId = localStorage.getItem("player_id");

    if (storedUserId) setUserId(storedUserId);
    if (storedPlayerId) setPlayerId(storedPlayerId);
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      const newUserId = localStorage.getItem("user_id");
      setUserId(newUserId);
      setPlayerId(null);
    };

    window.addEventListener("user_id", handleUserChange);
    return () => window.removeEventListener("user_id", handleUserChange);
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("user_id", userId);
      console.log("Stored user_id:", userId);
    } else {
      localStorage.removeItem("user_id");
      console.log("Removed user_id");
    }
  }, [userId]);

  useEffect(() => {
    if (playerId) {
      localStorage.setItem("player_id", playerId);
      console.log("Stored player_id:", playerId);
    } else {
      localStorage.removeItem("player_id");
      console.log("Removed player_id");
    }
  }, [playerId]);

  const { data: GameData } = useGetGames(userId, playerId);
  const { data: MonthlyStats } = useGetMonthlyStats(userId, playerId);
  console.log("MonthlyStats:", MonthlyStats);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col p-4 gap-4">
        <ShowSeason
          onChange={setPlayerId}
          playerId={playerId}
          userId={userId}
        />
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
              <WonLostChart
                lost={GameData?.lost ?? 0}
                won={GameData?.won ?? 0}
              />
            </div>
          </div>
          <GainedLostRatingMonthly data={MonthlyStats ?? []} />
        </div>
      </div>
    </SidebarProvider>
  );
}
