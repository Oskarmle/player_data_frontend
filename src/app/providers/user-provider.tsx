"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { useGetUsers } from "@/hooks/useGetUsers";

type UsersContextType = {
  users: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
  userId: string | null;
  setUserId: (id: string | null) => void;
  playerId: string | null;
  setPlayerId: (id: string | null) => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedPlayerId = localStorage.getItem("player_id");

    if (storedUserId) setUserId(storedUserId);
    if (storedPlayerId) setPlayerId(storedPlayerId);
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      const newUserId = localStorage.getItem("user_id");
      setUserId(newUserId);
      setPlayerId(null);
    };

    window.addEventListener("user_id", handleUserChange);
    return () => window.removeEventListener("user_id", handleUserChange);
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("user_id", userId);
      console.log("Stored user_id:", userId);
    } else {
      localStorage.removeItem("user_id");
      console.log("Removed user_id");
    }
  }, [userId]);

  useEffect(() => {
    if (playerId) {
      localStorage.setItem("player_id", playerId);
      console.log("Stored player_id:", playerId);
    } else {
      localStorage.removeItem("player_id");
      console.log("Removed player_id");
    }
  }, [playerId]);

  const { data, isLoading, error } = useGetUsers();

  return (
    <UsersContext.Provider
      value={{
        users: data,
        isLoading,
        error: error ?? null,
        userId,
        setUserId,
        playerId,
        setPlayerId,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (ctx === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return ctx;
}
