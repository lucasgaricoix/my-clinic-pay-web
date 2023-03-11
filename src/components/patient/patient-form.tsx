import {
  Button,
  Flex,
  Progress,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PatientService } from '../../services/patient'
import { PaymentTypeService } from '../../services/payment'
import { Option } from '../../types/common/common'
import { Patient } from '../../types/patient/patient-type'
import { PaymentType } from '../../types/payment'
import { toBRL } from '../../utils/format'
import { FormikInput } from '../custom/formik'
import { FormikCustomAutoCompleteDebounce } from '../custom/formik/formik-auto-complete-debounce'
import FormWrapper from '../wrapper/form-wrapper'

const initialValues: Patient = {
  id: '',
  name: '',
  birthDate: '',
  responsible: {
    name: '',
  },
  paymentType: {
    id: '',
    type: '',
    description: '',
    value: 0,
  },
}

const initialOptions: Option[] = [
  {
    value: '',
    label: '',
  },
]

const schema = yup.object().shape({
  name: yup.string().required(),
  birthDate: yup.date().required(),
  responsible: yup.object().required(),
})

export const PatientFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const [patient, setPatient] = useState<Patient>(initialValues)
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [paymentTypesOptions, setPaymentTypesOptions] =
    useState<Option[]>(initialOptions)
  const route = useRouter()
  const { id } = route.query
  const toast = useToast()

  const searchPaymentType = useCallback(
    async (param: string) => {
      try {
        setLoading(true)
        const response = await PaymentTypeService.search(param, 'income')
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
    },
    [toast]
  )

  const fetchPatient = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        const response = await PatientService.findById(id)
        setPatient(response.data)
        if (response.data.paymentType) {
          await searchPaymentType(response.data.paymentType.description)
        }
      } catch (error) {
        toast({
          title: 'Erro ao buscar o paciente',
          description: 'Não foi encontrado o paciente com o id informado :(',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    },
    [toast, searchPaymentType]
  )

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPatient(id as string)
    }
  }, [id, fetchPatient])

  function normalizePatient(data: Patient): Patient {
    const paymentTypeMatched = paymentTypes.find(
      (value) => value.id === data.paymentType.id
    )
    if (paymentTypeMatched) {
      return { ...data, paymentType: paymentTypeMatched }
    }
    return data
  }

  const handleSubmit = async (
    values: Patient,
    action: FormikHelpers<Patient>
  ) => {
    try {
      setLoading(true)
      const method = values.id ? 'update' : 'save'
      await PatientService.save(normalizePatient(values), method)
      toast({
        title: 'Sucesso',
        description: 'Dados salvos do paciente :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      action.resetForm()
      route.back()
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar o paciente',
        description: 'Não foi possível cadastrar o paciente :(',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
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
      {loading && <Progress size="xs" isIndeterminate />}
      <FormWrapper>
        <Stack divider={<StackDivider />} spacing={4}>
          <Text alignSelf="center" fontWeight="600" fontSize="20">
            Cadastro de paciente
          </Text>
          <Formik<Patient>
            initialValues={patient}
            onSubmit={handleSubmit}
            validationSchema={schema}
            enableReinitialize
          >
            {({ initialValues }) => (
              <Form>
                <Stack w={{ base: 'xs', md: 'md', lg: 'md' }} spacing={4}>
                  {initialValues.id && (
                    <FormikInput name="id" label="Id" isDisabled />
                  )}
                  <FormikInput
                    name="name"
                    label="Nome"
                    placeholder="Adicione o nome do paciente"
                    isRequired
                  />
                  <FormikInput
                    name="birthDate"
                    label="Data de nascimento"
                    type="date"
                    isRequired
                  />
                  <FormikInput
                    name="responsible.name"
                    label="Responsável"
                    placeholder="Adicione o nome do responsável"
                  />
                  <FormikCustomAutoCompleteDebounce
                    name="paymentType.id"
                    label="Tipo de receita"
                    placeholder="Clique para procurar o paciente"
                    items={paymentTypesOptions}
                    search={searchPaymentType}
                  />
                  <Button
                    type="submit"
                    w={{
                      base: 'xs',
                      md: 'md',
                      lg: 'md',
                    }}
                    my="4"
                    bg="primary.blue.pure"
                    textColor="white"
                    _hover={{ bg: 'primary.blue.pure', textColor: 'white' }}
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
