"use client";

import { useUsers } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/app/types/user";

export const SelectUser = () => {
  const { users, isLoading } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedUserName = localStorage.getItem("user_name");

    if (storedUserId && storedUserName) {
      setSelectedUserId(storedUserId);
      setSelectedUserName(storedUserName);
    }
  }, []);

  const handleSelectUser = (user: User) => {
    console.log(user.user_id);
    localStorage.setItem("user_id", user.user_id);
    localStorage.setItem("user_name", user.name);
    window.dispatchEvent(new Event("user_id"));
    window.dispatchEvent(new Event("user_name"));
    setSelectedUserId(user.user_id);
    setSelectedUserName(user.name);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          className="w-full justify-between text-[var(--chart-2)] cursor-pointer"
        >
          {isLoading ? "Loading..." : selectedUserName ?? "Vælg spiller..."}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[9999] w-[var(--radix-popover-trigger-width)] min-w-[var(--radix-popover-trigger-width)] max-h-[50vh] overflow-y-auto overscroll-y-auto touch-pan-y p-0 bg-background">
        <Command>
          <CommandInput placeholder="Søg spiller..." />
          <CommandList>
            <CommandEmpty>Ingen spiller fundet</CommandEmpty>
            <CommandGroup>
              {users?.map((user) => (
                <CommandItem
                  key={user.user_id}
                  value={user.name}
                  onSelect={() => {
                    handleSelectUser(user);
                    setOpen(false);
                  }}
                >
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectUser;
