import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { MainLayout } from '../src/components/custom/main/main-layout'
import '../styles/globals.css'
import { theme } from '../styles/theme'
import { wrapper } from '../src/store/store'
import { Provider } from 'react-redux'
import SessionWrapper from '../src/providers/session-wrapper'


function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>        
        <SessionWrapper>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        </SessionWrapper>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
