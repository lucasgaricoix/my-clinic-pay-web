import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { PatientService } from '../../services/patient'
import { Option, Patient } from '../../types/patient'
import { FormikSelect, FormikTextArea } from '../custom/formik'
import { FormikCustomAutoCompleteDebounce } from '../custom/formik/formik-auto-complete-debounce'
import { appointmentTypeColorPicker } from './appointment-colors'
import { appointmentStatus } from './appointment-status'

const selectOptions = [
  { label: '30 min', value: '30' },
  { label: '60 min', value: '60' },
]

type AppointmentType = {
  name: string
  type: string
}

type AppointmentPatientPicker = {
  person: Patient
  duration: number
  description: string
}

const initialValues: AppointmentPatientPicker = {
  person: {
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
      color: '',
    },
  },
  duration: 30,
  description: '',
}

const initialAppointmentTypeValues = {
  name: appointmentTypeColorPicker[0].name,
  type: appointmentTypeColorPicker[0].type,
  color: appointmentTypeColorPicker[0].color,
}

export default function AppointmentPatientPicker() {
  const [loading, setLoading] = useState(false)
  const [patientsOptions, setPatientsOptions] = useState<Option[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    initialAppointmentTypeValues
  )
  const toast = useToast()
  const { push } = useRouter()

  const handleSelect = useCallback((name: string, type: string) => {
    setAppointmentType({ name, type })
  }, [])

  const searchPatientByName = useCallback(
    async (param: string) => {
      if (param.length > 2) {
        setLoading(true)
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
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [toast]
  )

  const onSubmit = (
    values: AppointmentPatientPicker,
    actions: FormikHelpers<AppointmentPatientPicker>
  ) => {
    const patient = patients.find((patient) => patient.id === values.person.id)
    push({
      pathname: '/appointment/booking',
      query: {
        type: appointmentType.type,
        appointmentName: appointmentType.name,
        color: patient?.paymentType.color,
        patient: patient?.name,
        patientId: patient?.id,
        duration: values.duration,
        description: values.description,
      },
    })
    actions.resetForm()
  }

  return (
    <Stack
      direction="column"
      w="full"
      minH="100vh"
      bg="primary.gray.background"
      spacing={{
        base: 6,
        md: 12,
      }}
    >
      <Stack
        bg="white"
        direction="column"
        py={4}
        borderBottomWidth={1}
        borderBottomColor="gray.300"
        borderBottomRadius="xs"
        justifyContent="center"
        alignItems="center"
        shadow="md"
      >
        <Text fontWeight="bold">Agendamento</Text>
        {appointmentType && (
          <HStack>
            <Text fontSize="xs">{appointmentType.name}</Text>
            <Box w="18px" h="18px" borderRadius="50%" />
          </HStack>
        )}
      </Stack>
      <Stack
        w={{
          base: 'full',
          md: 'xl',
          lg: '2xl',
        }}
        h={{
          base: 'auto',
          md: 'auto',
        }}
        borderColor="gray.300"
        borderWidth={1}
        shadow="lg"
        alignSelf="center"
        direction="column"
        bg="white"
        p={{
          base: 4,
          md: 16,
        }}
      >
        <Flex
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="space-between"
        ></Flex>
        <Formik<AppointmentPatientPicker>
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({}) => (
            <Form autoComplete="off">
              <FormikCustomAutoCompleteDebounce
                name="person.id"
                label="Paciente"
                placeholder="Clique para procurar o paciente"
                items={patientsOptions}
                search={searchPatientByName}
                isLoading={loading}
              />
              <Box pb={2}>
              <FormikSelect
                name="appointmentType"
                label="Tipo da agenda"
                options={appointmentStatus}
              />
              </Box>
              <FormikSelect
                name="duration"
                label="Duração"
                options={selectOptions}
              />
              <Box pt={4}>
                <FormikTextArea
                  name="description"
                  label="Descrição"
                  placeholder="Observações do agendamento"
                />
              </Box>
              <Flex direction="column" pt={8} w="full">
                <Button
                  type="submit"
                  w="full"
                  bg="primary.blue.pure"
                  color="white"
                  borderRadius="3xl"
                  _hover={{
                    bg: 'primary.blue.pure',
                  }}
                >
                  Próximo
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  )
}
