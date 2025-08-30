import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
