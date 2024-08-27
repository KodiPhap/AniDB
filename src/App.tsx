import React, { ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Box, Heading, VStack, Flex } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import AnimeList from "./components/AnimeList";
import AnimeDetail from "./components/AnimeDetail";
import SortFilter from "./components/SortFilter";
import GenreFilter from "./components/GenreFilter";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box p={5} bg="gray.900" color="white" minH="100vh">
      {isHomePage && (
        <VStack spacing={5}>
          <Heading
            fontSize="6xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            bgClip="text"
            textShadow="2px 2px #444444"
          >
            AniDB
          </Heading>
          <SearchBar />
          <SortFilter />
        </VStack>
      )}
      <Flex mt={5}>
        {isHomePage && (
          <Box w="20%" mr={5}>
            <GenreFilter />
          </Box>
        )}
        <Box flex="1">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><AnimeList /></Layout>} />
        <Route path="/anime/:id" element={<Layout><AnimeDetail /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;








