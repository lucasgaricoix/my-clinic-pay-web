import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../providers/auth-provider'
import { PaymentDashboard } from '../payment/all/dashboard'

export const HomeComponent = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { push } = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      push('/auth/login')
    }
  })

  if (!isAuthenticated) {
    return (
      <Box>
        <Text>Redirecting...</Text>
      </Box>
    )
  }

  return (
    <PaymentDashboard />
  )
}
