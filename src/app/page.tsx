"use client";
import { Chart } from "@/components/chart";
import DataCard from "@/components/data-card";
import { GainedLostChart } from "@/components/gained-lost-chart";
import { useEffect, useState } from "react";

export default function Home() {
  const [player_id, setPlayerId] = useState<string>("");

  useEffect(() => {
    const updatePlayer = () => {
      const id = localStorage.getItem("selectedPlayerId");
      if (id) setPlayerId(id);
    };

    updatePlayer(); // load initially
    window.addEventListener("playerIdChanged", updatePlayer);

    return () => window.removeEventListener("playerIdChanged", updatePlayer);
  }, []);

  const dataCardArray = [
    {
      description: "Din nuværende rating",
      content1: " Det er en forskel på 154 point siden sæsonstart.",
      content2: "Din start rating var",
      data1: "1432",
      data2: "1278",
    },
    {
      description: "Antal kampe spillet",
      content1: "Af alle kampe spillet, har du vundet",
      data1: "154",
      data2: "64%",
    },
  ];

  return (
    <div className="flex-1 px-4 gap-4 flex flex-col">
      {/* <div className="flex gap-4">
        {dataCardArray.map((data, index) => (
          <DataCard
            key={index}
            content1={data.content1}
            content2={data.content2}
            data1={data.data1}
            data2={data.data2}
            description={data.description}
          />
        ))}
      </div> */}
      <div className="flex flex-col gap-4">
        <GainedLostChart />
        <Chart />
      </div>
    </div>
  );
}
