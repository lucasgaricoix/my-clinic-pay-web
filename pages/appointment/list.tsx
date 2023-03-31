import {
  formatToHourMinutes,
  simpleWeekdaysShortNames,
  weekdaysNames,
} from '@/utils/date'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Intervals {
  from: Date
  to: Date
}

export default function AppointmentList() {
  const hourNow = new Date().getHours()
  const minuteNow = new Date().getMinutes()

  const hourHeight = 50
  const hourMarginTop = 30

  const range = (): number[] => [...Array(24).keys()]

  const isSameDate = (first: Date, second: Date) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  }

  const addDays = (date: Date, days: number) => {
    const currentDate = new Date(date)

    return new Date(currentDate.setDate(currentDate.getDate() + days))
  }

  const getMonday = () => {
    const today = new Date()
    const first = today.getDate() - today.getDay() + 1
    return new Date(today.setDate(first))
  }

  const fromTop = (hour = hourNow, minutes = minuteNow) => {
    return hour * hourHeight + hourMarginTop + hourHeight / 2 + minutes / 2
  }

  const isToday = (index: number) => {
    return isSameDate(new Date(), addDays(mondayDate, index))
  }

  const [mondayDate, setMondayDate] = useState(getMonday())

  const nextWeek = () => setMondayDate(addDays(mondayDate, 7))
  const prevWeek = () => setMondayDate(addDays(mondayDate, -7))

  const [events, setEvents] = useState([
    {
      date: new Date(2023, 2, 30, 10, 0),
      patient: 'Lucas Garicoix',
      duration: 1,
    },
  ])

  return (
    <>
      <Flex justifyContent="space-around" my={6}>
        <div>today: {new Date().toDateString()}</div>
        <div>from: {mondayDate.toDateString()}</div>
        <div>to: {addDays(mondayDate, 6).toDateString()}</div>
        <Button onClick={nextWeek}>prev</Button>
        <Button onClick={prevWeek}>next</Button>
      </Flex>
      <Stack
        spacing={0}
        width="calc(100% - 30px)"
        border="1px solid"
        borderColor="gray.500"
        margin="15px"
        position="relative"
      >
        <Grid templateColumns="30px repeat(1, 1fr)">
          <Grid
            templateRows="repeat(24, 1fr)"
            justifyContent="center"
            _first={{ marginTop: hourMarginTop }}
          >
            {range().map((hour) => (
              <GridItem
                key={hour}
                height={`${hourHeight}px`}
                alignItems="center"
              >
                {hour}
              </GridItem>
            ))}
          </Grid>
          <Grid templateColumns="repeat(7, 1fr)">
            {simpleWeekdaysShortNames.map((day, index) => (
              <GridItem
                key={day}
                display="relative"
                border="1px solid"
                borderColor="gray.500"
                bgColor={isToday(index) ? 'gray.200' : 'transparent'}
              >
                <Box borderBottom="1px solid" borderBottomColor="gray.500">
                  {day}
                </Box>
                {events.map((event) => {
                  if (isSameDate(addDays(mondayDate, index), event.date)) {
                    return (
                      <Flex
                        key={event.patient}
                        m={'0 5px'}
                        p={2}
                        width="calc(100% - 10px)"
                        position="relative"
                        top={fromTop(
                          event.date.getHours(),
                          event.date.getMinutes()
                        )}
                        height={`${event.duration * hourHeight}px`}
                        bgColor="primary.blue.pure"
                        alignItems="center"
                        borderRadius="md"
                        color="white"
                        borderLeft="10px solid"
                        borderColor="#3b60e4"
                      >
                        {event.patient}
                      </Flex>
                    )
                  }
                })}
              </GridItem>
            ))}
          </Grid>
        </Grid>
        <Box
          position="absolute"
          width="100%"
          top={`${fromTop()}px`}
          border="1px dotted red"
        />
      </Stack>
    </>
  )
}
