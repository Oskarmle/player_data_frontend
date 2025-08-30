import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchUser = async (userId: string) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
};
