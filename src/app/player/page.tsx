"use client";

import { formatDate } from "@/utils/format-date";
import { columns } from "./columns";
import DataTable from "./data-table";
import React from "react";
import Loading from "@/components/loading";
import NoData from "@/components/no-data";
import { usePlayerGame } from "@/providers/player-game-provider";

const PlayerPage = () => {
  const { gameData, playerData, loading, error } = usePlayerGame();

  if (loading) return <Loading />;
  if (error)
    return <NoData message="Der opstod en fejl under hentning af data." />;

  // Ensure gameData is an array or has a games property
  if (!gameData || !Array.isArray(gameData) || gameData.length === 0) {
    return <NoData message="Ingen kampe fundet for denne spiller." />;
  }
  const gamesWithFormattedDates =
    gameData.map((data: { game_date: string }) => ({
      ...data,
      formattedDate: formatDate(data.game_date),
    })) ?? [];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-1">
        Viser resultater for{" "}
        <span className="font-bold">
          {playerData ? playerData.name : "Ingen spiller valgt"}
        </span>
      </h2>
      <div className=" mb-4">
        <p className="text-sm text-muted-foreground">
          Antal kampe: {gamesWithFormattedDates.length}
        </p>
        <DataTable columns={columns} data={gamesWithFormattedDates} />
      </div>
    </div>
  );
};

export default PlayerPage;
