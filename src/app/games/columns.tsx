"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AllGames } from "../types/all-games";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<AllGames>[] = [
  {
    accessorKey: "game_date",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dato
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDate(row.original.game_date);
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "player_rating",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "opponent_name",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modstander
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "opponent_rating",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modstander rating
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "opponent_club",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modstander klub
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gained_lost",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating ændring
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tournament",
    header: ({ column }) => {
      return (
        <Button
          className="!px-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Turnering
          <ArrowUpDown className="ml-0.5" />
        </Button>
      );
    },
  },
];
