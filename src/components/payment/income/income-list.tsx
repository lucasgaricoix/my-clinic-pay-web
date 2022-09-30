import {
  Badge,
  Button,
  Flex,
  Icon,
  Progress,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { IoPencil, IoTrash } from 'react-icons/io5'
import { IncomeService } from '../../../services/payment'
import { Income } from '../../../types/payment/income'
import { toBRL } from '../../../utils/format'
import { CustomAlertDialog } from '../../custom/alert/alert-dialog'
import { IncomeSelectGroup } from '../select-group'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

export const IncomeList = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [incomes, setIncomes] = useState<Income[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })
  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await IncomeService.findAll(month, year)
      setIncomes(response.data)
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
  }, [month, year, toast])

  useEffect(() => {
    fetch()
  }, [fetch])

  const handleRemove = useCallback(async () => {
    try {
      setLoading(true)
      await IncomeService.deleteById(removeId)
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

  const handlePay = useCallback(async () => {
    {
      try {
        setLoading(true)
        await IncomeService.pay(paymentId)
        setIsPaymentOpen(false)
        setPaymentId('')
      } catch (error) {
        toast({
          title: 'Erro ao pagar a receita',
          description: 'Não funfou :(',
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } finally {
        fetch()
        setLoading(false)
      }
    }
  }, [paymentId, toast, fetch])

  return (
    <Flex w="full" direction="column">
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <IncomeSelectGroup
            currentYear={currentYear}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />

          <Table size={size}>
            <Thead>
              <Tr>
                <Th>Nº da sessão</Th>
                <Th>Nome</Th>
                <Th>Data</Th>
                <Th isNumeric>Valor</Th>
                <Th>Descrição</Th>
                <Th>Pago?</Th>
                <Th>Valor parcial?</Th>
                <Th>Opções</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incomes.map((income) => (
                <Tr key={income.id}>
                  <Td>{income.sessionNumber}</Td>
                  <Td>{income.person.name}</Td>
                  <Td>
                    {new Date(income.date).toLocaleDateString('pt', {
                      timeZone: 'UTC',
                    })}
                  </Td>
                  <Td isNumeric>{toBRL(income.paymentType.value)}</Td>
                  <Td>{income.description}</Td>
                  <Td>
                    <Badge
                      variant="subtle"
                      colorScheme={income.isPaid ? 'green' : 'red'}
                    >
                      {income.isPaid ? 'Sim' : 'Não'}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      variant="subtle"
                      colorScheme={income.isPartial ? 'green' : 'red'}
                    >
                      {income.isPartial ? 'Sim' : 'Não'}
                    </Badge>
                  </Td>
                  <Td>
                    <Stack direction="row">
                      <NextLink href="">
                        <Button
                          onClick={() => {
                            setPaymentId(income.id!)
                            setIsPaymentOpen(true)
                          }}
                          size={size}
                        >
                          Pagar
                        </Button>
                      </NextLink>
                      <NextLink href={`payment/income/${income.id}`}>
                        <Button size={size}>
                          <Icon as={IoPencil} />
                        </Button>
                      </NextLink>
                      <Button
                        size={size}
                        onClick={() => {
                          setRemoveId(income.id!)
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
        </>
      )}
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRemove}
        title="Remover receita"
        label="Remover"
        description="Deseja remover a receita?"
        colorScheme="red"
      />
      <CustomAlertDialog
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSubmit={handlePay}
        title="Confirmar pagamento"
        label="Pagar"
        description="Deseja confirmar o pagamento selecionado?"
        colorScheme="green"
      />
    </Flex>
  )
}
