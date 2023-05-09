import LoginPage from '../components/Login'
import Landing from '../components/Landing'
import { Container, HStack } from '@chakra-ui/react'

const Home = () => {

  return(
    <Container>
      <HStack>    
        <Landing/>
        <LoginPage/>
      </HStack>  
    </Container>
  )
};

export default Home;
