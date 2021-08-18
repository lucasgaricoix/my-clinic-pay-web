import {
  Box,
  Button,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencil, IoTrash } from 'react-icons/io5'
import { PatientService } from '../../services/patient'
import { Patient } from '../../types/patient/patient-type'
import { CustomAlertDialog } from '../custom/alert/alert-dialog'

export const PatientList = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await PatientService.findAll()
      setPatients(response.data)
    } catch (error) {
      toast({
        title: 'Erro ao carregar os Pacientes',
        description: 'Não funfou :(',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetch()
  }, [fetch])

  const handleRemove = useCallback(async () => {
    try {
      setLoading(true)
      await PatientService.deleteById(removeId)
      onClose()
      toast({
        title: 'Sucesso',
        description: 'Removido o paciente :)',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
      fetch()
    } catch (error) {
      toast({
        title: 'Erro ao remover o paciente',
        description: 'Não funfou :(',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }, [removeId, onClose, toast, fetch])

  const getAge = (birthday: string) => {
    const date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return (
    <Flex direction="column">
      <Flex direction="column" p="4">
        <Flex justifyContent="space-between">
          <Text fontWeight="600" fontSize="lg">
            Pacientes
          </Text>
          <NextLink href="/patient/new" shallow passHref>
            <Button
              leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
              bg="primary.purple"
              textColor="white"
              _hover={{ bg: 'primary.darkpurple', textColor: 'white' }}
            >
              Adicionar
            </Button>
          </NextLink>
        </Flex>
      </Flex>
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
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
                      {new Date(patient.birthDate).toLocaleDateString('pt')}
                    </Td>
                    <Td>{getAge(patient.birthDate) || ''}</Td>
                    <Td>{patient.responsible.name}</Td>
                    <Td>
                      <Box>
                        <NextLink href={`patient/${patient.id}`}>
                          <Button leftIcon={<Icon as={IoPencil} />} mr="4">
                            Editar
                          </Button>
                        </NextLink>
                        <Button
                          leftIcon={<Icon as={IoTrash} />}
                          onClick={() => {
                            setRemoveId(patient.id!)
                            onOpen()
                          }}
                        >
                          Remover
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleRemove}
        title="Remover paciente"
        label="Remover"
        description="Deseja remover o paciente?"
        colorScheme="red"
      />
    </Flex>
  )
}
