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
import { Player } from "@/types/player-type"; // Adjust the import path as necessary

const SelectUser = () => {
  const { data } = useGetPlayers();
  const [player_id, setPlayerId] = useState<string>("");

  useEffect(() => {
    const savedId = localStorage.getItem("selectedPlayerId");
    if (savedId) {
      setPlayerId(savedId);
    }
  }, []);

  const handleChange = (player_id: string) => {
    setPlayerId(player_id);
    localStorage.setItem("selectedPlayerId", player_id);
    window.dispatchEvent(new Event("playerIdChanged"));
  };

  return (
    <div>
      <Select value={player_id} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Vælg en spiller" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Spillere</SelectLabel>
            {data?.map((player: Player) => (
              <SelectItem key={player.player_id} value={player.player_id}>
                {player.firstName} {player.lastName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectUser;
