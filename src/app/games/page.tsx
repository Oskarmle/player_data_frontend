"use client";
import DataCard from "@/components/data-card";
import { usePlayerId } from "@/hooks/usePlayerId";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { calculateOpponentStats } from "@/utils/calculate-opponent-stats";
import { calculateWonLost } from "@/utils/calculate-won-lost-games";
import React, { useEffect, useState } from "react";
import HeadToHead from "./head-2-head";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Card } from "@/components/ui/card";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { OpponentStats } from "@/utils/calculate-opponent-stats";
import { cn } from "@/lib/utils";

const GamesPage = () => {
  const player_id = usePlayerId();
  const { data: gameData, error, isLoading } = useGetUserGames(player_id);
  const { won, lost } = calculateWonLost(gameData);
  const opponentStats = calculateOpponentStats(gameData);

  const [opponentName, setOpponentName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [wonGames, setWonGames] = useState<number>(0);
  const [lostGames, setLostGames] = useState<number>(0);
  const [ratingChange, setRatingChange] = useState<number>(0);

  const handleChange = (opponent_name: string) => {
    setOpponentName(opponent_name);
  };

  const selectedOpponent = opponentStats?.find(
    (opponent) => opponent.opponent_name === opponentName
  );

  useEffect(() => {
    if (selectedOpponent) {
      setWonGames(selectedOpponent.won);
      setLostGames(selectedOpponent.lost);
      setRatingChange(selectedOpponent.ratingChange);
    }

    console.log("Selected opponent:", selectedOpponent);
  }, [selectedOpponent]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching games</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <DataCard data1={gameData.length} description="Spillede kampe" />
        <DataCard data1={won} description="Vundne kampe" />
        <DataCard data1={lost} description="Tabte kampe" />
      </div>
      <div className="flex flex-col gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full ">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between cursor-pointer"
            >
              {selectedOpponent
                ? selectedOpponent.opponent_name
                : "Vælg spiller..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] mt-1 z-50"
            align="start"
            sideOffset={0}
          >
            <Command>
              <CommandInput
                placeholder="Søg spiller..."
                className="h-9 w-full"
              />
              <CommandList>
                <CommandEmpty>ingen spiller fundet</CommandEmpty>
                <CommandGroup>
                  {opponentStats?.map((opponent: OpponentStats) => (
                    <CommandItem
                      className="cursor-pointer"
                      key={opponent.opponent_name}
                      value={opponent.opponent_name}
                      onSelect={() => {
                        handleChange(opponent.opponent_name);
                        setOpen(false);
                      }}
                    >
                      {opponent.opponent_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          opponent.opponent_name === opponentName
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <HeadToHead
          won={wonGames}
          lost={lostGames}
          ratingChange={ratingChange}
          opponent_name={opponentName}
        />
      </div>
    </div>
  );
};

export default GamesPage;
