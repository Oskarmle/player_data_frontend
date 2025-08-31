"use client";
import { Player } from "@/app/types/player";
import { useGetPlayers } from "@/hooks/useGetPlayers";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useUsers } from "@/app/providers/user-provider";

const ShowSeason = () => {
  const { userId, playerId, setPlayerId } = useUsers();
  const { data } = useGetPlayers(userId || "");

  return (
    <div className="w-full">
      <ToggleGroup
        type="single"
        variant="outline"
        className="w-full"
        value={playerId ?? undefined}
        onValueChange={(val) => {
          setPlayerId(val); // ⬅️ directly update via context
        }}
      >
        {data?.map((player: Player) => (
          <ToggleGroupItem key={player.player_id} value={player.player_id}>
            {player.season}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ShowSeason;
