import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Icon,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { MediaContext } from '../../../providers/media-provider'
import appointmentService from '../../../services/appointment/appointment.service'
import { RootState } from '../../../store/store'
import {
  Appointment,
  AppointmentSchedule,
  ScheduleTimes,
} from '../../../types/appointment/appointment'
import { formatToHourMinutes, weekdaysNames } from '../../../utils/date'
import { formatMonthNames } from '../../../utils/format'
import { appointmentTypeColorPicker } from '../../appointment/appointment-colors'
import { Error } from '@/types/http/exception'

type Props = {
  date: Date
  duration: number
  onClose: () => void
}

export default function CalendarDay({ date, duration, onClose }: Props) {
  const currentDate = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const { isOpen, onOpen, onClose: onCloseTime } = useDisclosure()
  const [indexSelected, setIndexSelected] = useState<number | null>(null)
  const [dateTime, setDateTime] = useState<string>(currentDate.toLocaleString())
  const [loading, setLoading] = useState(false)
  const { push, query } = useRouter()
  const toast = useToast()
  const { isLargerThanMd } = useContext(MediaContext)
  const userSession = useSelector((state: RootState) => state.userSession)
  const [calendarTimes, setCalendarTimes] = useState<ScheduleTimes[]>([])

  const handleTimeSelect = useCallback(
    (date: Date, index: number) => {
      const dateTimeSelected = new Date(
        year,
        month,
        day,
        date.getHours(),
        date.getMinutes()
      )
      onOpen()
      setIndexSelected(index)
      setDateTime(dateTimeSelected.toISOString())
    },
    [day, month, year, onOpen]
  )

  const handleCancelSelect = () => {
    setIndexSelected(null)
    onCloseTime()
  }

  const createAppointment = async () => {
    try {
      setLoading(true)
      const data: Appointment = {
        patientId: query.patientId as string,
        userId: userSession.tenantId!,
        at: dateTime,
        duration,
        appointmentType: query.type as string,
        description: query.description as string,
      }
      await appointmentService.create(data)
      await push('/appointment')
    } catch (e) {
      const error = e as Error
      handleCancelSelect()
      getAppointments()
      toast({
        title: 'Erro ao tentar cadastrar o agendamento',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const getAppointments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await appointmentService.findAppointmentByUserAndDate(
        userSession.tenantId!,
        date.toISOString()
      )
      if (response.data) {
        getAvailableTimesInterval(response.data)
      }
    } catch (error) {
      console.log(error)
      getAvailableTimesInterval()
      toast({
        title: 'Agendamentos',
        description: 'Nenhum agendamento encontrado',
        status: 'warning',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }, [date, toast])

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

    setCalendarTimes(times)
  }

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  return (
    <Stack
      direction={['column']}
      w="full"
      bg="white"
      divider={<StackDivider />}
      overflow="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '0.5em',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px',
        },
      }}
    >
      <VStack justifyContent="center" alignItems="center" p={4}>
        {!isLargerThanMd && (
          <Button
            w="40px"
            h="40px"
            borderRadius="50%"
            borderColor="gray.300"
            borderWidth={1}
            bg="transparent"
            position="absolute"
            top="70px"
            left="15px"
            onClick={onClose}
          >
            <Icon
              color="primary.blue.pure"
              as={IoArrowBack}
              w="20px"
              h="20px"
            />
          </Button>
        )}
        <VStack>
          <Text fontSize="lg" fontWeight="bold">
            {weekdaysNames[date.getDay()]}
          </Text>
          <HStack>
            <Text>{day}</Text>
            <Text mr={1}>{formatMonthNames[month]},</Text>
            <Text>{year}</Text>
          </HStack>
        </VStack>
        <VStack>
          <Text fontWeight="bold">Time Zone</Text>
          <Text fontSize="xs">
            Brasília Time({currentDate.getHours()}:
            {currentDate.getMinutes().toString().padStart(2, '0')})
          </Text>
        </VStack>
      </VStack>
      <VStack justifyContent="center" alignItems="center" p={4}>
        <Text fontWeight="bold" fontSize="lg">
          Selecione um horário
        </Text>
        <Text fontSize="sm">Duração: {duration} min</Text>
        <Stack w="full">
          {calendarTimes?.map((schedule, index) => (
            <Fragment key={schedule.start.toLocaleString()}>
              {indexSelected !== index && (
                <Button
                  h="50px"
                  disabled={schedule.patient ? true : false}
                  onClick={() => handleTimeSelect(schedule.start, index)}
                  variant="outline"
                  borderColor="primary.blue.pure"
                  textColor={schedule.patient ? 'gray.800' : 'primary.blue.pure'}
                >
                  <HStack w="full" justifyContent="space-between">
                    <VStack>
                      {schedule.patient ? (
                        <Text>{`${formatToHourMinutes(
                          schedule.start
                        )} - ${formatToHourMinutes(schedule.end)}`}</Text>
                      ) : (
                        <Text>{formatToHourMinutes(schedule.start)}</Text>
                      )}
                    </VStack>
                    {schedule.patient && <Text>{schedule.patient.name}</Text>}
                    {schedule.patient?.paymentType && (
                      <HStack>
                        <Box
                          w="18px"
                          h="18px"
                          borderRadius="50%"
                          bg={query.color}
                        />
                        <Text>
                          {
                            appointmentTypeColorPicker.find(
                              (value) => value.type === schedule.appointmentType
                            )?.name
                          }
                        </Text>
                      </HStack>
                    )}
                  </HStack>
                </Button>
              )}
              {isOpen && indexSelected === index && (
                <Fade in={isOpen}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Button
                      w="48%"
                      h="50px"
                      bg="#666"
                      color="white"
                      onClick={handleCancelSelect}
                    >
                      {formatToHourMinutes(schedule.start)}
                    </Button>
                    <Button
                      onClick={createAppointment}
                      w="48%"
                      h="50px"
                      bg="primary.blue.pure"
                      color="white"
                    >
                      {loading ? <Spinner /> : <Text>Confirmar</Text>}
                    </Button>
                  </Flex>
                </Fade>
              )}
            </Fragment>
          ))}
        </Stack>
      </VStack>
    </Stack>
  )
}
