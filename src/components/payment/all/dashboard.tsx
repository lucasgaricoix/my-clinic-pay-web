import { Box, Flex, Progress, Text, useToast } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PaymentService } from '../../../services/payment'
import { PaymentOverMonthType } from '../../../types/payment/payment'
import { NivoLineChart } from '../../custom/charts/line/nivo-line-chart'
import { MediaContext } from '@/providers/media-provider'

export const PaymentDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PaymentOverMonthType[]>([])
  const { isLargerThanMd } = useContext(MediaContext)
  const toast = useToast()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await PaymentService.findAllOverMonth()
      isLargerThanMd
        ? setData(response.data)
        : setData(response.data.splice(0, 2))
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
      minH="100vh"
      direction="column"
      backgroundColor="primary.gray.background"
      alignItems="center"
    >
      <Flex
        bg="white"
        w="full"
        p={{ base: 3, md: 6 }}
        shadow="md"
        mb={6}
        justifyContent="center"
      >
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
          w={{ base: '350px', md: '500px' }}
          // w={{ base: '350px', md: '500px' }}
          height="350px"
          bgColor="white"
          rounded="lg"
          shadow="md"
          ml={{ base: 0, md: 6 }}
        >
          <Text fontWeight="bold">Receitas e despesas ano/mês</Text>
          <NivoLineChart data={data || []} />
        </Flex>
      )}
    </Flex>
  )
}
