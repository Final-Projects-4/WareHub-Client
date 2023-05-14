import LoginPage from "../components/Login";
import Landing from "../components/Landing";
import { Container, Box, Flex } from "@chakra-ui/react";


const Home = () => {
  return (
    <Flex>
        <Landing zIndex={-1}/>
        <LoginPage position="absolute" top={0} left={0} zIndex={1} />
    </Flex>
        
     
  );
};




export default Home;
