"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPlayers } from "@/queries/useGetPlayers";
import PlayerList from "./player-list";
import { Player } from "@/types/player-type";
import SelectUser from "@/components/select-user";

const ChoosePlayer = () => {
  const { data } = useGetPlayers();

  const sortedPlayers = data?.sort(
    (a: { name: string }, b: { name: string }) => {
      return a.name.localeCompare(b.name);
    }
  );

  return (
    <div className="p-4 h-fit flex items-center justify-center">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Vælg en spiller her</CardTitle>
          <CardDescription>
            Du kan altid ændre dit valg. Hvis du ikke er på listen, så send en
            mail på omle.eriksen@gmail.com med et link til din
            bordtennisportalen.dk profil
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedPlayers?.map((player: Player) => (
            <PlayerList key={player.player_id} player={player} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChoosePlayer;
