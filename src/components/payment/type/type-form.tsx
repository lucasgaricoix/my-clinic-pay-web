import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Progress,
  Select,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment/payment-type'
import { FormikInput, FormikSelect } from '../../custom/formik'
import FormWrapper from '../../wrapper/form-wrapper'

const initialValues: PaymentType = {
  id: '',
  type: 'INCOME',
  description: '',
  value: 0.0,
}

const schema = yup.object().shape({
  type: yup.string().required(),
  description: yup.string().required(),
  value: yup.number().min(1).required(),
})

const types = [
  {
    label: 'Receita',
    value: 'INCOME',
  },
  {
    label: 'Despesa',
    value: 'EXPENSE',
  },
]

export const PaymentTypeFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const [paymentType, setPaymentType] = useState<PaymentType>(initialValues)
  const route = useRouter()
  const { id } = route.query
  const toast = useToast()

  const fetchPaymentType = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        const response = await PaymentTypeService.findById(id)
        setPaymentType(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao buscar o tipo de pagamento',
          description:
            'Não foi encontrado o tipo de pagamento com o id informado :(',
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

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPaymentType(id as string)
    }
  }, [id, fetchPaymentType])

  const handleSubmit = async (
    values: PaymentType,
    action: FormikHelpers<PaymentType>
  ) => {
    try {
      const method = values.id ? 'update' : 'save'
      await PaymentTypeService.save(values, method)
      toast({
        title: 'Sucesso',
        description: 'Dados salvos no servidor :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      action.resetForm()
      route.back()
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar no servidor :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      bg="primary.gray.background"
      direction="column"
      w="full"
      minH="100vh"
      justifyContent={{ base: 'flex-start', lg: 'center' }}
      alignItems="center"
    >
      <FormWrapper>
        <Stack divider={<StackDivider />} spacing={4}>
          <Text alignSelf="center" fontWeight="600" fontSize="20">
            Tipos de pagamentos
          </Text>
          {loading && <Progress size="xs" isIndeterminate />}
          <Formik<PaymentType>
            initialValues={paymentType}
            onSubmit={handleSubmit}
            validationSchema={schema}
            enableReinitialize
          >
            {({ initialValues, errors, touched }) => (
              <Form>
                <Stack w={{ base: 'xs', md: 'md', lg: 'md' }} spacing={4}>
                  {initialValues.id && (
                    <FormikInput name="id" label="Id" isDisabled />
                  )}
                  <FormikSelect name="type" label="Tipo" options={types} />
                  <FormikInput
                    name="description"
                    label="Descrição"
                    placeholder="Adicione uma descrição"
                  />
                  <FormikInput
                    name="value"
                    label="Valor"
                    type="number"
                    placeholder="Adicione um valor"
                  />
                  <Button
                    type="submit"
                    w={{
                      base: 'xs',
                      md: 'md',
                      lg: 'md'
                    }}
                    my="4"
                    bg="primary.blue.pure"
                    textColor="white"
                    _hover={{ bg: 'primary.blue.pure' }}
                    borderRadius="3xl"
                  >
                    Salvar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </FormWrapper>
    </Flex>
  )
}
