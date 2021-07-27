export const toBRL = (value: number) => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
