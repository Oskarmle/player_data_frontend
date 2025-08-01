import DataCard from "@/components/data-card";
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
      <div className="flex flex-col gap-4">
        <WonLostChart won={won} lost={lost} />
        <DataCard
          data1={ratingChange}
          description="Rating ændring mod modstander"
        />
      </div>
    </div>
  );
};

export default HeadToHead;
