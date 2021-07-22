import {
  Box,
  Button,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment-type/payment-type'

export const PaymentTypeComponent = () => {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])

  const fetch = useCallback(async () => {
    try {
      const response = await PaymentTypeService.getAll()
      setPaymentTypes(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Flex w="full" h="full" direction="column" p="4">
      <Text fontWeight="600" fontSize="lg" py="2">
        Tipos de pagamentos
      </Text>
      <Flex justifyContent="flex-end">
        <Link href="type/new">
          <Button>Adicionar</Button>
        </Link>
      </Flex>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Descrição</Th>
              <Th>Valor</Th>
              <Th>Opçoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paymentTypes.map((paymentType) => (
              <Tr key={paymentType.id}>
                <Td>{paymentType.description}</Td>
                <Td>{paymentType.value}</Td>
                <Td>
                  <Box>
                    <Button mr="4">Editar</Button>
                    <Button>Remover</Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}
