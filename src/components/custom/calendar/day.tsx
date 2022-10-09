import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Icon,
  ScaleFade,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
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

  function getAvailableTimesInterval() {
    const times = []
    const interval = []
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
      const split = time.split(':')
      console.log({
        split,
        date: new Date(year, month, day, +split[0], +split[1]),
      })
      onOpen()
      setIndexSelected(index)
      return new Date(year, month, day, +split[0], +split[1])
    },
    [day, month, onOpen, year]
  )

  const fetchAppointment = () => {}

  return (
    <Stack direction={['column', 'row']} w="full" divider={<StackDivider />}>
      <VStack justifyContent="center" alignItems="center" p={4}>
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
          <Icon color="primary.blue.pure" as={IoArrowBack} w="20px" h="20px" />
        </Button>
        <VStack>
          <Text fontSize="lg" fontWeight="bold">
            {weekDaysNames[day]}
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
            Brasília Time({currentDate.getHours()}:{currentDate.getMinutes()})
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
            <>
              {indexSelected !== index && (
                <Button
                  h="50px"
                  onClick={() => handleTimeSelect(time, index)}
                  key={time}
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
                      w="48%"
                      h="50px"
                      bg="primary.blue.pure"
                      color="white"
                    >
                      Confirmar
                    </Button>
                  </Flex>
                </Fade>
              )}
            </>
          ))}
        </Stack>
      </VStack>
    </Stack>
  )
}
