"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Player } from "@/types/player-type";

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "rank",
    size: 80,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Navn",
    accessorKey: "name",
    size: 70,
  },
  {
    accessorKey: "player_club",
    size: 230,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Klub
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "current_points",
    size: 190,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 !p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating point
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    size: 50,
    id: "actions",
    cell: () => {
      return (
        <Button variant="ghost" className="h-8 p-0">
          <span className="sr-only">Åben menu</span>
          <MoreHorizontal className="h-4" />
        </Button>
      );
    },
  },
];
