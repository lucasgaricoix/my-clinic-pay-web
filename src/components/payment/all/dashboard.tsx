import { Box, Flex, Progress, Text, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { PaymentService } from '../../../services/payment'
import { PaymentOverMonthType } from '../../../types/payment/payment'
import { NivoLineChart } from '../../custom/charts/line/nivo-line-chart'

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
    <Flex
      w="full"
      h="full"
      direction="column"
      backgroundColor="primary.gray.background"
    >
      <Flex bg="white" p={6} shadow="md" mb={6} justifyContent="center">
        <Text fontSize="lg" fontWeight="bold" alignSelf="center">
          Dashboard
        </Text>
      </Flex>
      {loading && data.length ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <Flex
          justify="center"
          alignItems="center"
          direction="column"
          width="500px"
          height="350px"
          bgColor="white"
          rounded="lg"
          shadow="md"
          ml={6}
        >
          <Text fontWeight="bold">Receitas e despesas ano/mês</Text>
          <NivoLineChart data={data || []} />
        </Flex>
      )}
    </Flex>
  )
}
