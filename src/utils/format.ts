export const toBRL = (value: number) => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const monthName = [
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

export const toBRMonth = (month: string) => {
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
    NOVEMBER: 'Novembro',
    DEZEMBRO: 'Dezember',
  }
  return monthList[month]
}
