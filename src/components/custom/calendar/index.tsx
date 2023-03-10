import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { dateToBRMonth } from '../../../utils/format'
import CalendarDate from './date'

const JANUARY = 0
const DEZEMBER = 11

const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth()
const currentDay = date.getDate()

export default function useCalendar(onOpen: () => void) {  
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)

  const [selectedDate, setSelectedDate] = useState(date)
  const firstDayOfWeek = new Date(year, month, 1).getDay() // 6 (sábado/saturday)
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate() // 31

  function isWorkingDays(day: string) {
    const calendarDate = new Date(year, month, +day)
    const weekDay = calendarDate.getDay()
    const isWeekend = [0, 6].includes(weekDay)
    const isValidDate = calendarDate >= date

    return !isWeekend && isValidDate
  }

  const handleSelectDay = useCallback(
    (day: string) => {
      setSelectedDate(new Date(year, month, +day))
      onOpen()
    },
    [month, year, onOpen]
  )

  const handleMonthBack = useCallback(
    (amount: number) => {
      if (month === JANUARY) {
        setYear(year - 1)
        setMonth(DEZEMBER)
        setSelectedDate(new Date(year, DEZEMBER, 1))
        return
      }

      setMonth(month + amount)
      setSelectedDate(new Date(year, month + amount, 1))
    },
    [month, year, setMonth, setYear]
  )

  const handleMonthForward = useCallback(
    (amount: number) => {
      if (month === DEZEMBER) {
        setYear(year + 1)
        setMonth(JANUARY)
        setSelectedDate(new Date(year, JANUARY, 1))
        return
      }

      setMonth(month + amount)
      setSelectedDate(new Date(year, month + amount, 1))
    },
    [month, year, setMonth, setYear]
  )

  const Calendar = () => (
    <VStack spacing={4} direction="column">
      <HStack justifyContent="space-between" w="full">
        <Box>
          <Text textColor="gray.600">
            <span>{dateToBRMonth(month)}</span> <span>{year}</span>
          </Text>
        </Box>
        <Box>
          <Button
            variant="unstyled"
            onClick={() => handleMonthBack(-1)}
            bg="transparent"
          >
            <Icon color="gray.600" as={MdOutlineArrowBackIos} />
          </Button>
          <Button
            variant="unstyled"
            onClick={() => handleMonthForward(1)}
            bg="transparent"
          >
            <Icon color="gray.600" as={MdOutlineArrowForwardIos} />
          </Button>
        </Box>
      </HStack>

      <CalendarDate
        firstDayOfWeek={firstDayOfWeek}
        daysInCurrentMonth={daysInCurrentMonth}
        currentDay={currentDay}
        selectedDate={selectedDate}
        isWorkingDays={isWorkingDays}
        handleSelectDay={handleSelectDay}
      />
    </VStack>
  )

  return {
    Calendar,
    currentYear,
    currentMonth,
    currentDay,
    year,
    month,
    selectedDate,
  }
}
