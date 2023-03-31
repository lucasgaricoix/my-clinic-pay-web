import { useLazyRefreshQuery } from '@/services/auth/auth-rtk-api'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

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
  const [cookies] = useCookies(['refresh-token'])
  const [trigger] = useLazyRefreshQuery()

  const notProtected = ['/auth/login', '/auth/signup', '/auth/google/callback']

  const triggerRefreshToken = useCallback(async () => {
    const refreshToken = cookies['refresh-token']
    if (!refreshToken) {
      await replace('/auth/login')
    }

    const { isSuccess, error } = await trigger(refreshToken)

    if (isSuccess) {
      await replace('/')
    }

    if (error) {
      await replace('/auth/login')
    }
  }, [cookies, replace, trigger])

  useEffect(() => {
    if (!isAuthenticated && !notProtected.includes(pathname)) {
      triggerRefreshToken()
    }
  }, [isAuthenticated])

  if (!isAuthenticated && !notProtected.includes(pathname)) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
