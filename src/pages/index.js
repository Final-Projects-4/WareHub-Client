import LoginPage from "../components/Login";
import Landing from "../components/Landing";
import { Container, Box, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex>
      <Landing />
      <LoginPage />
    </Flex>
  );
};

export default Home;
