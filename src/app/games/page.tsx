"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useUsers } from "../providers/user-provider";
import { useGetAllGames } from "@/hooks/use-get-all-games";

const Games = () => {
  const { userId, playerId } = useUsers();
  const { data } = useGetAllGames(userId, playerId);
  console.log("games data", data);

  const sortedData =
    data
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.game_date).getTime() - new Date(a.game_date).getTime()
      ) || [];

  return (
    <div className="">
      <DataTable columns={columns} data={sortedData || []} />
    </div>
  );
};

export default Games;
