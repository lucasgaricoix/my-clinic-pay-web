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
} from '../../../types/appointment/appointment'
import { formatToHourMinutes, weekDaysNames } from '../../../utils/date'
import { formatMonthNames } from '../../../utils/format'
import { appointmentTypeColorPicker } from '../../appointment/appointment-colors'

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
  const [isoDateTime, setIsoDateTime] = useState<string>(
    currentDate.toISOString()
  )
  const [loading, setLoading] = useState(false)
  const { push, query } = useRouter()
  const toast = useToast()
  const { isLargerThanMd } = useContext(MediaContext)
  const userSession = useSelector((state: RootState) => state.userSession)
  const [appointment, setAppointment] = useState<AppointmentSchedule>()

  function getAvailableTimesInterval() {
    // TODO: buscar os horários
    const times: any[] = []
    const timesScheduled: any[] = []
    const startOfDay = 6
    const endOfDay = 23
    const isInterval = duration === 30

    appointment?.scheduled.forEach((value) => {
      timesScheduled.push({
        dateTime: new Date(value.at),
        patientName: value.patient.name,
        type: value.appointmentType,
        duration: value.duration
      })
    })

    for (let i = startOfDay; i < endOfDay; i++) {
      const dateCompare = new Date(year, month, day, i)
      const filter = timesScheduled.find(
        (value) =>
          value.dateTime.toLocaleString() == dateCompare.toLocaleString()
      )
      if (filter) {
        times.push({
          dateTime: filter.dateTime,
          patientName: filter.patientName,
          type: filter.type,
          duration: filter.duration
        })
      } else {
        times.push({
          dateTime: dateCompare,
          patientName: '',
          type: '',
          duration: 0,
        })

        if (isInterval) {
          times.push({
            dateTime: new Date(year, month, day, i, 30),
            patientName: '',
            type: '',
            duration: 0,
          })
        }
      }
    }

    return times
  }

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
      setIsoDateTime(dateTimeSelected.toISOString())
    },
    [day, month, year, onOpen]
  )

  const handleCancelSelect = () => {
    setIndexSelected(null)
    onCloseTime()
  }

  const fetchAppointment = async () => {
    try {
      setLoading(true)
      const data: Appointment = {
        patientId: query.patientId as string,
        userId: userSession.tenantId!,
        at: dateTime,
        duration,
        appointmentType: query.type as string,
        description: '',
      }
      await appointmentService.create(data)
      await push('/appointment')
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao tentar cadastrar o agendamento :(',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const getAppointments = async () => {
    try {
      setLoading(true)
      const date = isoDateTime.substring(0, 10)
      const response = await appointmentService.findAppointmentByUserAndDate(
        userSession.tenantId!,
        date
      )
      if (response.data) {
        setAppointment(response.data)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Erro ao buscar os agendamentos :(',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <Stack
      direction={['column']}
      w="full"
      bg="white"
      divider={<StackDivider />}
      overflow="auto"
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
            {weekDaysNames[date.getDay()]}
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
          {getAvailableTimesInterval().map((time, index) => (
            <Fragment key={time.dateTime.toLocaleString()}>
              {indexSelected !== index && (
                <Button
                  h="50px"
                  onClick={() => handleTimeSelect(time.dateTime, index)}
                  variant="outline"
                  borderColor="primary.blue.pure"
                  textColor={time.type ? 'gray.600' : "primary.blue.pure"}
                  bgColor={appointmentTypeColorPicker.find(value => value.type === time.type)?.color ?? 'white'}
                >
                  <HStack w="full" justifyContent="space-between">
                    <Text>{formatToHourMinutes(time.dateTime)}</Text>
                    {time.patientName && <Text>{time.patientName}</Text>}
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
                      {formatToHourMinutes(time.dateTime)}
                    </Button>
                    <Button
                      onClick={fetchAppointment}
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
