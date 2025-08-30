"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";
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

export const description = "Viser tabte og vunde kampe i en søjlediagram";

type WonLostProps = {
  won: number;
  lost: number;
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

export const WonLostChart = ({ won, lost }: WonLostProps) => {
  const chartData = [
    { name: "Vundne", value: won ?? 0, color: "var(--chart-2)" },
    { name: "Tabte", value: lost ?? 0, color: "var(--chart-3)" },
  ];
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <Bar dataKey="value" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
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
};
