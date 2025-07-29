"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetPlayers } from "@/queries/useGetPlayers";
import { useEffect, useState } from "react";

type User = {
  player_id: string;
  player_link: string;
  firstName: string;
  lastName: string;
  Team: string;
};

const SelectUser = () => {
  const [player, setPlayer] = useState("");
  const { data } = useGetPlayers();

  useEffect(() => {
    console.log("Players data:", data);
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("player_id", player);
    }
  }, [player]);

  return (
    <div>
      <Select value={player} onValueChange={(value) => setPlayer(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Vælg en spiller" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Spillere</SelectLabel>
            {data?.map((user: User) => (
              <SelectItem key={user.player_id} value={user.player_id}>
                {user.firstName} {user.lastName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectUser;
