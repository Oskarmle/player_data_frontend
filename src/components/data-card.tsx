import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type DataCardProps = {
  data1: number;
  description: string;
};

const DataCard = ({ data1, description }: DataCardProps) => {
  return (
    <div className="flex-1">
      <Card className="p-4 h-full lg:w-full w-full">
        <CardHeader className="flex flex-col px-2">
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data1}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DataCard;
