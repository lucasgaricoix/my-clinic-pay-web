import appointmentService from '@/services/appointment/appointment.service'
import { RootState } from '@/store/store'
import {
  AppointmentSchedule,
  ScheduleTimes,
} from '@/types/appointment/appointment'
import {
  addDays,
  formatToHourMinutes,
  getAge,
  getDateString,
} from '@/utils/date'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  IoChevronBack,
  IoChevronForward,
  IoPinOutline,
  IoTimeOutline,
} from 'react-icons/io5'
import { scheduleTypeEnum } from '@/types/appointment/schedule'
import PencilSquare from '@/assets/svg/pencil-square'
import { useRouter } from 'next/router'
import Trash from '@/assets/svg/trash'
import { CustomAlertDialog } from '@/components/custom/alert/alert-dialog'
import Plus from '@/assets/svg/plus'

export default function AppointmentCalendarDay() {
  const currentDate = new Date()

  //states
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(currentDate)
  const [scheduleTimes, setScheduleTimes] = useState<ScheduleTimes[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scheduleId, setScheduleId] = useState('')
  const [appointmentId, setAppointmentId] = useState('')

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // hooks
  const userSession = useSelector((state: RootState) => state.userSession)
  const toast = useToast()
  const {push} = useRouter()

  const getAppointments = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await appointmentService.findAppointmentByUserAndDate(
        userSession.tenantId!,
        date.toISOString()
      )
      if (response.data) {
        setAppointmentId(response.data.id)
        getAvailableTimesInterval(response.data)
      }
    } catch (error) {
      console.log(error)
      getAvailableTimesInterval()
    } finally {
      setIsLoading(false)
    }
  }, [date])

  const removeSchedule = useCallback(async () => {
    try {
      console.log({ appointmentId })
      setIsLoading(true)
      const response = await appointmentService.deleteByIds(
        appointmentId,
        scheduleId
      )
      if (response.status === 200) {
        toast({
          title: 'Agendamento deletado',
          description: 'O agendamento do ${name} foi removido com sucesso.',
          status: 'info',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
      setIsLoading(false)
      getAppointments()
    }
  }, [onClose, toast, getAppointments, appointmentId])

  function handleRemoveSchedule(scheduleId: string) {
    setScheduleId(scheduleId)
    onOpen()
  }

  const getAvailableTimesInterval = (appointment?: AppointmentSchedule) => {
    const times: ScheduleTimes[] = []
    const startOfDay = 7
    const endOfDay = 22

    for (let i = startOfDay; i < endOfDay; i++) {
      const oClockTimes = new Date(year, month, day, i)
      const halfMinutesTimes = new Date(year, month, day, i, 30)

      const oClockFinded = appointment?.schedules.find((value) => {
        return (
          oClockTimes.getTime() >= new Date(value.start).getTime() &&
          oClockTimes.getTime() < new Date(value.end).getTime()
        )
      })

      const halfTimesFinded = appointment?.schedules.find((value) => {
        return (
          halfMinutesTimes.getTime() >= new Date(value.start).getTime() &&
          halfMinutesTimes.getTime() < new Date(value.end).getTime()
        )
      })

      if (!oClockFinded) {
        times.push({
          start: oClockTimes,
          end: oClockTimes,
          appointmentType: '',
          description: '',
          duration: 0,
        })
      }

      if (!halfTimesFinded) {
        times.push({
          start: halfMinutesTimes,
          end: halfMinutesTimes,
          appointmentType: '',
          description: '',
          duration: 0,
        })
      }
    }

    appointment?.schedules.forEach((value) => {
      times.push({
        id: value.id,
        start: new Date(value.start),
        end: new Date(value.end),
        appointmentType: value.appointmentType,
        description: value.description,
        duration: value.duration,
        patient: value.patient,
      })
    })

    times.sort((a, b) => a.start.getTime() - b.start.getTime())

    setScheduleTimes(times)
  }

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  return (
    <Stack p={4} w="full">
      <HStack pt={5} justifyContent="center" alignItems="center">
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="back-date"
          color="gray.600"
          icon={<IoChevronBack />}
          onClick={() => setDate(addDays(date, -1))}
        />
        <Text fontSize="sm" fontWeight="bold" color="gray.600">
          {getDateString(date)}
        </Text>
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="forward-date"
          color="gray.600"
          icon={<IoChevronForward />}
          onClick={() => setDate(addDays(date, +1))}
        />
      </HStack>
      <Accordion allowToggle>
        {scheduleTimes?.map((schedule) => {
          const patientName = schedule.patient?.name.split(' ') ?? ''
          const name = patientName[0]
          const lastName =
            patientName.length > 1 ? patientName[patientName.length - 1] : ''
          return (
            <AccordionItem key={schedule.start.toLocaleString()}>
              <AccordionButton w="full">
                <Stack w="full" spacing={4}>
                  <Flex>
                    {schedule.patient ? (
                      <Flex alignItems="center">
                        <Text>
                          {`${formatToHourMinutes(
                            schedule.start
                          )} - ${formatToHourMinutes(schedule.end)}`}
                        </Text>
                        <Box
                          ml={3}
                          w={4}
                          h={4}
                          borderRadius="full"
                          bg={schedule.patient.paymentType.color}
                        />
                      </Flex>
                    ) : (
                      <Text fontSize="sm">
                        {formatToHourMinutes(schedule.start)}
                      </Text>
                    )}
                  </Flex>
                  <Flex>
                    {schedule.patient && (
                      <Text fontWeight="bold">{`${name} ${lastName}`}</Text>
                    )}
                  </Flex>
                </Stack>
                {!!schedule.patient && <AccordionIcon />}
              </AccordionButton>
              {schedule.patient && (
                <AccordionPanel fontSize="md">
                  <Stack spacing={3}>
                    <Button variant="unstyled" fontWeight="regular">
                      <Flex color="primary.blue.pure">
                        <PencilSquare />
                        <Text>Editar o agendamento</Text>
                      </Flex>
                    </Button>
                    <Flex justifyContent="space-between">
                      <Flex>
                        <Icon as={IoTimeOutline} mr={4} />
                        <Text>{schedule.duration} min</Text>
                      </Flex>
                      <Flex>
                        <Icon as={IoPinOutline} mr={4} />
                        <Text>
                          {scheduleTypeEnum[schedule.appointmentType]}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex>
                      <Flex direction="column">
                        <Text fontWeight="bold">Idade</Text>
                        <Text>{getAge(schedule.patient.birthDate)} anos</Text>
                      </Flex>
                    </Flex>

                    <Flex direction="column">
                      <Text fontWeight="bold">Responsável</Text>
                      <Text>{schedule.patient.responsible.name}</Text>
                    </Flex>

                    {schedule.description && (
                      <Flex direction="column" mt={4}>
                        <Text fontWeight="bold">Descrição</Text>
                        <Text>{schedule.description}</Text>
                      </Flex>
                    )}
                    <Flex justifyContent="space-between">
                      <Box></Box>
                      <Button
                        variant="unstyled"
                        fontWeight="regular"
                        onClick={() => handleRemoveSchedule(schedule.id!)}
                      >
                        <Flex color="red">
                          <Trash />
                          <Text ml={1}>Remover</Text>
                        </Flex>
                      </Button>
                    </Flex>
                  </Stack>
                </AccordionPanel>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
      <IconButton
        bg="primary.blue.pure"
        color='white'
        aria-label="add-appointment"
        size="lg"
        borderRadius="full"
        position="fixed"
        right={5}
        bottom={5}
        icon={<Plus width={6} height={6} />}
        _hover={{
          background: 'primary.blue.pure'
        }}
        onClick={() => push("/appointment/patient/pick")}
      />
      <CustomAlertDialog
        title="Confirma remover o agendamento?"
        description="Remover a agenda"
        colorScheme="red"
        label="Sim"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={removeSchedule}
      />
    </Stack>
  )
}
