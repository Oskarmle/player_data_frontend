"use client";

import { formatDate } from "@/utils/format-date";
import { columns } from "./columns";
import DataTable from "./data-table";
import React from "react";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { usePlayerId } from "@/hooks/usePlayerId";
import Loading from "@/components/loading";
import NoData from "@/components/no-data";

const PlayerPage = () => {
  const player_id = usePlayerId();
  const { data: gamesData, error, isLoading } = useGetUserGames(player_id);
  const { data: player } = useGetSpecificPlayer(player_id);

  if (isLoading) return <Loading />;
  if (error)
    return <NoData message="Der opstod en fejl under hentning af data." />;

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-1">
        Viser resultater for{" "}
        <span className="font-bold">
          {player ? player.name : "Ingen spiller valgt"}
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
