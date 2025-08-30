"use client";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import ShowSeason from "@/components/custom/show-season";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) setUserId(storedUserId);

    const storedPlayerId = localStorage.getItem("player_id");
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
    if (playerId) {
      localStorage.setItem("player_id", playerId);
      console.log("Stored player_id:", playerId);
    } else {
      localStorage.removeItem("player_id");
      console.log("Removed player_id");
    }
  }, [playerId]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <ShowSeason
        playerId={playerId}
        userId={userId}
        onChange={(val) => setPlayerId(val)}
      />
    </SidebarProvider>
  );
}
