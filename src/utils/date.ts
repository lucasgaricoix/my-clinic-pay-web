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
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb'
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
