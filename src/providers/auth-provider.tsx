import { Box } from '@chakra-ui/react'
import { createContext } from 'react'

type Props = {
  children?: React.ReactNode
  isUserAuthenticated: boolean
}

export const AuthContext = createContext({ isUserAuthenticated: false })

export const AuthProvider: React.FC<Props> = ({ children, isUserAuthenticated }) => {
  return (
    <AuthContext.Provider value={{ isUserAuthenticated }}>
      <Box>{children}</Box>
    </AuthContext.Provider>
  )
}
