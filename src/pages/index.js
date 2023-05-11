import LoginPage from '../components/Login'
import Landing from '../components/Landing'
import { Container, SimpleGrid } from '@chakra-ui/react'
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
      image : "https://source.unsplash.com/random/900x700/?vegetable",
    }

  const warehouse =         
  {
      name: "Gudang Barang Depok 1",
      city: "Depok",
      address: "Jl Penghasahan No 15",
      image : "https://source.unsplash.com/random/900x700/?Build",
  }
  const categori =         
  {
      name: "Grocery",
      description: " Kebutuhan Sehari Hari ",
      image : "https://source.unsplash.com/random/900x700/?Items",
  }

  return(
    <Container>
      <LoginPage/>
      <SimpleGrid spacing={8} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>   
        <Cards props={warehouse} type={"warehouse"}/>
        <Cards props={categori} type={"categori"}/>
        <Cards props={product} type={"product"}/>
      </SimpleGrid>
    </Container>
  )
};

export default Home;
