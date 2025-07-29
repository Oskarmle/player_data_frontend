"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Game = {
  game_id: string;
  formattedDate: string;
  opponent_name: string;
  opponent_rating: number;
  opponent_club: string;
  player_rating: number;
  gained_lost: number;
  //   tournament: string;
};

export const columns: ColumnDef<Game>[] = [
  {
    header: "Dato",
    accessorKey: "formattedDate",
  },
  {
    header: "Din rating",
    accessorKey: "player_rating",
  },
  {
    header: "Modstander",
    accessorKey: "opponent_name",
  },
  {
    header: "Modstanders klub",
    accessorKey: "opponent_club",
  },
  {
    header: "Modstander rating",
    accessorKey: "opponent_rating",
  },
  {
    header: "Rating ændring",
    accessorKey: "gained_lost",
  },
  //   {
  //     header: "Turnering/Holdkamp",
  //     accessorKey: "tournament",
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      // const game = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Åben menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(game.game_id)}
            >
              Copy game ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se data i graf</DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="https://www.bordtennisportalen.dk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Se kamp på Bordtennisportalen.dk
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
