import {
  Box,
  Button,
  Flex,
  Icon,
  Progress,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import { ExpenseService } from '../../../services/payment'
import { Expense } from '../../../types/payment/expense'
import { toBRL } from '../../../utils/format'
import { CustomAlertDialog } from '../../custom/alert/alert-dialog'

const months = [
  { name: 1, label: 'Janeiro' },
  { name: 2, label: 'Fevereiro' },
  { name: 3, label: 'Março' },
  { name: 4, label: 'Abril' },
  { name: 5, label: 'Maio' },
  { name: 6, label: 'Junho' },
  { name: 7, label: 'Julho' },
  { name: 8, label: 'Agosto' },
  { name: 9, label: 'Setembro' },
  { name: 10, label: 'Outubro' },
  { name: 11, label: 'Novembro' },
  { name: 12, label: 'Dezember' },
]

const currentMonth = new Date().getMonth()

export const ExpenseList = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })
  const [search, setSearch] = useState<number>(currentMonth)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await ExpenseService.findAll(search)
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
  }, [search, toast])

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
    <Flex w="full" h="full" direction="column" overflow="auto">
      {loading && <Progress size="xs" isIndeterminate />}
      <Flex justifyContent="space-between" pb="4">
        <Select
          w="sm"
          size={{
            base: 'sm',
            lg: 'md',
            sm: 'sm',
          }}
          mr={1}
          value={search}
          borderRadius={4}
          onChange={(event) => setSearch(+event.target.value)}
        >
          {months.map((month) => (
            <option key={month.name} value={month.name}>
              {month.label}
            </option>
          ))}
        </Select>
        <Box>
          <NextLink href="/payment/expense/new" shallow passHref>
            <Button
              size={{
                base: 'sm',
                lg: 'md',
                sm: 'sm',
              }}
              leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
              bg="primary.blue.pure"
              textColor="white"
              _hover={{
                bg: 'primary.blue.pure',
              }}
            >
              Adicionar
            </Button>
          </NextLink>
        </Box>
      </Flex>

      <TableContainer>
        <Table size={size}>
          <Thead>
            <Tr>
              <Th>Data de vencimento</Th>
              <Th>Data de pagamento</Th>
              <Th isNumeric>Valor</Th>
              <Th>Descrição</Th>
              <Th>Opções</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>
                  {new Date(expense.dueDate).toLocaleDateString('pt', {
                    timeZone: 'UTC',
                  })}
                </Td>
                <Td>
                  {expense.paymentDate
                    ? new Date(expense.paymentDate).toLocaleDateString('pt', {
                        timeZone: 'UTC',
                      })
                    : ''}
                </Td>
                <Td isNumeric>{toBRL(expense.paymentType.value)}</Td>
                <Td>{expense.description}</Td>
                <Td>
                  <Stack direction="row">
                    <NextLink href={`payment/expense/${expense.id}`}>
                      <Button size={size}>
                        <Icon as={IoPencil} />
                      </Button>
                    </NextLink>
                    <Button
                      size={size}
                      onClick={() => {
                        setRemoveId(expense.id!)
                        onOpen()
                      }}
                    >
                      <Icon as={IoTrash} />
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRemove}
        title="Remover despesa"
        label="Remover"
        description="Deseja remover a despesa?"
        colorScheme="red"
      />
    </Flex>
  )
}
