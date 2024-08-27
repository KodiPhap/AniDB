import React, { useState, useEffect } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { useAnimeStore } from '../store';

const SearchBar: React.FC = () => {
  const query = useAnimeStore((state) => state.query);
  const setQuery = useAnimeStore((state) => state.setQuery);
  const [search, setSearch] = useState(query);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <HStack spacing={4}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for an anime"
        bg="gray.700"
        color="white"
        _placeholder={{ color: "gray.400" }}
        _focus={{ bg: "gray.600", borderColor: "purple.500" }}
      />
      <Button onClick={handleSearch} colorScheme="purple">
        Search
      </Button>
    </HStack>
  );
};

export default SearchBar;




