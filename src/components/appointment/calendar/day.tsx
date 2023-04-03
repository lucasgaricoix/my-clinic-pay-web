import appointmentService from '@/services/appointment/appointment.service'
import { RootState } from '@/store/store'
import {
  AppointmentSchedule,
  CalendarTimes,
} from '@/types/appointment/appointment'
import { addDays, formatToHourMinutes, getDateString } from '@/utils/date'
import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { appointmentTypeColorPicker } from '../appointment-colors'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

export default function AppointmentCalendarDay() {
  const currentDate = new Date()

  //states
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(currentDate)
  const [calendarTimes, setCalendarTimes] = useState<CalendarTimes[]>()

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // hooks
  const userSession = useSelector((state: RootState) => state.userSession)
  const toast = useToast()

  const getAppointments = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await appointmentService.findAppointmentByUserAndDate(
        userSession.tenantId!,
        date.toISOString()
      )
      if (response.data) {
        getAvailableTimesInterval(response.data)
      }
    } catch (error) {
      console.log(error)
      getAvailableTimesInterval()
    } finally {
      setIsLoading(false)
    }
  }, [date])

  const getAvailableTimesInterval = (appointment?: AppointmentSchedule) => {
    const times: CalendarTimes[] = []
    const startOfDay = 7
    const endOfDay = 22

    for (let i = startOfDay; i < endOfDay; i++) {
      const oClockTimes = new Date(year, month, day, i)
      const halfMinutesTimes = new Date(year, month, day, i, 30)

      const oClockFinded = appointment?.schedule.find((value) => {
        return (
          oClockTimes.getTime() >= new Date(value.start).getTime() &&
          oClockTimes.getTime() < new Date(value.end).getTime()
        )
      })

      const halfTimesFinded = appointment?.schedule.find((value) => {
        return (
          halfMinutesTimes.getTime() >= new Date(value.start).getTime() &&
          halfMinutesTimes.getTime() < new Date(value.end).getTime()
        )
      })

      if (!oClockFinded) {
        times.push({
          start: oClockTimes,
          end: oClockTimes,
          patientName: '',
          type: '',
          duration: 0,
        })
      }

      if (!halfTimesFinded) {
        times.push({
          start: halfMinutesTimes,
          end: halfMinutesTimes,
          patientName: '',
          type: '',
          duration: 0,
        })
      }
    }

    appointment?.schedule.forEach((value) => {
      times.push({
        start: new Date(value.start),
        end: new Date(value.end),
        patientName: value.patient.name,
        type: value.appointmentType,
        duration: value.duration,
      })
    })

    times.sort((a, b) => a.start.getTime() - b.start.getTime())

    setCalendarTimes(times)
  }

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  return (
    <Stack p={4} w="full">
      <HStack justifyContent="center" alignItems="center">
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="back-date"
          color="gray.600"
          icon={<IoChevronBack />}
          onClick={() => setDate(addDays(date, -1))}
        />
        <Text fontSize="sm" fontWeight="bold" color="gray.600">
          {getDateString(date)}
        </Text>
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="forward-date"
          color="gray.600"
          icon={<IoChevronForward />}
          onClick={() => setDate(addDays(date, +1))}
        />
      </HStack>
      {calendarTimes?.map((time, index) => {
        const patientName = time.patientName.split(' ')
        const name = patientName[0]
        const lastName =
          patientName.length > 1 ? patientName[patientName.length - 1] : ''
        return (
          <Fragment key={time.start.toLocaleString()}>
            <Button
              h="50px"
              disabled={time.patientName ? true : false}
              variant="outline"
              borderColor="primary.blue.pure"
              textColor={time.type ? 'gray.800' : 'primary.blue.pure'}
            >
              <HStack w="full" justifyContent="space-between">
                <VStack>
                  {time.patientName ? (
                    <Text fontSize="sm">{`${formatToHourMinutes(
                      time.start
                    )} - ${formatToHourMinutes(time.end)}`}</Text>
                  ) : (
                    <Text fontSize="sm">{formatToHourMinutes(time.start)}</Text>
                  )}
                </VStack>
                {time.patientName && (
                  <Text fontSize="sm">{`${name} ${lastName}`}</Text>
                )}
                {/** TODO: informações adicionais com o popover */}
              </HStack>
            </Button>
          </Fragment>
        )
      })}
    </Stack>
  )
}
