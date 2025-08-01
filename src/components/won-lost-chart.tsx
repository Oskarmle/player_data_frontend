"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useGetUserGames } from "@/queries/useGetUsersGames";
import { usePlayerId } from "@/hooks/usePlayerId";
import Loading from "./loading";
import NoData from "./no-data";
export const description = "Viser tabte og vunde kampe i en søjlediagram";

const chartConfig = {
  Vunde: {
    label: "Vundne",
    color: "var(--chart-1)",
  },
  Tabte: {
    label: "Tabte",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function WonLostChart() {
  const player_id = usePlayerId();
  const { data: gameData, isLoading } = useGetUserGames(player_id);

  const { won, lost } = Array.isArray(gameData)
    ? gameData.reduce(
        (acc: { won: number; lost: number }, game: { gained_lost: number }) => {
          if (game.gained_lost > 0) acc.won++;
          else if (game.gained_lost < 0) acc.lost++;
          return acc;
        },
        { won: 0, lost: 0 }
      )
    : { won: 0, lost: 0 };

  console.log("Won:", won, "Lost:", lost);

  const chartData = [
    { name: "Vundne", value: won, color: "var(--chart-2)" },
    { name: "Tabte", value: lost, color: "var(--chart-3)" },
  ];

  // Guard: loading and error states
  if (isLoading) {
    return <Loading />;
  }
  if (!gameData.length) {
    return (
      <NoData message="Ingen data tilgængelig, vælg en ny spiller der har spillet kampe" />
    );
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vundne og tabte kampe</CardTitle>
        <CardDescription>
          Viser vundne og tabte kampe i en søjlediagram
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-36 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <Bar dataKey="value" radius={8} label={{ position: "top" }}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
