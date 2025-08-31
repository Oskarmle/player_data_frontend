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

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default Games;
