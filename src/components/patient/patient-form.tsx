import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Progress,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import { PatientService } from '../../services/patient'
import { Patient } from '../../types/patient/patient-type'
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
        <Text alignSelf="center" fontWeight="600" fontSize="20" py="2">
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
              <Stack spacing={4}>
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
                          focusBorderColor="primary.blue.pure"
                          {...field}
                        />
                        {errors.id && (
                          <FormErrorMessage>{errors.id}</FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  </Field>
                )}
                <Field name="name">
                  {({ field }: FieldProps<string>) => {
                    return (
                      <FormControl
                        isRequired
                        isInvalid={!!errors.name && !!touched.name}
                      >
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          focusBorderColor="primary.blue.pure"
                        />
                        {errors.name && (
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        )}
                      </FormControl>
                    )
                  }}
                </Field>
                <Field name="birthDate">
                  {({ field }: FieldProps<number>) => (
                    <FormControl
                      id="birthDate"
                      isRequired
                      isInvalid={!!errors.birthDate && !!touched.birthDate}
                    >
                      <FormLabel htmlFor="birthDate">
                        Data de nascimento
                      </FormLabel>
                      <Input
                        {...field}
                        id="birthDate"
                        type="date"
                        focusBorderColor="primary.blue.pure"
                      />
                      {errors.birthDate && (
                        <FormErrorMessage>{errors.birthDate}</FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="responsible.name">
                  {({ field }: FieldProps<number>) => (
                    <FormControl
                      id="responsible.name"
                      isRequired
                      isInvalid={
                        !!errors.responsible?.name &&
                        !!touched.responsible?.name
                      }
                    >
                      <FormLabel htmlFor="responsible.name">
                        Responsável
                      </FormLabel>
                      <Input
                        {...field}
                        id="responsible.name"
                        focusBorderColor="primary.blue.pure"
                      />
                      {errors.responsible?.name && (
                        <FormErrorMessage>
                          {errors.responsible.name}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  w="320px"
                  my="4"
                  bg="primary.blue.pure"
                  textColor="white"
                  _hover={{ bg: 'primary.blue.pure', textColor: 'white' }}
                >
                  Salvar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Flex>
  )
}
