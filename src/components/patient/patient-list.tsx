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
  Tooltip,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencil, IoTrash } from 'react-icons/io5'
import { MediaContext } from '../../providers/media-provider'
import { PatientService } from '../../services/patient'
import { Patient } from '../../types/patient/patient-type'
import { CustomAlertDialog } from '../custom/alert/alert-dialog'
import PatientListCard from './patient-list-card'
import PatientListTable from './patient-list-table'

export const PatientList = () => {
  const [loading, setLoading] = useState(false)
  const [removeId, setRemoveId] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLargerThanMd } = useContext(MediaContext)

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

  const handlePaymentButton = (patientId: string) => {
    setRemoveId(patientId)
    onOpen()
  }

  return (
    <Flex direction="column">
      <Flex direction="column" justifyContent="space-between" p={4}>
        {loading && <Progress size="xs" isIndeterminate />}
        <Flex justifyContent="space-between" py={4}>
          <Text fontWeight="600" fontSize="lg">
            Pacientes
          </Text>
          <NextLink href="/patient/new" shallow passHref>
            <Button
              size={{
                base: 'sm',
                lg: 'md',
              }}
              leftIcon={<Icon as={IoAddCircleOutline} h={6} w={6} mr="2" />}
              bg="primary.blue.pure"
              textColor="white"
              _hover={{
                bg: 'primary.blue.pure',
              }}
            >
              Adicionar
            </Button>
          </NextLink>
        </Flex>
        {isLargerThanMd ? (
          <PatientListTable
            patients={patients}
            handlePaymentButton={handlePaymentButton}
          />
        ) : (
          <PatientListCard
            patients={patients}
            handlePaymentButton={handlePaymentButton}
          />
        )}
      </Flex>
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
