import LoginPage from "../components/styleComponents/Login";
import Landing from "../components/styleComponents/Landing";
import { Box } from "@chakra-ui/react";


const Home = () => {

  return (
    <div>
    <Landing />
      <LoginPage position="absolute" top={0} left={0} zIndex={1} />
      </div>
  );
};

export default Home;
