import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, VStack, Box, Spinner, Text } from "@chakra-ui/react";
import { useGenres } from "../hooks/useGenres";
import { useAnimeStore } from "../store";

const GenreFilter: React.FC = () => {
  const filters = useAnimeStore((state) => state.filters);
  const setFilters = useAnimeStore((state) => state.setFilters);
  const { data, isLoading, error } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(filters);

  useEffect(() => {
    setSelectedGenres(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(selectedGenres);
  }, [selectedGenres, setFilters]);

  if (isLoading) return <Spinner color="white" />;
  if (error || !data) return <Text color="red.500">Error loading genres</Text>;

  return (
    <Box
      maxH="80vh"
      overflowY="auto"
      bg="gray.800"
      color="white"
      p="3"
      borderRadius="md"
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'gray.700',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'white',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'gray.400',
        },
      }}
    >
      <CheckboxGroup
        value={selectedGenres}
        onChange={(values: string[]) => setSelectedGenres(values)}
      >
        <VStack align="start">
          {data.data.map((genre: any) => (
            <Checkbox key={genre.mal_id} value={genre.mal_id.toString()} colorScheme="purple">
              {genre.name}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
    </Box>
  );
};

export default GenreFilter;







