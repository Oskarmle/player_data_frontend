'use client'

import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player } from "@/types/player-type";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PlayerList = ({ player }: { player: Player }) => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem("selectedPlayerId", player.player_id);
    window.dispatchEvent(new Event("playerIdChanged"));
    console.log(`Selected player: ${player.player_id}`);

    router.push('/');
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-blue-900 transition-colors",
        "border rounded-xl w-full sm:w-64 max-w-xs"
      )}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>
          {player.firstName} {player.lastName}
        </CardTitle>
        <CardDescription>Spiller for {player.team}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PlayerList;
