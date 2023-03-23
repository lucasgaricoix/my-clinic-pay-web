import { Box } from '@chakra-ui/react'
import { createContext } from 'react'

type Props = {
  children?: React.ReactNode
  isAuthenticated: boolean
}

export const AuthContext = createContext({ isAuthenticated: false })

export const AuthProvider: React.FC<Props> = ({ children, isAuthenticated }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
