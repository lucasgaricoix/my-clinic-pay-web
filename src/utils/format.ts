export const toBRL = (value: number) => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const monthNames = [
  'JANUARY',
  'FEBRUAY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SETEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DEZEMBRO',
]

export const toBRMonth = (month?: string) => {
  if (!month) {
    return ''
  }
  const monthList: Record<string, string> = {
    JANUARY: 'Janeiro',
    FEBRUAY: 'Fevereiro',
    MARCH: 'Março',
    APRIL: 'Abril',
    MAY: 'Maio',
    JUNE: 'Junho',
    JULY: 'Julho',
    AUGUST: 'Agosto',
    SETEMBER: 'Setembro',
    OCTOBER: 'Outubro',
    NOVEMBER: 'Novembro',
    DEZEMBER: 'Dezembro',
  }
  return monthList[month]
}

export const formatMonthNames = [
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

export const dateToBRMonth = (month: number) => {
  return formatMonthNames[month]
}
