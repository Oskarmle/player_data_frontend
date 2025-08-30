"use client";
import DataCard from "@/components/custom/data-card";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import ShowSeason from "@/components/custom/show-season";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetGames } from "@/hooks/use-games";
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

  const { data } = useGetGames(userId, playerId);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <ShowSeason
          playerId={playerId}
          userId={userId}
          onChange={setPlayerId}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <DataCard data={data?.totalGames ?? 0} title="Total Games" />
          <DataCard data={data?.won ?? 0} title="Total Won" />
          <DataCard data={data?.lost ?? 0} title="Total Lost" />
          <DataCard data={data?.winRate ?? 0} title="Win Rate" />
        </div>
      </div>
    </SidebarProvider>
  );
}
