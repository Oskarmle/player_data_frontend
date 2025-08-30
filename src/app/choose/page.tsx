import { ChoosePlayerDialog } from "@/components/custom/choose-player-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const ChooseUser = () => {
  return (
    <div className="w-screen h-screen flex p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vælg dit navn på skærmen</CardTitle>
          <CardDescription>
            Vælg dit navn, derefter kan du vælge en sæson, eller se alle dine
            statistikker
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ChoosePlayerDialog />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseUser;
