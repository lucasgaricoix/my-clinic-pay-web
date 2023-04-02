import PatientPopover from '@/components/appointment/calendar/patient-popover'
import appointmentService from '@/services/appointment/appointment.service'
import { AppointmentSchedule } from '@/types/appointment/appointment'
import {
  addDays,
  getMonday,
  isSameDate,
  ptBRMonths,
  simpleWeekdaysShortNames,
} from '@/utils/date'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoAddCircleOutline,
} from 'react-icons/io5'

export default function AppointmentList() {
  //constants
  const hourHeight = 60

  // States
  const [mondayDate, setMondayDate] = useState(getMonday())
  const [isLoading, setIsLoading] = useState(false)
  const [appointments, setAppointments] = useState<AppointmentSchedule[]>([])

  // Hooks
  const toast = useToast()
  const { push } = useRouter()

  //functions
  const range = (): number[] => [...Array(24).keys()]
  const timeRange = (): number[] => [...Array(48).keys()]

  const fromTop = (hour: number, minutes: number) => {
    return hour * hourHeight + hourHeight / 2 + minutes
  }

  const fromTopTimeLine = () => {
    const hourNow = new Date().getHours()
    const minuteNow = new Date().getMinutes()
    return hourNow * hourHeight + 20 + hourHeight / 2 + minuteNow
  }

  const isToday = (index: number) => {
    return isSameDate(new Date(), addDays(mondayDate, index))
  }

  const nextWeek = () => setMondayDate(addDays(mondayDate, 7))
  const prevWeek = () => setMondayDate(addDays(mondayDate, -7))

  const getAppointments = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await appointmentService.findWeeklyAppointment(
        mondayDate.toISOString(),
        addDays(mondayDate, 7).toISOString()
      )
      if (response.data) {
        setAppointments(response.data)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Agendamentos',
        description: 'Nenhum agendamento encontrado',
        status: 'warning',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getAppointments()
  }, [])

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
    )
  }

  function getDateString(date: Date) {
    const month = ptBRMonths[date.getMonth()]
    return `${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${month} ${date.getFullYear()}`
  }

  return (
    <Stack p={4} spacing={4} bg="primary.gray.background">
      <Stack p={2} bg="white" borderRadius="lg" shadow="md">
        <HStack
          bg="white"
          justifyContent="space-between"
          width="calc(100% - 30px)"
        >
          <HStack justifyContent="start" alignItems="center" spacing={10}>
            <Button
              size={{
                base: 'sm',
                lg: 'md',
              }}
              onClick={() => setMondayDate(getMonday())}
              bg="primary.blue.pure"
              textColor="white"
              _hover={{
                bg: 'primary.blue.pure',
              }}
            >
              <Text>Hoje</Text>
            </Button>
            <HStack>
              <Button bg="white" onClick={prevWeek}>
                <Icon as={IoChevronBackOutline} />
              </Button>
              <Button bg="white" onClick={nextWeek}>
                <Icon as={IoChevronForwardOutline} />
              </Button>
            </HStack>
            <Flex>
              {getDateString(mondayDate)} -{' '}
              {getDateString(addDays(mondayDate, 6))}
            </Flex>
          </HStack>
          <Button
            size={{
              base: 'sm',
              lg: 'md',
            }}
            leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
            onClick={() => push('/appointment/patient/pick')}
            bg="primary.blue.pure"
            textColor="white"
            _hover={{
              bg: 'primary.blue.pure',
            }}
          >
            <Text>Adicionar</Text>
          </Button>
        </HStack>
        <Stack
          spacing={0}
          width="calc(100% - 30px)"
          border="1px solid"
          borderColor="gray.300"
          margin="15px"
          position="relative"
        >
          <Grid templateColumns="30px repeat(1, 1fr)">
            <Grid
              templateRows="repeat(24, 1fr)"
              justifyContent="center"
              _first={{
                marginTop: '49px',
                borderTop: '1px solid',
                borderTopColor: 'gray.300',
              }}
            >
              {range().map((hour) => (
                <GridItem
                  key={hour}
                  height={`${hourHeight}px`}
                  alignItems="center"
                >
                  <Text color="gray.700">{hour}</Text>
                </GridItem>
              ))}
            </Grid>
            <Grid templateColumns="repeat(7, 1fr)">
              {simpleWeekdaysShortNames.map((day, index) => (
                <GridItem
                  key={day}
                  display="relative"
                  border="1px solid"
                  borderColor="gray.300"
                >
                  <Flex
                    pl={2}
                    direction="column"
                    borderBottom="1px solid"
                    borderBottomColor="gray.300"
                  >
                    <Text
                      fontWeight={isToday(index) ? 'bold' : 'regular'}
                      color={isToday(index) ? 'primary.blue.pure' : 'gray.700'}
                    >
                      {day}
                    </Text>
                    <Text
                      fontWeight={isToday(index) ? 'bold' : 'regular'}
                      color={isToday(index) ? 'primary.blue.pure' : 'gray.700'}
                    >
                      {addDays(mondayDate, index).getDate()}
                    </Text>
                  </Flex>

                  <Grid
                    position="absolute"
                    width="calc(100% / 7 - 5px)"
                    templateRows="repeat(48, 1fr)"
                  >
                    {timeRange().map((time, index, arr) => {
                      if (arr.length - 1 === index) {
                        return null
                      }
                      if (time % 2) {
                        return (
                          <GridItem
                            w="full"
                            h={`${hourHeight / 2}px`}
                            borderBottom="1px solid"
                            borderColor="gray.300"
                            key={time}
                          >
                            <Button
                              w="full"
                              h="full"
                              variant="unstyled"
                              _hover={{
                                bgColor: 'gray.100',
                              }}
                            />
                          </GridItem>
                        )
                      } else {
                        return (
                          <GridItem
                            w="full"
                            h={hourHeight / 2}
                            borderBottom="1px dotted gray"
                            borderColor="gray.300"
                            key={`half-time-${time}`}
                          >
                            <Button
                              w="full"
                              h="full"
                              variant="unstyled"
                              _hover={{
                                bgColor: 'gray.100',
                              }}
                            />
                          </GridItem>
                        )
                      }
                    })}
                  </Grid>
                  {appointments.map((appointment) => {
                    return appointment.schedule.map((schedule) => {
                      let scheduleDate = new Date(schedule.start)
                      if (
                        isSameDate(addDays(mondayDate, index), scheduleDate)
                      ) {
                        return (
                          <Flex
                            key={schedule.start}
                            p={2}
                            position="relative"
                            top={`${fromTop(
                              scheduleDate.getHours(),
                              scheduleDate.getMinutes()
                            )}px`}
                            height={`${
                              (schedule.duration / 60) * hourHeight
                            }px`}
                            bgColor="primary.blue.pure"
                            alignItems="center"
                            borderRadius="md"
                            color="white"
                            borderLeft="10px solid"
                            borderColor="#3b60e4"
                            marginTop="-30px"
                            mr={1}
                          >
                            <PatientPopover
                              time={scheduleDate}
                              duration={schedule.duration}
                              patient={schedule.patient}
                            />
                          </Flex>
                        )
                      }
                    })
                  })}
                </GridItem>
              ))}
            </Grid>
          </Grid>
          <Box
            position="absolute"
            width="100%"
            top={`${fromTopTimeLine()}px`}
            border="1px dotted red"
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
