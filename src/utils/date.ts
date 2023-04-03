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
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

export function getDateString(date: Date) {
  const month = ptBRMonths[date.getMonth()]
  return `${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${month} ${date.getFullYear()}`
}

export function formatDateWithWeekDate(date: Date) {
  const month = ptBRMonths[date.getMonth()]
  const weekDay = weekdaysNames[date.getDay()]
  return `
  ${weekDay}, 
  ${date.getDate().toString().padStart(2, '0')} ${month} ${date.getFullYear()}`
}

export const weekdaysNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export const ptBRMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const simpleWeekdaysShortNames = [
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb',
  'Dom',
]

export const weekdaysShortNames = [
  {
    name: 'sunday',
    label: 'DOM',
  },
  {
    name: 'monday',
    label: 'SEG',
  },
  {
    name: 'tuesday',
    label: 'TER',
  },
  {
    name: 'wednesday',
    label: 'QUA',
  },
  {
    name: 'thursday',
    label: 'QUI',
  },
  {
    name: 'friday',
    label: 'SEX',
  },
  {
    name: 'saturday',
    label: 'SAB',
  },
]

export const weekdaysShortNamesDefault = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
]

export const isSameDate = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export const addDays = (date: Date, days: number) => {
  const currentDate = new Date(date)

  return new Date(currentDate.setDate(currentDate.getDate() + days))
}

export const getMonday = () => {
  const today = new Date()
  const first = today.getDate() - today.getDay() + 1
  return new Date(today.setDate(first))
}
