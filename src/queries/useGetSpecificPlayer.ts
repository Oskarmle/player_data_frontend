import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL || API_URL;

// Fetch a specific player by ID
const fetchPlayerById = async (player_id: string) => {
  const response = await axios.get(`${PUBLIC_URL}/player/${player_id}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch user");
  }
  // console.log("Fetched user:", response.data);
  return response.data;
};

export const useGetSpecificPlayer = (player_id: string) => {
  return useQuery({
    queryKey: ["player", player_id],
    queryFn: () => fetchPlayerById(player_id),
    enabled: !!player_id,
  });
};
