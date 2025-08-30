"use client";
import { Player } from "@/app/types/player";
import { useGetPlayers } from "@/hooks/useGetPlayers";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type ShowSeasonProps = {
  userId: string | null;
  playerId: string | null;
  onChange: (playerId: string | null) => void;
};

const ShowSeason = ({ userId, playerId, onChange }: ShowSeasonProps) => {
  const { data } = useGetPlayers(userId || "");

  return (
    <div className="w-full">
      <ToggleGroup
        type="single"
        variant="outline"
        className="w-full"
        value={playerId ?? undefined}
        onValueChange={(val) => {
          onChange(val);
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
