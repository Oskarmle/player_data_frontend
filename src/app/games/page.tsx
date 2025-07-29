"use client";
import { useGetGames } from "@/queries/useGetGames";
import React, { useEffect } from "react";

const GamesPage = () => {
  const { data, error, isLoading } = useGetGames();

  useEffect(() => {
    console.log("Games data:", data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching games</div>;
  return <div>GamesPage</div>;
};

export default GamesPage;
