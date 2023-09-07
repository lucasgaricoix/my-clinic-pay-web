import AppointmentCalendarComponent from '@/components/appointment/calendar/week'
import AppointmentCalendarDay from '@/components/appointment/calendar/day'
import { MediaContext } from '@/providers/media-provider'
import { useContext } from 'react'

export default function Appointment() {
  const { isLargerThanMd } = useContext(MediaContext)

  if (isLargerThanMd) {
    return <AppointmentCalendarComponent />
  }

  return <AppointmentCalendarDay />
}
