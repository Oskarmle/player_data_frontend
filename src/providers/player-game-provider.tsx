"use client";
import React, { createContext, useContext } from "react";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetSpecificPlayer } from "@/queries/useGetSpecificPlayer";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { PageData } from "@/types/game-props";

const PageDataContext = createContext<PageData | null>(null);

const PageDataProvider = ({ children }: { children: React.ReactNode }) => {
  const player_id = usePlayerId();
  const { data: playerData } = useGetSpecificPlayer(player_id);
  const { data: gameData, isLoading, error } = useGetUserGames(player_id);

  const value: PageData = {
    player_id,
    playerData,
    gameData,
    loading: isLoading,
    error: error ? { message: error.message } : undefined,
  };

  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};

// Custom hook to use the PageData context
export const usePlayerGame = (): PageData => {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error("usePlayerGame must be used within a PageDataProvider");
  }
  return context;
};

export default PageDataProvider;
