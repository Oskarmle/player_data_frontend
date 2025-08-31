import { MonthStats } from "@/app/types/month-stats";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchMonthlyStats = async (
  userId: string | null,
  playerId: string | null
) => {
  if (playerId) {
    const response = await axios.get(
      `${API_URL}/game/player/monthly-stats/${playerId}`,
      {
        params: { playerId },
      }
    );

    console.log("Fetched MonthlyStats:", response.data);
    return response.data;
  } else if (userId) {
    const response = await axios.get(
      `${API_URL}/game/user/monthly-stats/${userId}`,
      {
        params: { userId },
      }
    );
    console.log("Fetched MonthlyStats:", response.data);
    return response.data;
  }

  throw new Error("No userId or playerId provided");
};

export const useGetMonthlyStats = (
  userId: string | null,
  playerId: string | null
) => {
  return useQuery<MonthStats[], Error>({
    queryKey: ["games", userId, playerId],
    queryFn: () => fetchMonthlyStats(userId, playerId),
    enabled: !!userId || !!playerId,
  });
};
