import PatientPopover from '@/components/appointment/calendar/patient-popover'
import appointmentService from '@/services/appointment/appointment.service'
import { AppointmentSchedule } from '@/types/appointment/appointment'
import {
  addDays,
  getDateString,
  getMonday,
  isSameDate,
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
  useBoolean,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoAddCircleOutline,
} from 'react-icons/io5'
import BookModal from './book-modal'

export default function AppointmentCalendarComponent() {
  //constants
  const hourHeight = 60
  const marginTop = 48
  const date = new Date()

  // States
  const [mondayDate, setMondayDate] = useState(getMonday())
  const [isLoading, setIsLoading] = useState(false)
  const [appointments, setAppointments] = useState<AppointmentSchedule[]>([])

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()

  // Hooks
  const { push } = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  //functions
  const range = (): number[] => {
    let twelveHours = [...Array(13).keys()]
    for (let i = 1; i < 12; i++) {
      twelveHours.push(i)
    }
    return twelveHours
  }
  const timeRange = (): number[] => [...Array(48).keys()]

  const fromTop = (hour: number, minutes: number) => {
    return hour * hourHeight + marginTop + hourHeight / 2 + minutes - 30
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
        addDays(mondayDate, -1).toISOString(),
        addDays(mondayDate, 7).toISOString()
      )
      if (response.data) {
        setAppointments(response.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [mondayDate])

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  const removeSchedule = useCallback(
    async (id: string, scheduleId: string) => {
      try {
        setIsLoading(true)
        const response = await appointmentService.deleteByIds(id, scheduleId)
        if (response.status === 200) {
          toast({
            title: 'Agendamento deletado',
            description: 'O agendamento do ${name} foi removido com sucesso.',
            status: 'info',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        onClose()
        setIsLoading(false)
        getAppointments()
      }
    },
    [onClose, toast, getAppointments]
  )

  return (
    <Stack p={4} spacing={4} bg="primary.gray.background">
      {isLoading && (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      )}
      <Stack p={4} bg="white" borderRadius="lg" shadow="md">
        <HStack bg="white" justifyContent="space-between" width="full">
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
          width="calc(100%)"
          borderLeft="1px solid"
          borderColor="gray.300"
          margin="15px"
          position="relative"
        >
          <Grid
            templateColumns="40px repeat(1, 1fr)"
            borderTop="1px solid"
            borderColor="gray.300"
          >
            <Grid
              templateRows="repeat(24, 1fr)"
              justifyContent="center"
              _first={{
                marginTop: `${marginTop - 1}px`,
                borderTop: '1px solid',
                borderTopColor: 'gray.300',
              }}
            >
              {range().map((hour, index) => {
                return (
                  <GridItem
                    key={`${hour}-${index}`}
                    height={`${hourHeight}px`}
                    alignItems="center"
                  >
                    <Text fontSize="xs" color="gray.700">
                      {index === 0 ? '' : `${hour} ${index < 13 ? 'AM' : 'PM'}`}
                    </Text>
                  </GridItem>
                )
              })}
            </Grid>
            <Grid templateColumns="repeat(7, 1fr)">
              {simpleWeekdaysShortNames.map((day, index) => (
                <GridItem
                  key={day}
                  display="relative"
                  borderLeft="1px solid"
                  borderColor="gray.300"
                  _last={{
                    borderRight: 'solid 1px',
                    borderRightColor: 'gray.300',
                  }}
                >
                  <Flex
                    pl={2}
                    direction="column"
                    borderBottom="1px solid"
                    borderBottomColor="gray.300"
                    h={`${marginTop}px`}
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
                    width="calc(100% / 7 - 7px)"
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
                              borderRadius="none"
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
                              borderRadius="none"
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
                    return appointment.schedules.map(
                      (schedule, scheduleIndex) => {
                        let scheduleStart = new Date(schedule.start)
                        if (
                          isSameDate(addDays(mondayDate, index), scheduleStart)
                        ) {
                          return (
                            <Flex
                              key={schedule.start}
                              p={2}
                              position="absolute"
                              top={`${fromTop(
                                scheduleStart.getHours(),
                                scheduleStart.getMinutes()
                              )}px`}
                              height={`${
                                (schedule.duration / 60) * hourHeight - 2
                              }px`}
                              bgColor="primary.blue.pure"
                              alignItems="center"
                              borderRadius="md"
                              color="white"
                              borderLeft="10px solid"
                              borderColor="#3b60e4"
                              width="calc(100% / 7 - 10px)"
                            >
                              <PatientPopover
                                id={appointment.id}
                                schedule={schedule}
                                isLoading={isLoading}
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                removeSchedule={removeSchedule}
                                onSubmit={() => {}}
                              />
                            </Flex>
                          )
                        }
                      }
                    )
                  })}
                </GridItem>
              ))}
            </Grid>
          </Grid>
          <Box
            position="absolute"
            width="100%"
            top={`${fromTopTimeLine()}px`}
            border="1px solid red"
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
