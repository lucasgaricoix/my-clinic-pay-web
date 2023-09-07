import {
  Button,
  Flex,
  HStack,
  Progress,
  Text,
  useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { ExpenseService, PaymentTypeService } from '../../../services/payment'
import { Expense, PaymentType } from '../../../types/payment/'
import { toBRL } from '../../../utils/format'
import {
  FormikCustomAutoComplete,
  FormikInput,
  FormikTextArea
} from '../../custom/formik/'

const initialValues: Expense = {
  dueDate: '',
  paymentDate: '',
  paymentType: {
    id: '',
    description: '',
    type: '',
    value: 0,
    color: ''
  },
  description: '',
}

const schema = yup.object().shape({
  dueDate: yup.date().label('Data de vencimento').required(),
  paymentDate: yup.date().label('Data de pagamento').required(),
  paymentType: yup
    .object({
      id: yup.string().required(),
    })
    .label('Tipo de pagamento'),
  description: yup.string().label('Descrição').min(3).max(1000).required(),
})

type Option = {
  value: string
  label: string
}

export const ExpenseFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const [expense, setExpense] = useState<Expense>(initialValues)
  const [paymentTypesOptions, setPaymentTypesOptions] = useState<Option[]>([])
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const route = useRouter()
  const { id } = route.query
  const toast = useToast()

  const fetch = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        const response = await ExpenseService.findById(id)
        setExpense(response.data)
      } catch (error) {
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
    },
    [toast]
  )

  const searchPaymentType = useCallback(async () => {
    try {
      setLoading(true)
      const response = await PaymentTypeService.search('', 'expense')
      const adapted = response.data.map((paymentType) => ({
        value: paymentType.id,
        label: `${paymentType.description} - ${toBRL(paymentType.value)}`,
      }))
      setPaymentTypes(response.data)
      setPaymentTypesOptions(adapted)
    } catch {
      toast({
        title: 'Erro ao buscar o tipo de pagamento',
        description: 'Se não conseguir encontrar, cadastre um novo :)',
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
    if (id && id !== 'new') {
      fetch(id as string)
    }
  }, [id, fetch])

  useEffect(() => {
    searchPaymentType()
  }, [searchPaymentType])

  const handleSubmit = async (
    values: Expense,
    action: FormikHelpers<Expense>
  ) => {
    try {
      const method = values.id ? 'update' : 'save'
      const selectedPaymentType =
        paymentTypes.filter(
          (paymentType) => paymentType.id === values.paymentType.id
        ) ?? []

      const newValues: Expense = {
        ...values,
        paymentType: selectedPaymentType.length
          ? selectedPaymentType[0]
          : initialValues.paymentType,
      }
      await ExpenseService.save(newValues, method)
      toast({
        title: 'Sucesso',
        description: 'Dados alterados no servidor :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      action.resetForm()
      route.back()
    } catch (error) {
      toast({
        title: 'Erro ao buscar a despesa',
        description: 'Não foi possível salvar o pagamento :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex direction="column" w="full" mb="4">
      {loading && <Progress size="xs" isIndeterminate />}
      <Text fontWeight="600" fontSize="20" py="2">
        Cadastro de despesa
      </Text>
      <Formik<Expense>
        initialValues={expense}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {({ initialValues }) => (
          <Form id="expense-form">
            {initialValues.id && (
              <FormikInput name="id" label="Id" isDisabled />
            )}
            <HStack spacing={2}>
              <FormikInput
                name="dueDate"
                label="Data de vencimento"
                type="date"
              />
              <FormikInput
                name="paymentDate"
                label="Data de pagamento"
                type="date"
              />
            </HStack>
            <FormikCustomAutoComplete
              name="paymentType.id"
              label="Tipo de despesa"
              items={paymentTypesOptions}
            />
            <FormikTextArea name="description" label="Descrição" />
            <Button
              type="submit"
              w="320px"
              my="4"
              bg="primary.indigo.light"
              textColor="primary.indigo.dark"
              _hover={{ bg: 'primary.indigo.dark', textColor: 'white' }}
            >
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}
