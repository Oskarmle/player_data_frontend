import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL || API_URL;

// Fetch all games for a specific user
const fetchUsersGames = async (player_id: string) => {
  const response = await axios.get(`${PUBLIC_URL}/game/player/${player_id}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch game");
  }
  //   console.log("Fetched game:", response.data);
  return response.data;
};
export const useGetUserGames = (player_id: string) => {
  return useQuery({
    queryKey: ["userGames", player_id],
    queryFn: () => fetchUsersGames(player_id),
  });
};
