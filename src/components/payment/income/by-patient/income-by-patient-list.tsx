import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Progress,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../../../providers/media-provider'
import { IncomeService } from '../../../../services/payment'
import { IncomeByPatient } from '../../../../types/payment/income-by-patient'
import { toBRL } from '../../../../utils/format'
import { CustomAlertDialog } from '../../../custom/alert/alert-dialog'
import { IncomeSelectGroup } from '../../select-group'
import IncomeByPatientCard from './income-by-patient-card'
import IncomeByPatientTable from './income-by-patient-table'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

export const IncomeByPatientList = () => {
  const [loading, setLoading] = useState(false)
  const [incomes, setIncomes] = useState<IncomeByPatient[]>([])
  const [paymentId, setPaymentId] = useState('')
  const toast = useToast()
  const { isLargerThanMd } = useContext(MediaContext)

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await IncomeService.findAllByPatient(month, year)
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

  const handlePaymentButton = (value: string) => {
    setPaymentId(value)
    onOpen()
  }

  return (
    <Box w="full">
      {loading ? (
        <Progress w="full" size="xs" isIndeterminate />
      ) : (
        <Flex w="full" direction="column">
          <StatGroup pb={1}>
            <Stat>
              <StatLabel>Valor Bruto</StatLabel>
              <StatNumber>{toBRL(totalIncome)}</StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Valor Líquido</StatLabel>
              <StatNumber>{toBRL(totalPaid)}</StatNumber>
              <StatHelpText>
                {`Variação ${getVariation().toFixed(2)}%`}
              </StatHelpText>
            </Stat>
          </StatGroup>

          <IncomeSelectGroup
            currentYear={currentYear}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />

          <Box>
            <Accordion allowMultiple>
              {incomes.map((incomeByPatient) => (
                <AccordionItem key={incomeByPatient.name}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {incomeByPatient.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {isLargerThanMd ? (
                      <IncomeByPatientTable
                        key={incomeByPatient.name}
                        income={incomeByPatient}
                        handlePaymentButton={handlePaymentButton}
                      />
                    ) : (
                      <IncomeByPatientCard
                        key={incomeByPatient.name}
                        incomeByPatient={incomeByPatient}
                        handlePaymentButton={handlePaymentButton}
                      />
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
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
