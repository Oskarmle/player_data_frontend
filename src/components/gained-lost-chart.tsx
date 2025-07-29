"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";
import { subMonths, parseISO, isAfter, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Key, useEffect, useMemo, useState } from "react";
import { useGetUserGames } from "@/queries/useGetUsersGames";
export const description = "A bar chart with negative values";

const chartConfig = {
  ratingChange: {
    label: "Rating ændring",
  },
} satisfies ChartConfig;
export function GainedLostChart() {
  const [player_id, setPlayerId] = useState<string>("");
  useEffect(() => {
    const updatePlayer = () => {
      const id = localStorage.getItem("selectedPlayerId");
      if (id) setPlayerId(id);
    };

    updatePlayer(); // load initially
    window.addEventListener("playerIdChanged", updatePlayer);

    return () => window.removeEventListener("playerIdChanged", updatePlayer);
  }, []);

  const { data: rawGames = [], isLoading, error } = useGetUserGames(player_id);

  // Debug logs
  console.log("rawGames:", rawGames);
  const chartData = useMemo(() => {
    if (!Array.isArray(rawGames)) return [];

    const now = new Date();
    const cutoff = subMonths(now, 12);
    const monthlyTotals: Record<string, number> = {};

    rawGames.forEach((game) => {
      const gameDate = parseISO(game.game_date);
      if (!isAfter(gameDate, cutoff)) return;

      const key = format(gameDate, "yyyy-MM");
      monthlyTotals[key] = (monthlyTotals[key] || 0) + (game.gained_lost || 0);
    });

    // Convert to sorted array
    const result = Object.entries(monthlyTotals)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([monthKey, total]) => ({
        month: format(new Date(monthKey + "-01"), "MMM yyyy"),
        ratingChange: total,
      }));
    return result;
  }, [rawGames]);
  // Guard: show message if no player selected
  if (!player_id) {
    return (
      <Card className="pt-0 w-full ">
        <CardHeader>
          <CardTitle>Ingen spiller valgt</CardTitle>
          <CardDescription>Vælg en spiller for at se data.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Guard: loading and error states
  if (isLoading) {
    return (
      <Card className="pt-0 w-full ">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  if (!chartData.length) {
    return (
      <Card className="pt-0 w-full ">
        <CardHeader>
          <CardTitle>Ingen data tilgængelig</CardTitle>
          <CardDescription>
            Ingen rating ændringer fundet for denne spiller de sidste 12
            måneder.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating ændring pr. måned</CardTitle>
        <CardDescription>
          Viser hvor meget rating der er vundet eller tabt hver måned
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="ratingChange">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map(
                (item: {
                  month: Key | null | undefined;
                  ratingChange: number;
                }) => (
                  <Cell
                    className="rounded-t-lg"
                    key={item.month}
                    fill={
                      item.ratingChange > 0
                        ? "var(--chart-2)"
                        : "var(--chart-3)"
                    }
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
