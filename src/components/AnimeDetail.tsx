import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Text,
  Image,
  Spinner,
  Badge,
  VStack,
  HStack,
  Divider,
  IconButton,
  AspectRatio,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";


interface Anime {
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  aired: {
    from: string;
  };
  episodes: number | null;
  genres: Array<{ name: string }>;
  themes: Array<{ name: string }>;
  demographics: Array<{ name: string }>;
  status: string;
  rating: string;
  season: string | null;
  year: number | null;
  popularity: number | null;
  score: number | null;
  synopsis: string;
}


interface PromoVideo {
  title: string;
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
}

interface AnimePicture {
  jpg: {
    image_url: string;
  };
}


const fetchAnimeDetail = async (id: string): Promise<Anime> => {
  const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
  return data.data;
};


const fetchAnimeVideos = async (id: string): Promise<PromoVideo[]> => {
  const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/videos`);
  return data.data.promo;
};


const fetchAnimePictures = async (id: string): Promise<AnimePicture[]> => {
  const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/pictures`);
  return data.data;
};

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["animeDetail", id],
    queryFn: () => fetchAnimeDetail(id!),
  });
  const { data: videos } = useQuery({
    queryKey: ["animeVideos", id],
    queryFn: () => fetchAnimeVideos(id!),
  });
  const { data: pictures } = useQuery({
    queryKey: ["animePictures", id],
    queryFn: () => fetchAnimePictures(id!),
  });

  if (isLoading) return <Spinner color="white" />;
  if (error) return <Text color="red.500">Error fetching data</Text>;

  const anime = data as Anime;
  const allGenres = [...anime.genres, ...anime.themes, ...anime.demographics];

  return (
    <Box p="6" maxWidth="1200px" mx="auto" color="white">
      <IconButton
        aria-label="Back to Home"
        icon={<FaArrowLeft />}
        onClick={() => navigate("/")}
        position="fixed"
        top="1rem"
        left="1rem"
        borderRadius="full"
        size="lg"
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={[3, 3, 2]}>
          <Box bg="gray.800" borderRadius="md" p="4">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="4">
              <Text fontWeight="bold" fontSize="3xl">
                {anime.title}
              </Text>
              <Badge colorScheme="green" fontSize="lg">
                {anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : "N/A"}
              </Badge>
            </Box>
            <Image src={anime.images.jpg.image_url} alt={anime.title} borderRadius="lg" mb="4" />
            <VStack align="start" spacing="4">
              <Text>
                <strong>Episode Count:</strong> {anime.episodes ?? "N/A"}
              </Text>
              <HStack>
                <Text>
                  <strong>Genres:</strong>
                </Text>
                <HStack wrap="wrap">
                  {allGenres.map((genre) => (
                    <Badge key={genre.name} colorScheme="purple" mr="1">
                      {genre.name}
                    </Badge>
                  ))}
                </HStack>
              </HStack>
              <Text>
                <strong>Airing Status:</strong> {anime.status}
              </Text>
              <Text>
                <strong>Rating:</strong> {anime.rating}
              </Text>
              <Text>
                <strong>Season:</strong> {anime.season ?? "N/A"} {anime.year ?? ""}
              </Text>
              <Text>
                <strong>Popularity:</strong> {anime.popularity ?? "N/A"}
              </Text>
              <Text>
                <strong>Score:</strong> {anime.score ?? "N/A"}
              </Text>
            </VStack>
            <Divider my="6" borderColor="gray.600" />
            <Box>
              <Text fontWeight="bold" fontSize="2xl" mb="2">
                <strong>Synopsis:</strong>
              </Text>
              <Text>{anime.synopsis}</Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={[3, 3, 1]}>
          <VStack spacing="4">
            {videos && videos.length > 0 && (
              <VStack spacing="4" w="100%">
                {videos.map((video, index) => (
                  <AspectRatio key={index} ratio={16 / 9} w="100%">
                    <iframe
                      title={video.title}
                      src={video.trailer.embed_url}
                      allowFullScreen
                      style={{ borderRadius: "8px" }}
                    />
                  </AspectRatio>
                ))}
              </VStack>
            )}

            {pictures && pictures.length > 0 && (
              <SimpleGrid columns={[1, 2]} spacing="4" w="100%">
                {pictures.map((picture, index) => (
                  <Image
                    key={index}
                    src={picture.jpg.image_url}
                    alt={`Anime Picture ${index + 1}`}
                    borderRadius="lg"
                  />
                ))}
              </SimpleGrid>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AnimeDetail;















