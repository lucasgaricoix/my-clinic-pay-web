import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { PaymentDashboard } from '../payment/all/dashboard'

export const HomeComponent = () => {
  const state = useSelector((state: RootState) => state.userSession)

  if (!state.token) {
    return (
      <Box>
        <Text>Redirecting...</Text>
      </Box>
    )
  }

  return (
    <Stack spacing={2} p="2">
      <Text>Bem vindo ao my clinic pay!</Text>
      <Divider orientation="vertical" />
      <PaymentDashboard/>
    </Stack>
  )
}
