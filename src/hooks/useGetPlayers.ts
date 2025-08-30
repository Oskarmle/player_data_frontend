import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchPlayers = async (user_Id: string) => {
  const response = await axios.get(`${API_URL}/player/${user_Id}/players`);
  return response.data;
};

export const useGetPlayers = (user_Id: string) => {
  return useQuery({
    queryKey: ["users", user_Id],
    queryFn: () => fetchPlayers(user_Id),
    enabled: !!user_Id,
  });
};
