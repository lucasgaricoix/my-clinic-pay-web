import {
  Box,
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment-type/payment-type'
import { CustomAlertDialog } from '../../custom/alert/alert-dialog'

const typeTranslation: Record<string, string> = {
  INCOME: 'Receita',
  EXPENSE: 'Despesa',
}

export const PaymentTypeComponent = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await PaymentTypeService.getAll()
      setPaymentTypes(response.data)
    } catch (error) {
      toast({
        title: 'Erro ao carregar os tipos de pagamento',
        description: 'Não funfou :(',
        status: 'error',
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

  const handleRemove = useCallback(async () => {
    try {
      setLoading(true)
      await PaymentTypeService.removeById(removeId)
      onClose()
      toast({
        title: 'Sucesso',
        description: 'Removido o tipo de pagamento :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      fetch()
    } catch (error) {
      toast({
        title: 'Erro ao remover o tipo de pagamento',
        description: 'Não funfou :(',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }, [removeId, onClose, toast, fetch])

  return (
    <Flex w="full" h="full" direction="column" p="4">
      <Text fontWeight="600" fontSize="lg" py="2">
        Tipos de pagamentos
      </Text>
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <Flex justifyContent="flex-end">
            <NextLink href="type/new" shallow passHref>
              <Button>Adicionar</Button>
            </NextLink>
          </Flex>
          <Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tipo</Th>
                  <Th>Descrição</Th>
                  <Th>Valor</Th>
                  <Th>Opçoes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentTypes.map((paymentType) => (
                  <Tr key={paymentType.id}>
                    <Td>{typeTranslation[paymentType.type]}</Td>
                    <Td>{paymentType.description}</Td>
                    <Td>{paymentType.value}</Td>
                    <Td>
                      <Box>
                        <NextLink href={`type/${paymentType.id}`}>
                          <Button mr="4">Editar</Button>
                        </NextLink>
                        <Button
                          onClick={() => {
                            setRemoveId(paymentType.id)
                            onOpen()
                          }}
                        >
                          Remover
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRemove}
        title="Remover tipo de pagamento"
        description="Deseja remover o tipo de pagamento?"
      />
    </Flex>
  )
}
