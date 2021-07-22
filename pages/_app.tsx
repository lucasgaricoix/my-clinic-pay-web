import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { darkTheme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
