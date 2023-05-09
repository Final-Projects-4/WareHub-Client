import * as React from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../styles/theme'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar/>
        <Component {...pageProps} />
    </ChakraProvider>
  )
}



