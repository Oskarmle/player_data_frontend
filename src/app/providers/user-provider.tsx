"use client";

import { createContext, useContext } from "react";
import { User } from "../types/user";
import { useGetUsers } from "@/hooks/useGetUsers";

type UsersContextType = {
  users: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useGetUsers();
  return (
    <UsersContext.Provider
      value={{ users: data, isLoading, error: error ?? null }}
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
