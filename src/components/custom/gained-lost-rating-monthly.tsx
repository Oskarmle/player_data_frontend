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
import { MonthStats } from "@/app/types/month-stats";

const chartConfig = {
  ratingChange: {
    label: "Rating ændring",
  },
} satisfies ChartConfig;

type GainedLostRatingMonthlyProps = {
  data: MonthStats[];
};

export function GainedLostRatingMonthly({
  data,
}: GainedLostRatingMonthlyProps) {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        month: item.month,
        ratingChange: item.totalGainedLost,
      }))
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating ændring pr. måned</CardTitle>
        <CardDescription>
          Hvor meget rating der er vundet eller tabt hver måned
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:pt-0 pl-0">
        <ChartContainer config={chartConfig} className="sm:h-80  w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
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
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.ratingChange > 0 ? "var(--chart-2)" : "var(--chart-3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
