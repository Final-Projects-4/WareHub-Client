import LoginPage from '../components/Login'
import Landing from '../components/Landing'
import { Container, HStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Landing>
      <Container>
        <HStack>
          <LoginPage/>
        </HStack>
      </Container>
    </Landing>
  );
};

export default Home;
