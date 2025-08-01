"use client";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Loading from "./loading";
import NoData from "./no-data";
export const description = "Viser tabte og vunde kampe i en søjlediagram";

type WonLostProps = {
  won: number;
  lost: number;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  data?: [];
};

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

export function WonLostChart({
  won,
  lost,
  loading,
  error,
  errorMessage,
  data,
}: WonLostProps) {
  const chartData = [
    { name: "Vundne", value: won, color: "var(--chart-2)" },
    { name: "Tabte", value: lost, color: "var(--chart-3)" },
  ];

  // Guard: loading and error states
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <NoData message={errorMessage ?? "Der opstod en fejl"} />;
  }
  if (won === 0 && lost === 0) {
    return <NoData message="Ingen data tilgængelig" />;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vundne og tabte kampe</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <Bar dataKey="value" radius={8}>
              <LabelList
                dataKey="value"
                position="top"
                fontSize={14}
                fontWeight="bold"
              />
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
