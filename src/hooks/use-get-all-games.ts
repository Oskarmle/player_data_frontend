import { AllGames } from "@/app/types/all-games";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchAllGames = async (
  userId: string | null,
  playerId: string | null
) => {
  if (playerId) {
    const response = await axios.get(`${API_URL}/game/${playerId}/games`, {
      params: { userId },
    });

    console.log("player games", response.data);
    return response.data;
  } else if (userId) {
    const response = await axios.get(`${API_URL}/game/user/${userId}/games`, {
      params: { userId },
    });
    console.log("user games", response.data);
    return response.data;
  }
};

export const useGetAllGames = (
  userId: string | null,
  playerId: string | null
) => {
  return useQuery<AllGames[], Error>({
    queryKey: ["all-games", userId, playerId],
    queryFn: () => fetchAllGames(userId, playerId),
    enabled: !!userId || !!playerId,
  });
};
