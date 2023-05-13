import LoginPage from "../components/Login";
import Landing from "../components/Landing";
import { Container, SimpleGrid, Box } from "@chakra-ui/react";


const Home = () => {

  return (
    <Container>
      <LoginPage position="absolute" top={0} left={0} zIndex={1} />
        <Box position="relative" zIndex={0}>
          <SimpleGrid spacing={8} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          </SimpleGrid>
        </Box>
    </Container>

  );
};

export default Home;
