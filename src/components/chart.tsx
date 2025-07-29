"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
import { useGetUserGames } from "@/queries/useGetUsersGames";

export const description = "An interactive area chart";

const chartConfig = {
  rating: {
    label: "rating",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Chart() {
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

  const { data: chartData = [], isLoading, error } = useGetUserGames(player_id);

  const [timeRange, setTimeRange] = useState("365d");

  type Game = {
    game_date: string;
    player_rating: number;
  };

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
  if (error) {
    return (
      <Card className="pt-0 w-full ">
        <CardHeader>
          <CardTitle>Der skete en fejl da under indlæsning</CardTitle>
          <CardDescription>{String(error)}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const rawGames = Array.isArray(chartData) ? chartData : [];
  if (!rawGames.length) {
    return (
      <Card className="pt-0 w-full ">
        <CardHeader>
          <CardTitle>No data available</CardTitle>
          <CardDescription>
            Ingen spil fundet for denne spiller.
          </CardDescription>
        </CardHeader>
      </Card>
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
    <Card className="pt-0 w-full ">
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
            <YAxis domain={[900, 'auto']} allowDataOverflow={true} />
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
              type="natural"
              fill="rgba(30, 144, 255, 0.3)"
              stroke="rgb(30, 144, 255)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
