"use client";
import { Chart } from "@/components/chart";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { useEffect, useState } from "react";

export default function Home() {
  const [player_id, setPlayerId] = useState<string>("");

  useEffect(() => {
    const updatePlayer = () => {
      const id = localStorage.getItem("selectedPlayerId");
      if (id) setPlayerId(id);
    };

    updatePlayer(); // load initially
    window.addEventListener("playerIdChanged", updatePlayer);

    return () => window.removeEventListener("playerIdChanged", updatePlayer);
  }, []);

  return (
    <div className="flex-1 px-4 gap-4 flex flex-col">
      <h2>Se interessante statistik her</h2>
      <div>
        <GainedLostChart />
      </div>
      <Chart />
    </div>
  );
}
