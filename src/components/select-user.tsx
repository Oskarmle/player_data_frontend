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
import { setPlayer } from "@/app/player/playerSlice";
import { useGetPlayers } from "@/queries/useGetPlayers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

type Player = {
  player_id: string;
  player_link: string;
  firstName: string;
  lastName: string;
  Team: string;
};

const SelectUser = () => {
  const dispatch = useDispatch();
  const { data } = useGetPlayers();

  // Get selected player_id from Redux store
  const player = useSelector((state: RootState) => state.player.player_id);

  useEffect(() => {
    console.log("Players data:", data);
  }, [data]);

  const handleChange = (value: string) => {
    const selectedPlayer = data?.find(
      (player: Player) => player.player_id === value
    );
    if (selectedPlayer) {
      dispatch(
        setPlayer({
          player_id: value,
          firstName: selectedPlayer.firstName,
          player_link: selectedPlayer.player_link,
          lastName: selectedPlayer.lastName,
          Team: selectedPlayer.Team,
        })
      );
    }
  };

  return (
    <div>
      <Select value={player} onValueChange={handleChange}>
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
