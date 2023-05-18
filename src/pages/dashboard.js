import { allProducts } from '@/components/dataComponents/allData';
import { BulkInsertForm, LowStockAlert } from '@/components/dataComponents/products';
import ProfitLoss from '@/components/dataComponents/profitLoss';
import { Grid, Box, useMediaQuery, Stack, Image, VStack, useColorMode } from '@chakra-ui/react';
import { fetchData} from '@/fetching/fetchData';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const fetchProducts = async () => {
    const data = await fetchData("products");
    return data;
  };

  const useProducts = () => {
    const [data, setData] = useState({ products: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const reponse = await fetchProducts();
          setData(reponse);
          setIsLoading(false);
        } catch (err) {
          setError(err)
          setIsLoading(false)
        }
      };
  
      fetchData();
    }, []);
  
    return { data, setData };
  };

  const {data} = useProducts();
  
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();
  const imageUrl = colorMode === 'dark' ? 'darkBulk.png' : 'https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?w=740&t=st=1684387560~exp=1684388160~hmac=e225f2314b5666af1ce71c24159d0e45587d38a74f171444232d2e4243fef2a1'
  
  return (
    <>
      {isSmallerScreen ? (
        <Stack spacing={4} minW="100%">
          <Box p={4}>
            <LowStockAlert data={data.products} />
          </Box>
          <Box p={4} justifyContent="center" alignItems="center">
              <VStack>
              <Image src={imageUrl}/>
              <BulkInsertForm/>
              </VStack>
            </Box>
          <Box bg="green.200" p={4}>
            {/* Content for the third column */}
          </Box>
          <Box bg="yellow.200" p={4}>
            {/* Content for the fourth column */}
          </Box>
          <Box bg="purple.200" p={4}>
            {/* Content for the first column */}
          </Box>
          <Box bg="pink.200" p={4}>
            {/* Content for the second column */}
          </Box>
          <Box p={4}>
            <ProfitLoss />
          </Box>
          <Box bg="orange.200" p={4}>
            {/* Content for the second column */}
          </Box>
          <Box bg="cyan.200" p={4}>
            {/* Content for the third column */}
          </Box>
        </Stack>
      ) : (
        <Grid templateRows="repeat(3, 1fr)" gap={4} minW="100%" maxH="100vh">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <Box p={4}>
              <LowStockAlert data={data.products}/>
            </Box>
            <Box p={4} justifyContent="center" alignItems="center">
              <VStack>
              <Image src={imageUrl}/>
              <BulkInsertForm/>
              </VStack>
            </Box>
            <Box bg="green.200" p={4}>
            <LowStockAlert data={data.products}/>
            </Box>
            <Box bg="yellow.200" p={4}>
            <LowStockAlert data={data.products}/>
            </Box>
          </Grid>
          <Grid templateColumns="4fr 1fr" gap={4} >
            <Box bg="purple.200" p={4}>
            <LowStockAlert data={data.products}/>
            </Box>
            <Box bg="pink.200" p={4}>
              <LowStockAlert data={data.products}/>
            </Box>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Box p={4}>
              <ProfitLoss/>
            </Box>
            <Box bg="orange.200" p={4}>
              <LowStockAlert data={data.products}/>
            </Box>
            <Box bg="cyan.200" p={4}>
            <LowStockAlert data={data.products}/>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
