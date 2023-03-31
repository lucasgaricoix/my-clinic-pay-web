import {
  formatToHourMinutes,
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
  const rowChildHeight = '50px'

  const [intervals, setIntervals] = useState<Intervals[]>([])
  const [datesOnWeek, setDatesOnWeek] = useState<Date[]>([])

  function getIntervals() {
    const arr = []
    for (let i = 0; i < 24; i++) {
      const oClockTimes = new Date(year, month, day, i)
      const halfMinutesTimes = new Date(year, month, day, i, 30)

      arr.push({
        from: oClockTimes,
        to: halfMinutesTimes,
      })
    }

    setIntervals(arr)
  }

  const addDays = (date: Date, days: number) => {
    date.setDate(date.getDate() + days)
    return date
  }

  function getDaysOnWeek() {
    const arr = []
    for (let i = 0; i <= 6; i++) {
      const date = addDays(new Date(), i)
      arr.push(date)
    }
    setDatesOnWeek(arr)
  }

  useEffect(() => {
    if (intervals.length === 0) {
      getIntervals()
    }
    if (datesOnWeek.length === 0) {
      getDaysOnWeek()
    }
  }, [])

  if (intervals.length === 0 && datesOnWeek.length === 0) {
    console.log('entrou')
  }
  

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio']

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
                <Box alignSelf="center" justifySelf="center" >
                  <Text textAlign="center">
                    {months[datesOnWeek.getMonth()]} {datesOnWeek.getDate()}{' '}
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
        // zIndex={-1}
        borderWidth="1px"
        borderColor="gray.300"
      >
        <Stack className="hour-indicator" w="60px" zIndex={-1}>
          <Flex direction="column" className="hour-container">
            {intervals.map((date, index) => {
              return (
                <Flex
                  key={date.from.getMilliseconds.toString()}
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
                    h={rowChildHeight}
                  >
                    <Text textAlign="center">
                      {formatToHourMinutes(date.from)}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    h={rowChildHeight}
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
              // zIndex={-1}
              bgColor="primary.gray.background"
            >
              <Flex direction="column" className="hour-event-container">
                {intervals.map((date, index) => {
                  return (
                    <>
                      {/* {index === 0 && <Flex h="30px">teste</Flex>} */}
                      <Flex
                        key={date.to.getMilliseconds().toString()}
                        direction="column"
                        justifyContent="center"
                        borderTopWidth={'1px'}
                        borderTopColor={
                          index === 0 ? 'transparent' : 'gray.300'
                        }
                        h={rowHeight}
                      >
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          borderBottomStyle="dotted"
                          borderBottomWidth="1px"
                          borderBottomColor="gray.300"
                          h={rowChildHeight}
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
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          h={rowChildHeight}
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
