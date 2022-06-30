import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Progress,
  Select,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IncomeService } from '../../../services/payment'
import { IncomeByPatient } from '../../../types/payment/income-by-patient'
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
  { name: 12, label: 'Dezembro' },
]

const currentMonth = new Date().getMonth()

export const IncomeByPatientList = () => {
  const [loading, setLoading] = useState(false)
  const [incomes, setIncomes] = useState<IncomeByPatient[]>([])
  const [paymentId, setPaymentId] = useState('')
  const toast = useToast()
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })
  const [search, setSearch] = useState<number>(currentMonth)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await IncomeService.findAllByPatient(search)
      setIncomes(response.data)
    } catch (error) {
      console.log(error)
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

  const handlePay = useCallback(async () => {
    {
      try {
        setLoading(true)
        await IncomeService.pay(paymentId)
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
        onClose()
        setPaymentId('')
        fetch()
        setLoading(false)
      }
    }
  }, [paymentId, onClose, toast, fetch])

  const totalIncome = incomes
    .flatMap((income) => income.values)
    .map((value) => value.paymentType.value)
    .reduce((acc, curr) => acc + curr, 0)

  const totalPaid = incomes
    .flatMap((income) => income.values)
    .filter((f) => f.isPaid)
    .map((value) => value.paymentType.value)
    .reduce((acc, curr) => acc + curr, 0)

  const getVariation = () => {
    if (totalPaid > 0 || totalIncome > 0) {
      return (totalPaid / totalIncome) * 100
    }
    return 0
  }

  return (
    <Box w="full">
      {loading ? (
        <Progress w="full" size="xs" isIndeterminate />
      ) : (
        <Box w="full">
          <StatGroup pb={4}>
            <Stat>
              <StatLabel>Valor Bruto</StatLabel>
              <StatNumber>{toBRL(totalIncome)}</StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Valor Líquido</StatLabel>
              <StatNumber>{toBRL(totalPaid)}</StatNumber>
              <StatHelpText>
                {`Variação ${getVariation().toFixed(2)}%`}{' '}
              </StatHelpText>
            </Stat>
          </StatGroup>

          <Flex justifyContent="space-between" pb="4">
            <Select
              value={search}
              onChange={(event) => setSearch(+event.target.value)}
              w="sm"
              pr={2}
            >
              {months.map((month) => (
                <option key={month.name} value={month.name}>
                  {month.label}
                </option>
              ))}
            </Select>
            <Box>
              <NextLink href="/payment/income/new" shallow passHref>
                <Button
                  leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
                  bg="primary.indigo.light"
                  textColor="primary.indigo.dark"
                  _hover={{
                    bg: 'primary.indigo.dark',
                    textColor: 'primary.indigo.light',
                  }}
                >
                  Adicionar
                </Button>
              </NextLink>
            </Box>
          </Flex>

          <Box>
            <Accordion allowMultiple>
              {incomes.map((income) => (
                <AccordionItem key={income.name}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {income.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Table variant="simple" size={size}>
                      <Thead>
                        <Tr>
                          <Th>Nº da sessão</Th>
                          <Th>Data</Th>
                          <Th>Pago?</Th>
                          <Th>Parcial?</Th>
                          <Th></Th>
                          <Th isNumeric>Valor</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {income.values.map((value) => (
                          <Tr key={value.id}>
                            <Td>{value.sessionNumber}</Td>
                            <Td>
                              {new Date(value.date).toLocaleDateString('pt', {
                                timeZone: 'UTC',
                              })}
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={value.isPaid ? 'green' : 'red'}
                              >
                                {value.isPaid ? 'Sim' : 'Não'}
                              </Badge>
                            </Td>
                            <Td>
                              <Badge
                                variant="subtle"
                                colorScheme={value.isPartial ? 'green' : 'red'}
                              >
                                {value.isPartial ? 'Sim' : 'Não'}
                              </Badge>
                            </Td>
                            <Td>
                              {!value.isPaid && (
                                <Button
                                  onClick={() => {
                                    setPaymentId(value.id!)
                                    onOpen()
                                  }}
                                  size={size}
                                >
                                  Pagar
                                </Button>
                              )}
                            </Td>
                            <Td isNumeric>{toBRL(value.paymentType.value)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>Total</Th>
                          <Th />
                          <Th />
                          <Th />
                          <Th />
                          <Th isNumeric>
                            {toBRL(
                              income.values
                                .map((value) => value.paymentType.value)
                                .reduce((acc, curr) => acc + curr, 0)
                            )}
                          </Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Box>
      )}
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handlePay}
        title="Confirmar pagamento"
        label="Pagar"
        description="Deseja confirmar o pagamento selecionado?"
        colorScheme="green"
      />
    </Box>
  )
}
