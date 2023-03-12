import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { MainLayout } from '../src/components/custom/main/main-layout'
import '../styles/globals.css'
import { theme } from '../styles/theme'
import { wrapper } from '../src/store/store'
import { Provider } from 'react-redux'
import { AuthProvider } from '../src/providers/auth-provider'
import MediaProvider from '../src/providers/media-provider'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider
          isUserAuthenticated={store.getState().userSession.token !== ''}
        >
          <MediaProvider>
            <main className={roboto.className}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </main>
          </MediaProvider>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
