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
import { Fragment, useCallback, useContext, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { MediaContext } from '../../../providers/media-provider'
import appointmentService from '../../../services/appointment/appointment.service'
import { Appointment } from '../../../types/appointment/appointment'
import { weekDaysNames } from '../../../utils/date'
import { formatMonthNames } from '../../../utils/format'

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
  const { push } = useRouter()
  const toast = useToast()
  const { isLargerThanMd } = useContext(MediaContext)

  function getAvailableTimesInterval() {
    const times = []
    const startOfDay = 8
    const endOfDay = 24
    const isInterval = duration === 30

    for (let i = startOfDay; i < endOfDay; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`)
      if (isInterval) {
        times.push(`${i.toString().padStart(2, '0')}:${duration}`)
      }
    }
    return times
  }

  const handleTimeSelect = useCallback(
    (time: string, index: number) => {
      const [hour, minutes] = time.split(':')
      const dateTimeSelected = new Date(year, month, day, +hour, +minutes)
      onOpen()
      setIndexSelected(index)
      setDateTime(dateTimeSelected.toLocaleString())
    },
    [day, month, year, onOpen]
  )

  const fetchAppointment = async () => {
    try {
      setLoading(true)
      const data: Appointment = {
        dateTime: dateTime,
        duration,
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

  return (
    <Stack
      direction={['column']}
      w="full"
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
            top="25px"
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
            <Fragment key={time}>
              {indexSelected !== index && (
                <Button
                  h="50px"
                  onClick={() => handleTimeSelect(time, index)}
                  variant="outline"
                  borderColor="primary.blue.pure"
                  textColor="primary.blue.pure"
                >
                  {time}
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
                      onClick={onCloseTime}
                    >
                      {time}
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
