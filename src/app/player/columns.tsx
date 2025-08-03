"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
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
  game_id: number;
  game_date: string;
  opponent_name: string;
  opponent_link: string;
  opponent_rating: number;
  opponent_club: string;
  player_rating: number;
  gained_lost: number;
  tournament: string;
  player_id: string;
};

export const columns: ColumnDef<Game>[] = [
  {
    header: "Dato",
    accessorKey: "formattedDate",
    size: 80,
  },
  {
    header: "Din rating",
    accessorKey: "player_rating",
    size: 70,
  },
  {
    header: "Modstander",
    accessorKey: "opponent_name",
    size: 230,
  },
  {
    header: "Modstanders klub",
    accessorKey: "opponent_club",
    size: 190,
  },
  {
    accessorKey: "opponent_rating",
    size: 170,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modstander rating
          <ArrowUpDown className="h-4 p-0" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gained_lost",
    size: 140,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating ændring
          <ArrowUpDown className="h-4 p-0" />
        </Button>
      );
    },
  },
  {
    header: "Turnering/Holdkamp",
    accessorKey: "tournament",
    size: 450,
  },
  {
    size: 50,
    id: "actions",
    cell: () =>
      // { row }
      {
        // const game = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 p-0">
                <span className="sr-only">Åben menu</span>
                <MoreHorizontal className="h-4" />
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
