export function getDays(daysInCurrentMonth: number) {
  const days = []
  for (let i = 1; i < daysInCurrentMonth + 1; i++) {
    days.push(i.toString())
  }
  return days
}

export function getCalendarDays(
  firstDayOfWeek: number,
  daysInCurrentMonth: number
): Array<string> {
  const weekDays = []

  for (let i = 0; i < firstDayOfWeek; i++) {
    weekDays.push(`0-${i}`)
  }

  return weekDays.concat(getDays(daysInCurrentMonth))
}

export function formatToHourMinutes(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

export const weekDaysNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]
