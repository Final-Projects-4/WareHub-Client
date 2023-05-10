import LoginPage from '../components/Login'
import Landing from '../components/Landing'
import { Container, HStack } from '@chakra-ui/react'
import Cards from '@/components/Cards';

const Home = () => {
  const type = "warehouse"
   
  const product =         
  {
      name: "Keripik Tela",
      price: 100,
      weight: "1 Kg",
      size: "20 Cm",
      description: "Keripik tela curah",
      SKU: "KTC1",
    }

  const warehouse =         
  {
      name: "Gudang Barang Depok 1",
      city: "Depok",
      address: "Jl Penghasahan No 15",
  }
  const categori =         
  {
      name: "Grocery",
      description: " Kebutuhan Sehari Hari ",
  }

  return(
    <Container>
      <HStack>    
        <Cards props={warehouse} type={type}/>
      </HStack>  
    </Container>
  )
};

export default Home;
