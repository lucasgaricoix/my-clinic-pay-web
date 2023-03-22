import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../providers/auth-provider'
import { PaymentDashboard } from '../payment/all/dashboard'

export const HomeComponent = () => {
  const { isUserAuthenticated } = useContext(AuthContext)
  const { push } = useRouter()

  useEffect(() => {
    if (!isUserAuthenticated) {
      push('/auth/login')
    }
  })

  if (!isUserAuthenticated) {
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
