import React, { useEffect, useRef } from "react";
import { useAnime } from "../hooks/useAnime";
import { Box, Grid, Text, Image, Spinner, Badge, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AnimeList: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAnime();

  const observerElem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <Spinner color="white" />;
  if (error) return <Text color="red.500">Error fetching data</Text>;

  return (
    <Box p="5" bg="gray.900" color="white">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {data?.pages.map((page, pageIndex) =>
          page.data.map((anime: any, index: number) => {
            const allGenres = [...anime.genres, ...anime.themes, ...anime.demographics];
            return (
              <Box
                key={`${anime.mal_id}-${pageIndex}-${index}`}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                bg="gray.800"
                _hover={{ transform: "scale(1.05)", transition: "transform 0.2s", bg: "gray.700" }}
              >
                <Link to={`/anime/${anime.mal_id}`}>
                  <Image src={anime.images.jpg.image_url} alt={anime.title} />
                  <Box p="4">
                    <Text fontWeight="bold" fontSize="xl" mb="2">
                      {anime.title}
                    </Text>
                    <VStack align="start" spacing="1">
                      <Badge colorScheme="green">
                        {anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : 'N/A'}
                      </Badge>
                      <HStack wrap="wrap">
                        <Badge colorScheme="red" mr="1">
                          {anime.rating ?? 'N/A'}
                        </Badge>
                        {allGenres.map((genre: any) => (
                          <Badge key={genre.name} colorScheme="purple" mr="1">
                            {genre.name}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>
                  </Box>
                </Link>
              </Box>
            );
          })
        )}
      </Grid>
      <div ref={observerElem} />
      {isFetchingNextPage && <Spinner mt="4" color="white" />}
      {!hasNextPage && <Text mt="4">No more data to load</Text>}
    </Box>
  );
};

export default AnimeList;






















