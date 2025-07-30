import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

type NoDataProps = {
  message: string;
};

const NoData = ({ message }: NoDataProps) => {
  return (
    <Card className="w-full flex justify-center">
      <CardHeader>
        <CardTitle>{message}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default NoData;
