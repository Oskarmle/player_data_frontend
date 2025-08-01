"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetPlayers } from "@/queries/useGetPlayers";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Player } from "@/types/player-type";

const SelectUser = () => {
  const { data } = useGetPlayers();
  const [playerId, setPlayerId] = useState<string>("");

  const [open, setOpen] = useState(false);
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

  const selectedPlayer = data?.find((p: Player) => p.player_id === playerId);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-[var(--foreground)]"
          >
            {selectedPlayer ? selectedPlayer.name : "Vælg spiller..."}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Søg spiller..." className="h-9" />
            <CommandList>
              <CommandEmpty>ingen spiller fundet</CommandEmpty>
              <CommandGroup>
                {data?.map((player: Player) => (
                  <CommandItem
                    key={player.player_id}
                    value={player.name}
                    onSelect={() => {
                      handleChange(player.player_id);
                      setOpen(false);
                    }}
                  >
                    {player.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedPlayer === player.player_id
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
    </div>
  );
};

export default SelectUser;
