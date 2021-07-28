import { Flex, Text } from '@chakra-ui/react'
import { MensalIncomeBarChart } from '../../custom/charts/bar/mensal-income'
const mock = [
  {
    mes: 'junho',
    receita: 2350,
    despesa: 800,
    total: 2350 - 800,
  },
  {
    mes: 'julho',
    receita: 3400,
    despesa: 1000,
    total: 3400 - 1000,
  },
  {
    mes: 'agosto',
    receita: 1809,
    despesa: 750,
    total: 1809 - 750,
  },

  {
    mes: 'setembro',
    receita: 1600,
    despesa: 750,
    total: 1600 - 750,
  },

  {
    mes: 'outubro',
    receita: 1809,
    despesa: 750,
    total: 1809 - 750,
  },
  {
    mes: 'novembro',
    receita: -1809,
    despesa: 750,
    total: 1005,
  },
]
export const PaymentDashboard = () => {
  return (
    <Flex w="full" h="full" direction="column" p="4">
      <Text>Receitas e Despesas</Text>
      <MensalIncomeBarChart data={mock} />
    </Flex>
  )
}
