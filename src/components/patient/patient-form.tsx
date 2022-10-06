import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Progress,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PatientService } from '../../services/patient'
import { Patient } from '../../types/patient/patient-type'
import { FormikInput } from '../custom/formik'
import FormWrapper from '../wrapper/form-wrapper'

const initialValues: Patient = {
  id: '',
  name: '',
  birthDate: '',
  responsible: {
    name: '',
  },
}

const schema = yup.object().shape({
  name: yup.string().required(),
  birthDate: yup.date().required(),
  responsible: yup.object().required(),
})

export const PatientFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const [paymentType, setPaymentType] = useState<Patient>(initialValues)
  const route = useRouter()
  const { id } = route.query
  const toast = useToast()

  const fetchPaymentType = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        const response = await PatientService.findById(id)
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
    values: Patient,
    action: FormikHelpers<Patient>
  ) => {
    try {
      setLoading(true)
      const method = values.id ? 'update' : 'save'
      await PatientService.save(values, method)
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
