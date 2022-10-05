import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoAddCircleOutline } from 'react-icons/io5'

type Props = {
  currentYear: number
  month: number
  setMonth: (value: any) => void
  year: number
  setYear: (value: any) => void
}

const months = [
  { name: 1, label: 'Janeiro' },
  { name: 2, label: 'Fevereiro' },
  { name: 3, label: 'Março' },
  { name: 4, label: 'Abril' },
  { name: 5, label: 'Maio' },
  { name: 6, label: 'Junho' },
  { name: 7, label: 'Julho' },
  { name: 8, label: 'Agosto' },
  { name: 9, label: 'Setembro' },
  { name: 10, label: 'Outubro' },
  { name: 11, label: 'Novembro' },
  { name: 12, label: 'Dezembro' },
]

export const IncomeSelectGroup: React.FC<Props> = ({
  currentYear,
  month,
  setMonth,
  year,
  setYear,
}) => {
  const years = [currentYear]
  years.push(currentYear - 1, currentYear + 1)
  years.sort((a, b) => a - b)

  const selectAndButtonSizes = useBreakpointValue({
    base: 'sm',
    lg: 'md',
    sm: 'sm',
  })

  return (
    <Flex justifyContent="space-between" pb="4">
      <Flex>
        <Select
          w={{ base: '4xs', lg: '3xs' }}
          borderRadius={4}
          size={selectAndButtonSizes}
          value={month}
          onChange={(event) => setMonth(+event.target.value)}
          mr={1}
        >
          {months.map((month) => (
            <option key={month.name} value={month.name}>
              {month.label}
            </option>
          ))}
        </Select>
        <Select
          w="xsm"
          borderRadius={4}
          size={selectAndButtonSizes}
          value={year}
          onChange={(event) => setYear(+event.target.value)}
          mr={1}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>
      <Box>
        <NextLink href="/payment/income/new" shallow passHref>
          <Button
            leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="auto" />}
            bg="primary.blue.pure"
            textColor="white"
            _hover={{
              bg: 'primary.blue.pure'
            }}
            size={selectAndButtonSizes}
          >
            Adicionar
          </Button>
        </NextLink>
      </Box>
    </Flex>
  )
}
