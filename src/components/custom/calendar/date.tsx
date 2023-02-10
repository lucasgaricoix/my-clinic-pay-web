import { Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { getCalendarDays } from '../../../utils/date'
import { BsDot } from 'react-icons/bs'

type Props = {
  firstDayOfWeek: number
  daysInCurrentMonth: number
  currentDay: number
  selectedDate: Date
  isWorkingDays: (day: string) => boolean
  handleSelectDay: (day: string) => void
}

export default function CalendarDate({
  firstDayOfWeek,
  daysInCurrentMonth,
  currentDay,
  selectedDate,
  isWorkingDays,
  handleSelectDay,
}: Props) {
  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={2}>
      <Text fontSize="xs" color="gray.600">
        DOM
      </Text>
      <Text fontSize="xs" color="gray.600">
        SEG
      </Text>
      <Text fontSize="xs" color="gray.600">
        TER
      </Text>
      <Text fontSize="xs" color="gray.600">
        QUA
      </Text>
      <Text fontSize="xs" color="gray.600">
        QUI
      </Text>
      <Text fontSize="xs" color="gray.600">
        SEX
      </Text>
      <Text fontSize="xs" color="gray.600">
        SAB
      </Text>
      {getCalendarDays(firstDayOfWeek, daysInCurrentMonth).map((day) => (
        <GridItem justifyContent="center" alignItems="center" key={day}>
          {day.startsWith('0-') ? null : selectedDate.getDate() === +day ? (
            <Button
              onClick={() => handleSelectDay(day)}
              borderRadius="50%"
              w="40px"
              h="40px"
              fontWeight="bold"
              color="white"
              bg="primary.blue.pure"
              _hover={{
                bg: 'primary.blue.pure',
              }}
            >
              <Flex direction="column">{day}</Flex>
            </Button>
          ) : (
            <Button
              onClick={() => handleSelectDay(day)}
              borderRadius="50%"
              w="40px"
              h="40px"
              fontWeight={isWorkingDays(day) ? 'bold' : 'medium'}
              color={isWorkingDays(day) ? 'primary.blue.pure' : 'gray.500'}
              bg={isWorkingDays(day) ? 'primary.indigo.light' : 'transparent'}
            >
              <Flex direction="column">{day}</Flex>
            </Button>
          )}
        </GridItem>
      ))}
    </Grid>
  )
}
