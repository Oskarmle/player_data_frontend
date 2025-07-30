import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL || API_URL;

// Fetch all games
const fetchAllGames = async () => {
  const response = await axios.get(`${PUBLIC_URL}/game`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch games");
  }
  //   console.log("Fetched games:", response.data);
  return response.data;
};
export const useGetGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: fetchAllGames,
  });
};
