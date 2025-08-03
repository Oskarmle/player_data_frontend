"use client";
import DataCard from "@/components/data-card";
import { calculateOpponentStats } from "@/utils/calculate-opponent-stats";
import { calculateWonLost } from "@/utils/calculate-won-lost-games";
import React, { useEffect, useState } from "react";
import HeadToHead from "./head-2-head";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

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
import { usePlayerGame } from "@/providers/player-game-provider";
import Loading from "@/components/loading";
import NoData from "@/components/no-data";

const GamesPage = () => {
  const { gameData, loading, error } = usePlayerGame();
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
  }, [selectedOpponent]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <NoData message={error.message ?? "Der opstod en fejl"} />;
  }

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
                <CommandEmpty>Vælg en modstander herover</CommandEmpty>
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
