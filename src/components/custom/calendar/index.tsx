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

type Props = {
  year: number
  month: number
  currentYear: number
  currentMonth: number
  currentDay: number
  setYear: (value: number) => void
  setMonth: (value: number) => void
  handleSelectDay: (day: string) => void
}

const JANUARY = 0
const DEZEMBER = 11

export default function Calendar({
  year,
  month,
  currentYear,
  currentMonth,
  currentDay,
  setYear,
  setMonth,
  handleSelectDay,
}: Props) {
  const firstDayOfWeek = new Date(year, month, 1).getDay() // 6 (sábado/saturday)
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate() // 31

  function isWorkingDays(day: string) {
    const date = new Date(year, month, +day)
    const weekDay = date.getDay()

    if (month < currentMonth && year === currentYear) {
      return false
    }

    return +day > currentDay && ![0, 6].includes(weekDay)
  }

  const handleMonthBack = useCallback(
    (amount: number) => {
      if (month === JANUARY) {
        setYear(year - 1)
        setMonth(DEZEMBER)
        return
      }

      setMonth(month + amount)
    },
    [month, year, setMonth, setYear]
  )

  const handleMonthForward = useCallback(
    (amount: number) => {
      if (month === DEZEMBER) {
        setYear(year + 1)
        setMonth(JANUARY)
        return
      }

      setMonth(month + amount)
    },
    [month, year, setMonth, setYear]
  )

  return (
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
        isWorkingDays={isWorkingDays}
        handleSelectDay={handleSelectDay}
      />
    </VStack>
  )
}
