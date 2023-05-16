import * as React from "react";
import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../styles/theme";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Flex h="vh">
        {router.pathname !== "/" && <Sidebar h="vh" />}
        <Flex flex="1" flexDirection="column">
          <Box flex="1">
            <Navbar pr={10} />
            <Component {...pageProps} />
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}
