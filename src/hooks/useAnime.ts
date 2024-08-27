import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useAnimeStore } from "../store";

type QueryKey = [string, string, string, string[]];

const fetchAnime = async ({ pageParam = 1, queryKey }: QueryFunctionContext<QueryKey>) => {
  const [key, query, sort, filters] = queryKey;
  let url = `https://api.jikan.moe/v4/anime?page=${pageParam}`;

 
  if (sort) {
    if (sort === 'popularity' || sort === 'title') {
      url += `&order_by=${sort}&sort=asc`; 
    } else {
      url += `&order_by=${sort}&sort=desc`; 
    }
  }

 
  if (query) {
    url += `&q=${query}`;
  }

 
  if (filters.length > 0) {
    url += `&genres=${filters.join(',')}`;
  }

  console.log('Fetching URL:', url); 

  const retryAfter = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  try {
    const { data } = await axios.get(url);
    console.log('Fetched data:', data); 

   
    data.data.slice(0, 5).forEach((anime: any, index: number) => {
      console.log(`Anime ${index + 1}:`, {
        title: anime.title,
        popularity: anime.popularity,
        score: anime.score,
      });
    });

 
    if (sort === 'popularity') {
      data.data = data.data.filter((anime: any) => anime.popularity !== 0);
      console.log('Filtered data by popularity:', data.data); 
    }

  
    if (query) {
      const filteredData = data.data.filter((anime: any) => anime.title.toLowerCase().includes(query.toLowerCase()));
      console.log('Data after applying keyword filter:', filteredData); 
      data.data = filteredData;
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      console.error("Rate limit exceeded, retrying after delay...");
      await retryAfter(5000); 
      const { data } = await axios.get(url);
      console.log('Fetched data after retry:', data);

     
      data.data.slice(0, 5).forEach((anime: any, index: number) => {
        console.log(`Anime ${index + 1} after retry:`, {
          title: anime.title,
          popularity: anime.popularity,
          score: anime.score,
        });
      });

   
      if (sort === 'popularity') {
        data.data = data.data.filter((anime: any) => anime.popularity !== 0);
        console.log('Filtered data by popularity after retry:', data.data); 
      }

  
      if (query) {
        const filteredData = data.data.filter((anime: any) => anime.title.toLowerCase().includes(query.toLowerCase()));
        console.log('Data after applying keyword filter after retry:', filteredData); 
        data.data = filteredData;
      }

      return data;
    }
    throw error;
  }
};

export const useAnime = () => {
  const query = useAnimeStore((state) => state.query);
  const sort = useAnimeStore((state) => state.sort);
  const filters = useAnimeStore((state) => state.filters);

  return useInfiniteQuery({
    queryKey: ["anime", query, sort, filters] as QueryKey,
    queryFn: fetchAnime,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pagination.current_page + 1;
      return nextPage <= lastPage.pagination.last_visible_page ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

























  
