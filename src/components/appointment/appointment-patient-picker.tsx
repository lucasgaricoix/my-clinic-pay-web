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
  VStack,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { PatientService } from '../../services/patient'
import { Option, Patient } from '../../types/patient'
import { FormikSelect } from '../custom/formik'
import { FormikCustomAutoCompleteDebounce } from '../custom/formik/formik-auto-complete-debounce'
import { appointmentTypeColorPicker } from './appointment-colors'

const selectOptions = [
  { label: '30 min', value: '30' },
  { label: '60 min', value: '60' },
]

type AppointmentType = {
  name: string
  type: string
  color: string
}

type AppointmentPatientPicker = {
  person: Patient
  duration: number
}

const initialValues: AppointmentPatientPicker = {
  person: {
    id: '',
    name: '',
    birthDate: '',
    responsible: {
      name: '',
    },
  },
  duration: 30,
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

  const handleColorPicker = useCallback((name: string, type: string, color: string) => {
    setAppointmentType({ name, type, color })
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
    push(
      `/appointment/booking?type=${appointmentType.type}&appointmentName=${appointmentType.name}&color=${appointmentType.color}&patient=${patient?.name}&patientId=${patient?.id}&duration=${values.duration}`
    )
    actions.resetForm()
  }

  return (
    <Stack
      direction="column"
      w='full'
      minH="100vh"
      bg="primary.gray.background"
      spacing={{
        base: 6,
        md: 12
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
            <Box
              w="18px"
              h="18px"
              borderRadius="50%"
              bg={appointmentType.color}
            />
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
          md: 'lg',
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
        <Text fontWeight="bold">Qual o tipo da agenda</Text>
        <Flex
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="space-between"
        >
          {appointmentTypeColorPicker.map((value) => (
            <Flex mr={2} mb={2} key={value.name}>
              <Tooltip hasArrow label={value.name}>
                <Button
                  onClick={() => handleColorPicker(value.name, value.type, value.color)}
                  size="sm"
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  borderWidth={0}
                  bgColor={value.color}
                >
                  {appointmentType?.name === value.name && (
                    <Icon as={ImCheckmark} w="18px" h="18px" color="white" />
                  )}
                </Button>
              </Tooltip>
            </Flex>
          ))}
        </Flex>
        <Formik<AppointmentPatientPicker>
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({}) => (
            <Form autoComplete='off'>
              <FormikCustomAutoCompleteDebounce
                name="person.id"
                label="Paciente"
                placeholder="Clique para procurar o paciente"
                items={patientsOptions}
                search={searchPatientByName}
                isLoading={loading}
              />
              <FormikSelect
                name="duration"
                label="Duração"
                options={selectOptions}
              />
              <Flex py={8} w="full">
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
