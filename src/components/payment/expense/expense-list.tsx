import {
  Box,
  Button,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencil, IoTrash } from 'react-icons/io5'
import { ExpenseService } from '../../../services/payment'
import { Expense } from '../../../types/payment/expense'
import { toBRL } from '../../../utils/format'
import { CustomAlertDialog } from '../../custom/alert/alert-dialog'

export const ExpenseList = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await ExpenseService.findAll()
      setExpenses(response.data)
    } catch (error) {
      toast({
        title: 'Erro ao carregar as receitas',
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
      await ExpenseService.deleteById(removeId)
      onClose()
      toast({
        title: 'Sucesso',
        description: 'Removido a receita :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      fetch()
    } catch (error) {
      toast({
        title: 'Erro ao remover a receita',
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
      <Flex justifyContent="flex-end">
        <NextLink href="/payment/expense/new" shallow passHref>
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
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>Data de vencimento</Th>
                  <Th>Data de pagamento</Th>
                  <Th>Valor</Th>
                  <Th>Descrição</Th>
                  <Th>Opções</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenses.map((expense) => (
                  <Tr key={expense.id}>
                    <Td>
                      {new Date(expense.dueDate).toLocaleDateString('pt')}
                    </Td>
                    <Td>
                      {expense.paymentDate
                        ? new Date(expense.paymentDate).toLocaleDateString('pt')
                        : ''}
                    </Td>
                    <Td>{toBRL(expense.paymentType.value)}</Td>
                    <Td>{expense.description}</Td>
                    <Td>
                      <Box>
                        <NextLink href={`payment/expense/${expense.id}`}>
                          <Button leftIcon={<Icon as={IoPencil} />} mr="4">
                            Editar
                          </Button>
                        </NextLink>
                        <Button
                          leftIcon={<Icon as={IoTrash} />}
                          onClick={() => {
                            setRemoveId(expense.id!)
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
        title="Remover despesa"
        description="Deseja remover a despesa?"
      />
    </Flex>
  )
}