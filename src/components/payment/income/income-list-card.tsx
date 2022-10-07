import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Income } from '../../../types/payment'
import { toBRL } from '../../../utils/format'
import NextLink from 'next/link'

type Props = {
  incomes: Income[]
  handlePaymentButton: (id: string) => void
  handleRemoveButton: (id: string) => void
}

type Display = {
  label: string
  value: string | number
  child?: React.ReactNode
}

type Badge = {
  isPaid: Boolean
  isPartial: Boolean
}

function DoubleDisplay({ label, value, child }: Display) {
  return (
    <Flex justifyContent="space-between">
      <Flex justifyContent="space-between">
        <Text mr={1} fontSize="sm">
          {label}
        </Text>
        <Text mr={1} fontSize="sm">
          {value}
        </Text>
      </Flex>
      {child && child}
    </Flex>
  )
}

function Display({ label, value }: Display) {
  return (
    <Flex justifyContent="space-between">
      <Text mr={1} fontSize="sm">
        {label}
      </Text>
      <Text mr={1} fontSize="sm">
        {value}
      </Text>
    </Flex>
  )
}

function DisplayBadge({ isPaid, isPartial }: Badge) {
  return (
    <HStack justifyContent="space-between">
      <Flex alignItems="center">
        <Text mr={1} fontSize="sm">
          Pago:
        </Text>
        <Badge variant="subtle" colorScheme={isPaid ? 'green' : 'red'}>
          {isPaid ? 'Sim' : 'Não'}
        </Badge>
      </Flex>
      <Flex alignItems="center">
        <Text mr={1} fontSize="sm">
          Parcial:
        </Text>
        <Badge variant="subtle" colorScheme={isPartial ? 'green' : 'red'}>
          {isPartial ? 'Sim' : 'Não'}
        </Badge>
      </Flex>
    </HStack>
  )
}

export default function IncomeListCard({
  incomes,
  handlePaymentButton,
  handleRemoveButton,
}: Props) {
  return (
    <Stack>
      {incomes.map((income) => (
        <Stack
          key={income.id}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          direction="column"
          shadow="md"
          p={2}
          divider={<Divider />}
          spacing={2}
        >
          <DoubleDisplay
            label="Sessão:"
            value={income.sessionNumber}
            child={
              <Flex>
                <Text mr={1} fontSize="sm">
                  Nome:
                </Text>
                <Text fontSize="sm">{income.person.name}</Text>
              </Flex>
            }
          />
          <DoubleDisplay
            label="Data:"
            value={new Date(income.date).toLocaleDateString('pt', {
              timeZone: 'UTC',
            })}
            child={
              <Flex>
                <Text mr={1} fontSize="sm">
                  Valor:
                </Text>
                <Text fontSize="sm">{toBRL(income.paymentType.value)}</Text>
              </Flex>
            }
          />
          <Display label="Descrição:" value={income.description} />
          <DisplayBadge isPaid={income.isPaid} isPartial={income.isPartial} />
          <Stack justifyContent="space-between" spacing={2}>
            <Button
              bg="primary.blue.pure"
              color="white"
              borderRadius="2xl"
              size="sm"
              w="full"
              _hover={{
                bg: 'primary.blue.pure',
              }}
              onClick={() => handlePaymentButton(income.id!)}
            >
              Pagar
            </Button>
            <NextLink href={`payment/income/${income.id}`}>
              <Button
                bg="primary.blue.pure"
                color="white"
                borderRadius="2xl"
                size="sm"
                w="full"
                _hover={{
                  bg: 'primary.blue.pure',
                }}
              >
                Editar
              </Button>
            </NextLink>
            <Button
              bg="white"
              variant="outline"
              colorScheme="red"
              borderRadius="2xl"
              size="sm"
              w="full"
              onClick={() => handleRemoveButton(income.id!)}
            >
              Excluir
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
