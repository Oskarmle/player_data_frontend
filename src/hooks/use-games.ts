import { GameStats } from "@/app/types/games";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchGames = async (userId: string | null, playerId: string | null) => {
  if (playerId) {
    const response = await axios.get(
      `${API_URL}/game/player/stats/${playerId}`,
      {
        params: { userId },
      }
    );
    return response.data;
  } else if (userId) {
    const response = await axios.get(`${API_URL}/game/user/stats/${userId}`, {
      params: { userId },
    });
    return response.data;
  }

  throw new Error("No userId or playerId provided");
};

export const useGetGames = (userId: string | null, playerId: string | null) => {
  return useQuery<GameStats, Error>({
    queryKey: ["games", userId, playerId],
    queryFn: () => fetchGames(userId, playerId),
    enabled: !!userId,
  });
};
