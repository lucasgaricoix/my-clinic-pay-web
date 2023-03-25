import { login, refresh } from '@/services/auth/auth.service'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext } from 'react'
import { useCookies} from 'react-cookie'

type Props = {
  children?: React.ReactNode
  isAuthenticated: boolean
}

export const AuthContext = createContext({ isAuthenticated: false })

export const AuthProvider: React.FC<Props> = ({
  children,
  isAuthenticated,
}) => {
  const { replace, pathname } = useRouter()
  const [cookies] = useCookies()

  const notProtected = ['/auth/login', '/auth/signup', '/auth/google/callback']

  if (!isAuthenticated && !notProtected.includes(pathname)) {
    try {
      const refreshToken = cookies.get('refresh_token')
    } catch (error) {
      replace('/auth/login')
    }
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
