import { Flex, Text, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { PaymentService } from '../../../services/payment'
import { PaymentOverMonthType } from '../../../types/payment/payment'
import { MensalIncomeBarChart } from '../../custom/charts/bar/mensal-income'

export const PaymentDashboard = () => {
  const [data, setData] = useState<PaymentOverMonthType[]>([])
  const toast = useToast()

  const fetch = useCallback(async () => {
    try {
      const response = await PaymentService.findAllOverMonth()
      setData(response.data)
    } catch {
      toast({
        title: 'Erro ao buscar a despesa',
        description: 'Não foi encontrado a despesa com o id informado :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [toast])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Flex w="full" h="full" direction="column" p="4">
      <Text>Receitas e Despesas</Text>
      <MensalIncomeBarChart data={data || []} />
    </Flex>
  )
}
