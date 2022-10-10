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
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { HiClock } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Calendar from '../custom/calendar'
import CalendarDay from '../custom/calendar/day'

export default function AppointmentComponent() {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  const currentDay = date.getDate()

  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)
  const [selectedDate, setSelectedDate] = useState(date)
  const { query } = useRouter()

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
        <CalendarDay
          date={selectedDate}
          duration={+query.duration!}
          onClose={onClose}
        />
      ) : (
        <Stack
          direction={['column', 'row']}
          divider={<StackDivider />}
          w={{ base: 'full' }}
        >
          <Flex
            p={{ base: 4, lg: 8 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" textColor="gray.600" mb={2}>
              {userSession.name}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              {query.patient}
            </Text>
            <HStack mt={6} spacing={38}>
              <HStack>
                <Icon color="gray.500" as={HiClock} w="1.50rem" h="1.50rem" />
                <Text color="gray.500" fontWeight="bold">
                  {query.duration} min
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text fontSize="xs">{query.type}</Text>
                <Box w="18px" h="18px" borderRadius="50%" bg={query.color} />
              </HStack>
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
