import {
  useLazyRefreshQuery,
  useRefreshQuery,
} from '@/services/auth/auth-rtk-api'
import { login, refresh } from '@/services/auth/auth.service'
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
    const { isSuccess, error } = await trigger(refreshToken)

    console.log({ isSuccess })
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
  }, [])

  if (!isAuthenticated && !notProtected.includes(pathname)) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
