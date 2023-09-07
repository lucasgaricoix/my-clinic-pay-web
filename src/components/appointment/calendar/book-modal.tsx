import {
  FormikInput,
  FormikSelect,
  FormikTextArea,
} from '@/components/custom/formik'
import { FormikCustomAutoCompleteDebounce } from '@/components/custom/formik/formik-auto-complete-debounce'
import { PatientService } from '@/services/patient'
import { Appointment } from '@/types/appointment/appointment'
import { UserSession } from '@/types/auth/session'
import { Option } from '@/types/common/common'
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { appointmentStatus } from '../appointment-status'
import appointmentService from '@/services/appointment/appointment.service'
import { useRouter } from 'next/router'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  user: UserSession
  getAppointments: () => void
}

const selectOptions = [
  { label: '30 minutos', value: '30' },
  { label: '60 minutos', value: '60' },
]

export default function BookModal({
  isOpen,
  onClose,
  selectedDate,
  user,
  getAppointments,
}: Props) {
  const [isLoading, setLoading] = useState(false)
  const [patientsOptions, setPatientsOptions] = useState<Option[]>([])
  const toast = useToast()

  const initialValues: Appointment = {
    appointmentType: 'schedule',
    at: selectedDate.toISOString().substring(0, 16),
    duration: 30,
    patientId: '',
    userId: user.tenantId ?? '',
    description: '',
  }

  const onSubmit = useCallback(
    async (values: Appointment) => {
      try {
        setLoading(true)
        const data = {
          ...values,
          at: new Date(values.at).toISOString(),
        }
        const response = await appointmentService.create(data)
        if (response.status === 201) {
          onClose()
          getAppointments()
        }
      } catch (error) {
        console.log(error)
        toast({
          title: 'Erro ao criar o agendamento',
          description: 'Não foi possível cadastrar o agendamento',
          status: 'warning',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    },
    [onClose, toast, getAppointments]
  )

  const onSearch = useCallback(
    async (param: string) => {
      if (param.length > 2) {
        setLoading(true)
        PatientService.search(param)
          .then((response) => {
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
              duration: 3000,
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

  useEffect(() => {
    return () => setPatientsOptions([])
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent px={5} pb={5}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik<Appointment>
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {() => (
              <Form autoComplete="off">
                <Stack spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Cadastrar sessão
                  </Text>
                  <Flex direction="column">
                    <Text fontWeight="bold">Profissional da sessão</Text>
                    <Text>{user.name}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <FormikInput
                      name="at"
                      label="Data e hora"
                      type="datetime-local"
                      size="auto"
                    />
                  </Flex>
                  <FormikCustomAutoCompleteDebounce
                    name="patientId"
                    label="Paciente"
                    placeholder="Clique para procurar o paciente"
                    items={patientsOptions}
                    search={onSearch}
                    isLoading={isLoading}
                  />

                  <Flex justifyContent="space-between">
                    <Box w="45%">
                      <FormikSelect
                        name="appointmentType"
                        label="Tipo da agenda"
                        options={appointmentStatus}
                      />
                    </Box>
                    <Box w="45%">
                      <FormikSelect
                        name="duration"
                        label="Duração"
                        options={selectOptions}
                      />
                    </Box>
                  </Flex>
                  <FormikTextArea
                    name="description"
                    label="Descrição"
                    placeholder="Observações do agendamento"
                  />
                  <Flex direction="column" pt={4} w="full">
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      w="full"
                      bg="primary.blue.pure"
                      color="white"
                      borderRadius="3xl"
                      _hover={{
                        bg: 'primary.blue.pure',
                      }}
                    >
                      Cadastrar
                    </Button>
                  </Flex>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
