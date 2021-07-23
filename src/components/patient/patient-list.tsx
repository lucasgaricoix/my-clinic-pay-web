import {
  Box,
  Button,
  Flex,
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

  function getAge(birthday: string) {
    const date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return (
    <Flex w="full" h="full" direction="column" p="4">
      <Text fontWeight="600" fontSize="lg" py="2">
        Pacientes
      </Text>
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          <Flex justifyContent="flex-end">
            <NextLink href="patient/new" shallow passHref>
              <Button>Adicionar</Button>
            </NextLink>
          </Flex>
          <Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Data de nascimento</Th>
                  <Th>Idade</Th>
                  <Th>Responsável</Th>
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
                          <Button mr="4">Editar</Button>
                        </NextLink>
                        <Button
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
        description="Deseja remover o paciente?"
      />
    </Flex>
  )
}
