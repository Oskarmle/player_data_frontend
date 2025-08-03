import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Loading from "./loading";
import NoData from "./no-data";
import type { gameData } from "@/types/game-data-type";

import { calculateGainedLostRating } from "@/utils/calculate-gained-lost-rating";

const chartConfig = {
  ratingChange: {
    label: "Rating ændring",
  },
} satisfies ChartConfig;
export function GainedLostChart({
  player_id,
  gameData,
  loading,
}: gameData) {
  const chartData = calculateGainedLostRating(gameData);

  // Guard: show message if no player selected
  if (!player_id) {
    return (
      <Card className="pt-0 w-full">
        <CardHeader>
          <CardTitle>Ingen spiller valgt</CardTitle>
          <CardDescription>Vælg en spiller for at se data.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Guard: loading and error states
  if (loading) {
    return <Loading />;
  }
  if (!chartData.length) {
    return (
      <NoData message="Ingen data tilgængelig, vælg en ny spiller der har spillet kampe" />
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
      <CardContent className="sm:pt-0 pl-0">
        <ChartContainer config={chartConfig} className="sm:h-80  w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="ratingChange" />
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="ratingChange">
              <LabelList
                position="top"
                dataKey="ratingChange"
                fillOpacity={1}
              />
              {chartData.map(
                (item: { month: string; ratingChange: number }) => (
                  <Cell
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
