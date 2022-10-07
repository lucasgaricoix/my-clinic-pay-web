import {
  Badge,
  Button,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { IncomeByPatient } from '../../../../types/payment/income-by-patient'
import { toBRL } from '../../../../utils/format'

type Props = {
  income: IncomeByPatient
  handlePaymentButton: (value: string) => void
}

export default function IncomeByPatientTable({
  income,
  handlePaymentButton,
}: Props) {
  const size = useBreakpointValue({ base: 'sm', lg: 'md' })
  return (
    <Table variant="simple" size={size}>
      <Thead>
        <Tr>
          <Th>Nº da sessão</Th>
          <Th>Data</Th>
          <Th>Pago?</Th>
          <Th>Parcial?</Th>
          <Th></Th>
          <Th isNumeric>Valor</Th>
        </Tr>
      </Thead>
      <Tbody>
        {income.values.map((value) => (
          <Tr key={value.id}>
            <Td>{value.sessionNumber}</Td>
            <Td>
              {new Date(value.date).toLocaleDateString('pt', {
                timeZone: 'UTC',
              })}
            </Td>
            <Td>
              <Badge
                variant="subtle"
                colorScheme={value.isPaid ? 'green' : 'red'}
              >
                {value.isPaid ? 'Sim' : 'Não'}
              </Badge>
            </Td>
            <Td>
              <Badge
                variant="subtle"
                colorScheme={value.isPartial ? 'green' : 'red'}
              >
                {value.isPartial ? 'Sim' : 'Não'}
              </Badge>
            </Td>
            <Td>
              {!value.isPaid && (
                <Button
                  onClick={() => handlePaymentButton(value.id!)}
                  size={size}
                >
                  Pagar
                </Button>
              )}
            </Td>
            <Td isNumeric>{toBRL(value.paymentType.value)}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total</Th>
          <Th />
          <Th />
          <Th />
          <Th />
          <Th isNumeric>
            {toBRL(
              income.values
                .map((value) => value.paymentType.value)
                .reduce((acc, curr) => acc + curr, 0)
            )}
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
