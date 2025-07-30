import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Loading = () => {
  return (
    <Card className="w-full flex justify-center">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Loading;
