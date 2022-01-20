import {
  Box,
  Button,
  Flex,
  Progress,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PatientService } from '../../../services/patient'
import { IncomeService, PaymentTypeService } from '../../../services/payment'
import { Patient } from '../../../types/patient'
import { Income, PaymentType } from '../../../types/payment'
import { toBRL } from '../../../utils/format'
import {
  FormikCheckbox,
  FormikCustomAutoComplete,
  FormikInput,
  FormikSwitch,
  FormikTextArea
} from '../../custom/formik'
import { FormikCustomAutoCompleteDebounce } from '../../custom/formik/formik-auto-complete-debounce'

const initialValues: Income = {
  id: '',
  sessionNumber: 1,
  date: '',
  paymentType: {
    id: '',
    description: '',
    type: '',
    value: 0,
  },
  isPaid: false,
  isPartial: false,
  isAbsence: false,
  description: '',
  person: {
    name: '',
    birthDate: '',
    responsible: {
      name: '',
    },
  },
}

const schema = yup.object().shape({
  date: yup.date().required(),
  paymentType: yup.object({
    id: yup.string().required(),
  }),
  description: yup.string().max(500),
  person: yup.object({
    id: yup.string().required(),
  }),
})

type Option = {
  value: string
  label: string
}

export const IncomeFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const [income, setIncome] = useState<Income>(initialValues)
  const [paymentTypesOptions, setPaymentTypesOptions] = useState<Option[]>([])
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [patientsOptions, setPatientsOptions] = useState<Option[]>([])
  const route = useRouter()
  const { id } = route.query
  const toast = useToast()

  const fetch = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        const response = await IncomeService.findById(id)
        setIncome(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao buscar a receita',
          description: 'Não foi encontrado a receita com o id informado :(',
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
      const response = await PaymentTypeService.search('*', 'income')
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

  const searchPatient = useCallback(
    (param: string) => {
      if (param.length > 2) {
        PatientService.search(param)
          .then((response) => {
            setPatients(response.data)
            const adapted = response.data.map((patient) => ({
              value: patient.id ?? '',
              label: patient.name,
            }))
            setPatientsOptions(adapted)
          })
          .catch(() => {
            toast({
              title: 'Erro ao buscar os pacientes',
              description: 'Se não conseguir encontrar, cadastre um novo :)',
              status: 'warning',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
            })
          })
      }
    },
    [toast]
  )

  useEffect(() => {
    if (id && id !== 'new') {
      fetch(id as string)
    }
  }, [id, fetch])

  useEffect(() => {
    searchPaymentType()
  }, [searchPaymentType])

  const handleSubmit = async (
    values: Income,
    action: FormikHelpers<Income>
  ) => {
    try {
      const method = values.id ? 'update' : 'save'
      const selectedPaymentType =
        paymentTypes.filter(
          (paymentType) => paymentType.id === values.paymentType.id
        ) ?? []

      const selectedPatient =
        patients.filter((patient) => patient.id === values.person.id) ?? []

      const newValues = {
        ...values,
        paymentType: selectedPaymentType.length
          ? selectedPaymentType[0]
          : initialValues.paymentType,
        person: selectedPatient.length
          ? selectedPatient[0]
          : initialValues.person,
      }
      await IncomeService.save(newValues, method)
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
        title: 'Erro ao buscar a receita',
        description: 'Não foi possível salvar o pagamento :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex direction="column" w="full" p="4" mb="4">
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <Text fontWeight="600" fontSize="20" py="2">
            Cadastro de receita
          </Text>
          <Formik<Income>
            initialValues={income}
            onSubmit={handleSubmit}
            validationSchema={schema}
            enableReinitialize
          >
            {({ initialValues, values }) => (
              <Form id="income-form">
                {initialValues.id && (
                  <FormikInput name="id" label="Id" isDisabled />
                )}
                <FormikCheckbox name="isPaid" label="Já pagou?" />
                <Stack direction="row" w={{ xl: 'sm' }}>
                  <FormikSwitch name="isPartial" label="Pagamento parcial?" />
                  {values.isPartial && (
                    <FormikCheckbox name="isAbsence" label="Ausência?" />
                  )}
                </Stack>
                <Box my="2" w={{ lg: '30%', xl: '25%' }}>
                  <FormikInput name="date" label="Data" type="date" />
                  <FormikInput name="sessionNumber" label="Número da sessão" />
                </Box>
                <FormikCustomAutoComplete
                  name="paymentType.id"
                  label="Tipo de receita"
                  items={paymentTypesOptions}
                />
                <FormikCustomAutoCompleteDebounce
                  name="person.id"
                  label="Paciente"
                  items={patientsOptions}
                  search={searchPatient}
                />
                <FormikTextArea name="description" label="Descrição" />

                <Button
                  type="submit"
                  w="320px"
                  my="4"
                  bg="primary.purple"
                  textColor="white"
                  _hover={{ bg: 'primary.darkpurple', textColor: 'white' }}
                >
                  Salvar
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Flex>
  )
}
