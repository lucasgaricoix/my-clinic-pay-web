import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Patient } from '../../types/patient'
import NextLink from 'next/link'
import { IoPencil, IoTrash } from 'react-icons/io5'

type Props = {
  patients: Patient[]
  handlePaymentButton: (patientId: string) => void
}

export default function PatientListTable({
  patients,
  handlePaymentButton,
}: Props) {
  const size = useBreakpointValue({ base: 'sm', '2xl': 'md' })

  const getAge = (birthday: string) => {
    const date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Data de nascimento</Th>
            <Th>Idade</Th>
            <Th>Responsável</Th>
            <Th>Opçoes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map((patient) => (
            <Tr key={patient.id}>
              <Td>{patient.name}</Td>
              <Td>
                {new Date(patient.birthDate).toLocaleDateString('pt', {
                  timeZone: 'UTC',
                })}
              </Td>
              <Td>{getAge(patient.birthDate) || ''}</Td>
              <Td>{patient.responsible.name}</Td>
              <Td>
                <Flex>
                  <NextLink href={`patient/${patient.id}`}>
                    <Button
                      size={size}
                      bg="transparent"
                      mr={2}
                      _hover={{
                        bg: 'primary.indigo.light',
                        color: 'primary.indigo.dark',
                      }}
                    >
                      <Tooltip label="Editar">
                        <span>
                          <Icon as={IoPencil} />
                        </span>
                      </Tooltip>
                    </Button>
                  </NextLink>
                  <Button
                    size={size}
                    bg="transparent"
                    onClick={() => handlePaymentButton(patient.id!)}
                    _hover={{
                      bg: 'red',
                      color: 'gray.100',
                    }}
                  >
                    <Tooltip label="Remover">
                      <span>
                        <Icon as={IoTrash} />
                      </span>
                    </Tooltip>
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
