"use client";
import { useGetPlayers } from "@/queries/useGetPlayers";
import React, { useEffect } from "react";
import DataTable from "./data-table";
import { columns } from "./columns";

const RatingListPage = () => {

  const players = useGetPlayers();
  console.log("Players data:", players.data);

  const sortedPlayers = players.data?.sort(
    (a: { rank: number }, b: { rank: number }) => a.rank - b.rank
  );

  useEffect(() => {
    console.log("Sorted players:", sortedPlayers);
  }, [sortedPlayers]);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-1">Rating liste</h2>
      <div className=" mb-4">
        <DataTable
          columns={columns}
          data={sortedPlayers ?? []}
        />
      </div>
    </div>
  );
};

export default RatingListPage;
