import { Flex, Progress, useDisclosure, useToast } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../../providers/media-provider'
import { IncomeService } from '../../../services/payment'
import { Income } from '../../../types/payment/income'
import { CustomAlertDialog } from '../../custom/alert/alert-dialog'
import { IncomeSelectGroup } from '../select-group'
import IncomeListTable from './income-list-table'
import IncomeListCard from './income-list-card'

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
  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)
  const { isLargerThanMd } = useContext(MediaContext)

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

  const handlePaymentButton = (id: string) => {
    setPaymentId(id)
    setIsPaymentOpen(true)
  }

  const handleRemoveButton = (id: string) => {
    setRemoveId(id)
    onOpen()
  }

  return (
    <Flex w="full" direction="column">
      {loading && <Progress size="xs" isIndeterminate />}

      <IncomeSelectGroup
        currentYear={currentYear}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      {isLargerThanMd ? (
        <IncomeListTable
          incomes={incomes}
          handlePaymentButton={handlePaymentButton}
          handleRemoveButton={handleRemoveButton}
        />
      ) : (
        <IncomeListCard
          incomes={incomes}
          handlePaymentButton={handlePaymentButton}
          handleRemoveButton={handleRemoveButton}
        />
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
