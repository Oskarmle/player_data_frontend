import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type DataCardProps = {
  content1?: string;
  content2?: string;
  data1?: number;
  data2?: string;
  description: string;
};

const DataCard = ({
  content1,
  content2,
  data1,
  data2,
  description,
}: DataCardProps) => {
  return (
    <div className="flex-1">
      <Card className="p-4 h-full w-full gap-1">
        <CardHeader className="px-2">
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data1}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col px-2">
          <p>
            {content1} {content2} {data2}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCard;
