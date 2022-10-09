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
import { Form, Formik } from 'formik'
import { useCallback, useState } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { PatientService } from '../../services/patient'
import { Option, Patient } from '../../types/patient'
import { FormikSelect } from '../custom/formik'
import { FormikCustomAutoCompleteDebounce } from '../custom/formik/formik-auto-complete-debounce'

const appointmentTypeColorPicker = [
  { name: 'Vermelho', color: 'rgb(255, 79, 0)' },
  { name: 'Rosa', color: 'rgb(255, 117, 142)' },
  { name: 'Magenta', color: 'rgb(229, 92, 255)' },
  { name: 'Violeta', color: 'rgb(130, 71, 245)' },
  { name: 'Azul', color: 'rgb(0, 153, 255)' },
  { name: 'Ciano', color: 'rgb(10, 232, 240)' },
  { name: 'Verde Limão', color: 'rgb(23, 232, 133)' },
  { name: 'Verde', color: 'rgb(204, 240, 0)' },
  { name: 'Amarelo', color: 'rgb(248, 228, 54)' },
  { name: 'Laranja', color: 'rgb(255, 166, 0)' },
]
const initialValues = {
  patient: {
    id: '',
  },
  duration: 30,
}

const selectOptions = [
  { label: '30 min', value: '30' },
  { label: '60 min', value: '60' },
]

type AppointmentType = {
  name: string
  color: string
}

export default function AppointmentNamePicker() {
  const [loading, setLoading] = useState(false)
  const [patientsOptions, setPatientsOptions] = useState<Option[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointmentType, setAppointmentType] = useState<AppointmentType>()
  const toast = useToast()

  const handleColorPicker = useCallback((name: string, color: string) => {
    setAppointmentType({ name, color })
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

  const onSubmit = () => {}

  return (
    <Stack
      direction="column"
      w="full"
      minH="100vh"
      bg="primary.gray.background"
      spacing={6}
    >
      <Stack
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
      <Stack direction="column" bg="white" px={4}>
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
                  onClick={() => handleColorPicker(value.name, value.color)}
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({}) => (
            <Form>
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
            </Form>
          )}
        </Formik>
      </Stack>
      <Flex p={4} w="full">
        <Button
          w="full"
          bg="primary.blue.pure"
          color="white"
          borderRadius="3xl"
          justifySelf="flex-end"
        >
          Próximo
        </Button>
      </Flex>
    </Stack>
  )
}
