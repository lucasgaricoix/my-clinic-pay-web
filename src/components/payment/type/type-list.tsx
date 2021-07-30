import {
  Box,
  Button,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencil, IoTrash } from 'react-icons/io5'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment/payment-type'
import { toBRL } from '../../../utils/format'
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
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })

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
      <Flex direction="column" p="4">
        <Flex justifyContent="space-between">
          <Text fontWeight="600" fontSize="lg">
            Tipos de pagamentos
          </Text>
          <NextLink href="/payment/type/new" shallow passHref>
            <Button
              leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
              bg="primary.purple"
              textColor="white"
              _hover={{ bg: 'primary.darkpurple', textColor: 'white' }}
            >
              Adicionar
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
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
                    <Td>{toBRL(paymentType.value)}</Td>
                    <Td>
                      <Box>
                        <NextLink href={`/payment/type/${paymentType.id}`}>
                          <Button
                            size={size}
                            leftIcon={<Icon as={IoPencil} />}
                            mr="4"
                          >
                            Editar
                          </Button>
                        </NextLink>
                        <Button
                          size={size}
                          leftIcon={<Icon as={IoTrash} />}
                          onClick={() => {
                            setRemoveId(paymentType.id!)
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
