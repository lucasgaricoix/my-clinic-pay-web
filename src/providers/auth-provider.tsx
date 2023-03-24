import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext, useEffect } from 'react'

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

  const notProtected = ['/auth/login', '/auth/signup', '/auth/google/callback']

  if (!isAuthenticated && !notProtected.includes(pathname)) {
    replace('/auth/login')
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
