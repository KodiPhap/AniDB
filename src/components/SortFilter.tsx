import React, { useState, useEffect } from 'react';
import { Select, Box } from '@chakra-ui/react';
import { useAnimeStore } from '../store';

const SortFilter: React.FC = () => {
  const sort = useAnimeStore((state) => state.sort);
  const setSort = useAnimeStore((state) => state.setSort);
  const [selectedSort, setSelectedSort] = useState(sort);

  useEffect(() => {
    setSelectedSort(sort);
  }, [sort]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    setSort(event.target.value);
  };

  return (
    <Box>
      <Select
        value={selectedSort}
        onChange={handleSortChange}
        bg="gray.700"
        color="white"
        borderColor="gray.600"
        _hover={{ borderColor: "purple.500" }}
        _focus={{ bg: "gray.600", borderColor: "purple.500" }}
      >
        <option value="" style={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}>Sort by</option>
        <option value="score" style={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}>Score</option>
        <option value="popularity" style={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}>Popularity</option>
        <option value="start_date" style={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}>Release Date</option>
        <option value="title" style={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}>Alphabetical Order</option>
      </Select>
    </Box>
  );
};

export default SortFilter;







