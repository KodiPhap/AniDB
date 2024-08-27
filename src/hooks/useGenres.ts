import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Genre {
  mal_id: number;
  name: string;
}

const fetchGenres = async (): Promise<{ data: Genre[] }> => {
  const { data } = await axios.get('https://api.jikan.moe/v4/genres/anime');
  return data;
};

export const useGenres = () => {
  return useQuery<{ data: Genre[] }>({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });
};

