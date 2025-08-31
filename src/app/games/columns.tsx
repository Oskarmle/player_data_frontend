"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AllGames } from "../types/all-games";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<AllGames>[] = [
  {
    accessorKey: "game_date",
    header: "Dato",
    cell: ({ row }) => formatDate(row.original.game_date)
  },
  {
    accessorKey: "player_rating",
    header: "din rating",
  },
  {
    accessorKey: "opponent_name",
    header: "Modstander",
  },
  {
    accessorKey: "opponent_rating",
    header: "modstander rating",
  },
  {
    accessorKey: "opponent_club",
    header: "Modstander klub",
  },
  {
    accessorKey: "gained_lost",
    header: "rating ændring",
  },
  {
    accessorKey: "tournament",
    header: "turnering",
  },
];
