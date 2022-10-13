import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { IncomeByPatient } from '../../../../types/payment/income-by-patient'
import { toBRL } from '../../../../utils/format'

type Props = {
  handlePaymentButton: (value: string) => void
  incomeByPatient?: IncomeByPatient
}

export default function IncomeByPatientCard({ handlePaymentButton, incomeByPatient }: Props) {
  return (
    <Flex overflow="auto">
      {incomeByPatient?.values.map((income) => (
        <Stack
          mr={2}
          key={income.id}
          p={2}
          direction="column"
          w="full"
          borderWidth={1}
          borderColor="gray.300"
          borderRadius="md"
          justifyContent="space-between"
          shadow="md"
          divider={<Divider />}
        >
          <Flex justifyContent="space-between" w="3xs">
            <Flex alignItems="center">
              <Text fontSize="sm" textColor="gray.500" mr={1}>
                Sessão:
              </Text>
              <Text fontSize="sm">{income.sessionNumber}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="sm" textColor="gray.500" mr={1}>
                Data:
              </Text>
              <Text fontSize="sm">
                {new Date(income.date).toLocaleDateString('pt', {
                  timeZone: 'UTC',
                })}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              <Text fontSize="sm" textColor="gray.500" mr={1}>
                Pago:
              </Text>
              <Badge
                variant="subtle"
                colorScheme={income.isPaid ? 'green' : 'red'}
              >
                {income.isPaid ? 'sim' : 'não'}
              </Badge>
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="sm" textColor="gray.500" mr={1}>
                Parcial:
              </Text>
              <Badge
                variant="subtle"
                colorScheme={income.isPartial ? 'green' : 'red'}
              >
                {income.isPartial ? 'sim' : 'não'}
              </Badge>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontSize="sm" textColor="gray.500" mr={1}>
              Valor:
            </Text>
            <Text fontSize="sm">{toBRL(income.paymentType.value)}</Text>
          </Flex>
          <Flex alignSelf="flex-end">
            <Button
              onClick={() => handlePaymentButton(income.id!)}
              bg="primary.blue.pure"
              color="white"
              _hover={{ bg: 'primary.blue.pure' }}
              size="sm"
            >
              Pagar
            </Button>
          </Flex>
        </Stack>
      ))}
    </Flex>
  )
}
