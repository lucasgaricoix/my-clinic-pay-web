import {
  Badge,
  Button,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoPencil, IoTrash } from 'react-icons/io5'
import { Income } from '../../../types/payment'
import { toBRL } from '../../../utils/format'

type Props = {
  incomes: Income[]
  handlePaymentButton: (id: string) => void
  handleRemoveButton: (id: string) => void
}

export default function IncomeListTable({
  incomes,
  handlePaymentButton,
  handleRemoveButton,
}: Props) {
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })
  return (
    <Table size={size}>
      <Thead>
        <Tr>
          <Th>Nº da sessão</Th>
          <Th>Nome</Th>
          <Th>Data</Th>
          <Th isNumeric>Valor</Th>
          <Th>Descrição</Th>
          <Th>Pago?</Th>
          <Th>Valor parcial?</Th>
          <Th>Opções</Th>
        </Tr>
      </Thead>
      <Tbody>
        {incomes.map((income) => (
          <Tr key={income.id}>
            <Td>{income.sessionNumber}</Td>
            <Td>{income.person.name}</Td>
            <Td>
              {new Date(income.date).toLocaleDateString('pt', {
                timeZone: 'UTC',
              })}
            </Td>
            <Td isNumeric>{toBRL(income.paymentType.value)}</Td>
            <Td>{income.description}</Td>
            <Td>
              <Badge
                variant="subtle"
                colorScheme={income.isPaid ? 'green' : 'red'}
              >
                {income.isPaid ? 'Sim' : 'Não'}
              </Badge>
            </Td>
            <Td>
              <Badge
                variant="subtle"
                colorScheme={income.isPartial ? 'green' : 'red'}
              >
                {income.isPartial ? 'Sim' : 'Não'}
              </Badge>
            </Td>
            <Td>
              <Stack direction="row">
                <Button
                  onClick={() => handlePaymentButton(income.id!)}
                  size={size}
                >
                  Pagar
                </Button>
                <NextLink href={`payment/income/${income.id}`}>
                  <Button size={size}>
                    <Icon as={IoPencil} />
                  </Button>
                </NextLink>
                <Button
                  size={size}
                  onClick={() => handleRemoveButton(income.id!)}
                >
                  <Icon as={IoTrash} />
                </Button>
              </Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
