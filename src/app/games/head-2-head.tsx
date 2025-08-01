import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WonLostChart } from "@/components/won-lost-chart";
import React from "react";

type HeadToHeadProps = {
  opponent_name?: string;
  won: number;
  lost: number;
  ratingChange: number;
};

const HeadToHead = ({ won, lost, ratingChange }: HeadToHeadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        Se dine statistikker mod dine modstandere
      </p>
      <div>
        <WonLostChart won={won} lost={lost} data={[]} />
      </div>
    </div>
  );
};

export default HeadToHead;
