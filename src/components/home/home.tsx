import { Divider, Stack, Text } from '@chakra-ui/react'
import { PaymentDashboard } from '../payment/all/dashboard'

export const HomeComponent = () => {
  return (
    <Stack spacing={2} p="2">
      <Text>Bem vindo ao my clinic pay!</Text>
      <Divider orientation='vertical' />
      <PaymentDashboard />
    </Stack>
  )
}
