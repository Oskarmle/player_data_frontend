import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Fetch all players
const fetchPlayers = async () => {
  const response = await axios.get(`${API_URL}/player`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }
  console.log("Fetched users:", response.data);
  return response.data;
};

export const useGetPlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });
};
