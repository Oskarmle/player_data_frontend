"use client";
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoData from "./no-data";
import Loading from "./loading";
import type { gameData } from "@/types/game-data-type";

export const description = "An interactive area chart";

type Game = {
  game_date: string;
  player_rating: number;
  gained_lost: number;
};

const chartConfig = {
  rating: {
    label: "rating",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart({ player_id, gameData, loading, error }: gameData) {
  const [timeRange, setTimeRange] = useState("365d");

  if (!player_id) {
    return (
      <NoData message="Ingen spiller valgt, vælg en spiller for at se data." />
    );
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <NoData message="Ingen data tilgængelig, vælg en ny spiller der har spillet kampe" />
    );
  }

  const rawGames = Array.isArray(gameData) ? gameData : [];
  if (!rawGames.length) {
    return (
      <NoData message="Ingen data tilgængelig, vælg en ny spiller der har spillet kampe" />
    );
  }

  const transformedData = rawGames.map((game: Game) => ({
    date: game.game_date,
    rating: game.player_rating,
  }));

  const daysMap: Record<string, number> = {
    "365d": 365,
    "180d": 180,
    "90d": 90,
    "60d": 60,
    "30d": 30,
    "7d": 7,
  };

  const filteredData = transformedData.filter(
    (item: { date: string | number | Date }) => {
      const date = new Date(item.date);
      const referenceDate = new Date();
      const daysToSubtract = daysMap[timeRange] ?? 90;
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    }
  );
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Rating point</CardTitle>
          <CardDescription>
            Viser total rating over en specifik periode
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Sidste 3 måneder" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="365d" className="rounded-lg">
              Sidste 12 måneder
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Sidste 6 måneder
            </SelectItem>
            <SelectItem value="60d" className="rounded-lg">
              Sidste 2 måneder
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Sidste 30 dage
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 pr-6 pl-0 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis domain={[900, "auto"]} allowDataOverflow={true} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="rating"
              type="bump"
              fill="var(--chart-6)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
