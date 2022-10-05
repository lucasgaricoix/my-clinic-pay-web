import { Flex, Progress, Text, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { PaymentService } from '../../../services/payment'
import { PaymentOverMonthType } from '../../../types/payment/payment'
import { MensalIncomeExpenseBarChart } from '../../custom/charts/bar/mensal-income'

export const PaymentDashboard = () => {  
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PaymentOverMonthType[]>([])
  const toast = useToast()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Flex w="full" h="full" direction="column">
      {loading && data.length ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <Text>Receitas e Despesas</Text>
          <MensalIncomeExpenseBarChart data={data || []} />
        </>
      )}
    </Flex>
  )
}
