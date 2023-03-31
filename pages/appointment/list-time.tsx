import {
  formatToHourMinutes,
  ptBRMonths,
  simpleWeekdaysShortNames,
  weekdaysNames,
} from '@/utils/date'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Intervals {
  from: Date
  to: Date
}

export default function AppointmentList() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

  const defaultWidth = '1400px'
  const fixedBarHeight = '50px'
  const rowHeight = '100px'
  const hourHeight = 50

  function getIntervals() {
    const arr = []
    for (let i = 0; i < 24; i++) {
      const oClockTimes = new Date(year, month, day, i)
      const halfMinutesTimes = new Date(year, month, day, i, 30)
      arr.push({ from: oClockTimes, to: halfMinutesTimes })
    }

    return arr
  }

  function addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days)
    return date
  }

  function getDaysOnWeek() {
    const arr = []
    for (let i = 0; i <= 6; i++) {
      const date = addDays(new Date(), i)
      arr.push(date)
    }
    return arr
  }

  const [intervals, setIntervals] = useState<Intervals[]>(getIntervals())
  const [datesOnWeek, setDatesOnWeek] = useState<Date[]>(getDaysOnWeek())
  const [events, setEvents] = useState([
    {
      start: new Date(2023, 2, 30, 10, 0),
      end: new Date(2023, 2, 30, 10, 30),
      patient: 'Lucas',
      duration: 30,
    },
    {
      start: new Date(2023, 2, 31, 11, 30),
      end: new Date(2023, 2, 31, 12, 30),
      patient: 'Lucas',
      duration: 60,
    },
  ])

  const areSameDate = (first: Date, second: Date) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  }

  function isSameDate(first:Date, second: Date) {
    return first.getTime() === second.getTime()
  }

  // function getHourMinutes(date: Date) {
  //   return `${date.getHours().toString().padStart(2, '0')}:${date
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, '0')}`
  // }

  function getHoursAndMinutes(date: Date, hours: number, minutes: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  }

  return (
    <Stack pb={4} className="container" spacing={0}>
      <Flex
        direction="column"
        position="fixed"
        borderWidth="1px"
        borderColor="gray.300"
        w={defaultWidth}
        top="0"
        h={fixedBarHeight}
        bgColor="white"
        zIndex={1}
      >
        <Flex h="full">
          <Box w="60px">
            <Text></Text>
          </Box>
          {datesOnWeek.map((datesOnWeek) => {
            return (
              <Flex
                key={`header-${datesOnWeek.getDay()}`}
                borderLeftWidth="1px"
                borderLeftColor="gray.300"
                flex="1"
              >
                <Box alignSelf="center" w="full">
                  <Text textAlign="center">
                    {ptBRMonths[datesOnWeek.getMonth()]} {datesOnWeek.getDate()}{' '}
                    {simpleWeekdaysShortNames[datesOnWeek.getDay()]}
                  </Text>
                </Box>
              </Flex>
            )
          })}
        </Flex>
      </Flex>

      <Flex
        className="day-container"
        flex="1"
        w={defaultWidth}
        position="relative"
        top={fixedBarHeight}
        borderWidth="1px"
        borderColor="gray.300"
      >
        <Stack className="hour-indicator" w="60px" zIndex={-1}>
          <Flex direction="column" className="hour-container">
            {intervals.map((date, index) => {
              return (
                <Flex
                  key={index}
                  direction="column"
                  justifyContent="center"
                  h={rowHeight}
                  borderTopWidth="1px"
                  borderTopColor={index === 0 ? 'transparent' : 'gray.300'}
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    borderBottomStyle="dotted"
                    borderBottomWidth="1px"
                    borderBottomColor="gray.300"
                    h={`${hourHeight}px`}
                  >
                    <Text textAlign="center">
                      {formatToHourMinutes(date.from)}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    h={`${hourHeight}px`}
                  ></Flex>
                </Flex>
              )
            })}
          </Flex>
        </Stack>

        {datesOnWeek.map((dateOnWeek) => {
          return (
            <Stack
              key={`date-week-${dateOnWeek.getMilliseconds().toString()}`}
              flex="1"
              borderLeftWidth="1px"
              borderLeftColor="gray.300"
              bgColor="primary.gray.background"
              position="relative"
            >
              <Flex
                position="relative"
                direction="column"
                className="hour-event-container"
              >
                {intervals.map((date, index) => {
                  return (
                    <>
                      <Flex
                        key={date.from.getTime().toString()}
                        direction="column"
                        justifyContent="center"
                        borderTopWidth={'1px'}
                        borderTopColor={
                          index === 0 ? 'transparent' : 'gray.300'
                        }
                        h={rowHeight}
                      >
                        {events.map((event) => {
                          if (dateOnWeek.getDate() === 31 && date.from.getHours() === 12) {
                            // console.log(getHoursAndMinutes(dateOnWeek, date.from.getHours(), date.from.getMinutes()) >= event.start)
                            console.log(getHoursAndMinutes(dateOnWeek, date.from.getHours(), date.from.getMinutes()))
                            console.log(getHoursAndMinutes(dateOnWeek, date.from.getHours(), date.from.getMinutes()) < event.end)
                          }
                          if ( // 10:00 ~ 10:30 | 11:30 ~ 12:00 areSameDate(event.start, dateOnWeek)
                          ((getHoursAndMinutes(dateOnWeek, date.from.getHours(), date.from.getMinutes()) >= event.start &&
                          getHoursAndMinutes(dateOnWeek, date.from.getHours(), date.from.getMinutes()) < event.end )  || (
                            getHoursAndMinutes(dateOnWeek, date.to.getHours(), date.to.getMinutes()) >= event.start &&
                          getHoursAndMinutes(dateOnWeek, date.to.getHours(), date.to.getMinutes()) < event.end ))) {
                            return (
                              <Flex
                              key={event.start.getTime()}
                              h="50px"
                              bgColor="primary.blue.pure"
                            />
                            )
                          } else {
                            return (
<>
                              <Flex
                                key={date.from.getTime()}
                                justifyContent="center"
                                alignItems="center"
                                borderBottomStyle="dotted"
                                borderBottomWidth="1px"
                                borderBottomColor="gray.300"
                                h={`${hourHeight}px`}
                              >
                                <Button
                                  w="full"
                                  h="full"
                                  onClick={() => console.log('teste')}
                                  variant="unstyled"
                                  borderRadius="none"
                                  _hover={{
                                    margin: 0,
                                    padding: 0,
                                    borderRadius: 'none',
                                    backgroundColor: 'gray.400',
                                  }}
                                ></Button>
                              </Flex>
                            </>
                            )
                          }
                        }
                        )}
                      </Flex>
                    </>
                  )
                })}
              </Flex>
            </Stack>
          )
        })}
      </Flex>
    </Stack>
  )
}
