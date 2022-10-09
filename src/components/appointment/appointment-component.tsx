import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { HiClock } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Calendar from '../custom/calendar'
import CalendarDay from '../custom/calendar/day'

type Props = {
  duration: number
}

export default function AppointmentComponent({duration = 30}: Props) {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  const currentDay = date.getDate()

  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)
  const [selectedDate, setSelectedDate] = useState(date)

  const userSession = useSelector((state: RootState) => state.userSession)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSelectDay = useCallback(
    (day: string) => {
      console.log(new Date(year, month, +day))
      setSelectedDate(new Date(year, month, +day))
      onOpen()
    },
    [month, year, onOpen]
  )

  return (
    <Flex minH="100vh" w="full">
      {isOpen ? (
        <CalendarDay date={selectedDate} duration={duration} onClose={onClose} />
      ) : (
        <Stack
          direction={['column', 'row']}
          divider={<StackDivider />}
          w={{ base: 'full' }}
        >
          <Flex
            p={8}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" textColor="gray.600">
              {userSession.name}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              Appointment Name
            </Text>
            <HStack alignSelf="flex-start" mt={6}>
              <Icon color="gray.500" as={HiClock} w="1.50rem" h="1.50rem" />
              <Text color="gray.500" fontWeight="bold">
                {30} min
              </Text>
            </HStack>
          </Flex>
          <VStack
            p={8}
            spacing={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold">Selecione uma Data</Text>

            <Calendar
              year={year}
              month={month}
              currentYear={currentYear}
              currentMonth={currentMonth}
              currentDay={currentDay}
              setYear={setYear}
              setMonth={setMonth}
              handleSelectDay={handleSelectDay}
            />
          </VStack>
        </Stack>
      )}
    </Flex>
  )
}
