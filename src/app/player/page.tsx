"use client";

import { formatDate } from "@/utils/format-date";
import { columns } from "./columns";
import DataTable from "./data-table";
import React, { useEffect, useState } from "react";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";

const PlayerPage = () => {
  const [player_id, setPlayerId] = useState<string>("");

  // Update player_id from localStorage when the component mounts or when the playerIdChanged event is fired
  useEffect(() => {
    const updatePlayer = () => {
      const id = localStorage.getItem("selectedPlayerId");
      if (id) setPlayerId(id);
    };

    updatePlayer(); // load initially
    window.addEventListener("playerIdChanged", updatePlayer); // listen for custom events

    return () => window.removeEventListener("playerIdChanged", updatePlayer);
  }, []);

  // Fetch user games based on the selected player ID
  const { data: gamesData, error, isLoading } = useGetUserGames(player_id);

  // Fetch user based on the selected player ID
  const { data: player } = useGetSpecificPlayer(player_id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games</div>;

  // Ensure gamesData is an array or has a games property
  const gamesArray = Array.isArray(gamesData)
    ? gamesData
    : gamesData?.games ?? [];

  // Format game dates for display
  const gamesWithFormattedDates =
    gamesArray.map((data: { game_date: string }) => ({
      ...data,
      formattedDate: formatDate(data.game_date),
    })) ?? [];

  return (
    <div className="container mx-auto p-0">
      <h2 className="px-4">
        Viser resultater for{" "}
        <span className="font-bold">
          {player
            ? `${player.firstName} ${player.lastName}`
            : "Ingen spiller valgt"}
        </span>
      </h2>
      <div className="px-4 mb-4">
        <p className="text-sm text-muted-foreground">
          Antal kampe: {gamesWithFormattedDates.length}
        </p>
        <DataTable columns={columns} data={gamesWithFormattedDates} />
      </div>
    </div>
  );
};

export default PlayerPage;
