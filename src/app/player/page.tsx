"use client";
import { useGetUserGames } from "@/queries/useGetGames";
import React, { useEffect } from "react";

const PlayerPage = () => {
  const { data, error, isLoading } = useGetUserGames("OE");

  useEffect(() => {
    console.log("User games data:", data);
  }, [data]);

  return <div>PlayerPage</div>;
};

export default PlayerPage;
