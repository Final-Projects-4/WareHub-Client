import * as React from 'react'
import { ChakraProvider, 
ColorModeScript, Container, HStack, VStack, Grid, Box } from '@chakra-ui/react'
import theme from '../styles/theme'
import Navbar from '../components/styleComponents/Navbar'
import Sidebar from '@/components/styleComponents/Sidebar'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Grid
          height="100vh"
          templateRows="auto 1fr"
          templateColumns="1fr"
          gap={0}
          >
            <Box w="100%" p={4} pb={0}>
              <Navbar />
            </Box>
            <Grid templateColumns="auto 1fr" height="100%">
              <Box>
              <Sidebar/>
              </Box>
              <Box >
            <Component {...pageProps} />
          </Box>


            </Grid>

          </Grid>
      
    </ChakraProvider>
  );
}




/*
<VStack height="100vh" width="full" spacing={0} alignItems="flex-start">
        <Box w="100%" p={4} pb={0}>
          <Navbar />
        </Box>
        <HStack>
          <Sidebar w="25%" alignItems="flex-start" flex="none" />
          
        </HStack>
      </VStack>
<Flex h="vh">
        {router.pathname !== "/" && <Sidebar h="vh"/>}
        <Flex flex="1" flexDirection="column">
          <Box flex="1">
            <Navbar pr={10} />
            </Box>
        </Flex>
      </Flex>
      

*/ 