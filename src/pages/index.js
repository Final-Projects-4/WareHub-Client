import LoginPage from "../components/styleComponents/Login";
import Landing from "../components/styleComponents/Landing";
import { Box } from "@chakra-ui/react";


const Home = () => {

  return (
    <Box>
      <LoginPage position="absolute" top={0} left={0} zIndex={1} />
    </Box>
  );
};

export default Home;
