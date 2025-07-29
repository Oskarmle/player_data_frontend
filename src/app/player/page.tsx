"use client";

import { formatDate } from "@/utils/format-date";
import { columns } from "./columns";
import DataTable from "./data-table";
import React, { useEffect } from "react";
import { useGetUserGames } from "@/queries/useGetUsersGames";

const PlayerPage = () => {
  const { data, error, isLoading } = useGetUserGames("BH");

  useEffect(() => {
    console.log("User games data:", data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games</div>;

  const gamesWithFormattedDates =
    data?.map((data: { game_date: string; }) => ({
      ...data,
      formattedDate: formatDate(data.game_date),
    })) ?? [];
  return (
    <div className="container mx-auto p-0">
      <DataTable columns={columns} data={gamesWithFormattedDates} />
    </div>
  );
};

export default PlayerPage;
