import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment-type/payment-type'

const initialValues: PaymentType = {
  id: '',
  type: 'income',
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
    name: 'INCOME',
    description: 'Receita',
  },
  {
    name: 'EXPENSE',
    description: 'Despesa',
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
    if (String(id) !== 'new') {
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
        title: 'Erro ao buscar o tipo de pagamento',
        description:
          'Não foi encontrado o tipo de pagamento com o id informado :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex direction="column" w="full" p="4" mb="4">
      {loading && <CircularProgress />}
      <Text fontWeight="600" fontSize="20" py="2">
        Tipos de pagamentos
      </Text>
      <Formik<PaymentType>
        initialValues={paymentType}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize
      >
        {({ initialValues, errors, touched }) => (
          <Form>
            {initialValues.id && (
              <Field name="id">
                {({ field }: FieldProps<string>) => (
                  <FormControl
                    isDisabled
                    isInvalid={!!errors.id && !!touched.id}
                  >
                    <FormLabel htmlFor="id">Id</FormLabel>
                    <Input
                      id="id"
                      placeholder="id"
                      contentEditable={false}
                      {...field}
                    />
                    {errors.id && (
                      <FormErrorMessage>{errors.id}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Field>
            )}
            <Field as="select" name="type">
              {({ field }: FieldProps<string>) => {
                return (
                  <FormControl
                    w="50%"
                    isRequired
                    isInvalid={!!errors.type && !!touched.type}
                  >
                    <FormLabel htmlFor="type">Tipo</FormLabel>
                    <Select {...field} id="type">
                      {types.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.description}
                        </option>
                      ))}
                    </Select>
                    {errors.type && (
                      <FormErrorMessage>{errors.type}</FormErrorMessage>
                    )}
                  </FormControl>
                )
              }}
            </Field>
            <Field name="description">
              {({ field }: FieldProps<string>) => {
                return (
                  <FormControl
                    isRequired
                    isInvalid={!!errors.description && !!touched.description}
                  >
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <Input {...field} id="description" />
                    {errors.description && (
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    )}
                  </FormControl>
                )
              }}
            </Field>
            <Field name="value">
              {({ field }: FieldProps<number>) => (
                <FormControl
                  id="value"
                  isRequired
                  isInvalid={!!errors.value && !!touched.value}
                >
                  <FormLabel htmlFor="value">Valor</FormLabel>
                  <Input {...field} id="value" />
                  {errors.value && (
                    <FormErrorMessage>{errors.value}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Button type="submit" w="320px" my="4">
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}
