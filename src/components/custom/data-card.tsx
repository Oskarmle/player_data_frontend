import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type DataCardProps = {
  data: number;
  title: string;
};

const DataCard = ({ data, title }: DataCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data}</CardTitle>
          <CardDescription>
            {title}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DataCard;
