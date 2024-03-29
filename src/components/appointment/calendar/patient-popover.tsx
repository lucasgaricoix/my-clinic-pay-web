import PencilSquare from '@/assets/svg/pencil-square'
import Trash from '@/assets/svg/trash'
import Xmark from '@/assets/svg/x-mark'
import { CustomAlertDialog } from '@/components/custom/alert/alert-dialog'
import appointmentService from '@/services/appointment/appointment.service'
import { Schedule, scheduleTypeEnum } from '@/types/appointment/schedule'
import { formatDateWithWeekDate, formatToHourMinutes } from '@/utils/date'
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  IoCalendarClearOutline,
  IoChatbubbleOutline,
  IoOptionsOutline,
  IoPersonCircleOutline,
  IoPinOutline,
  IoTimeOutline,
} from 'react-icons/io5'

interface Props {
  id: string
  schedule: Schedule
  isLoading: boolean
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  getAppointments: () => void
}

export default function PatientPopover({
  id,
  schedule,
  isLoading,
  isOpen,
  onOpen,
  onClose,
  getAppointments
}: Props) {
  const start = new Date(schedule.start)
  const end = new Date(schedule.end)
  const patientName = schedule.patient.name.split(' ')
  const name = patientName[0]
  const lastName =
    patientName.length > 1 ? patientName[patientName.length - 1] : ''
  const toast = useToast()

  const {
    isOpen: isOpenPopover,
    onOpen: onOpenPopover,
    onClose: onClosePopover,
  } = useDisclosure()

  const removeSchedule = async () => {
    try {
      console.log(id, schedule.id!)
      const response = await appointmentService.deleteByIds(id, schedule.id!)
      if (response.status === 200) {
        toast({
          title: 'Agendamento deletado',
          description: 'O agendamento foi removido com sucesso.',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
      getAppointments()
    }
  }

  return (
    <>
      <Popover placement="auto" isOpen={isOpenPopover} onClose={onClosePopover}>
        <PopoverTrigger>
          <Button
            variant="unstyled"
            w="full"
            fontWeight="regular"
            whiteSpace="pre-wrap"
            onClick={onOpenPopover}
          >
            <Text fontSize="sm" fontWeight="regular">
              {`${name} ${lastName}`}
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg="white"
          borderColor="gray.300"
          shadow="md"
          color="gray.700"
          w="sm"
        >
          <PopoverArrow bg="white" />
          <PopoverHeader>
            <Flex justifyContent="end">
              <IconButton
                variant="unstyled"
                size="md"
                aria-label="edit-schedule"
                icon={<PencilSquare />}
                borderRadius="3xl"
                _hover={{
                  bgColor: 'gray.100',
                }}
              />
              <IconButton
                onClick={() => onOpen()}
                isLoading={isLoading}
                variant="unstyled"
                size="md"
                aria-label="remove-schedule"
                icon={<Trash />}
                borderRadius="3xl"
                _hover={{
                  bgColor: 'gray.100',
                }}
              />
              <IconButton
                variant="unstyled"
                size="md"
                aria-label="close-patient-popover"
                onClick={onClosePopover}
                icon={<Xmark />}
                borderRadius="3xl"
                _hover={{
                  bgColor: 'gray.100',
                }}
              />
            </Flex>
          </PopoverHeader>
          <PopoverBody display="flex" flexDirection="column">
            <ScheduleView start={start} end={end} schedule={schedule} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CustomAlertDialog
        title="Confirma remover o agendamento?"
        description={`Remover o agendamento do ${name}`}
        colorScheme="red"
        label="Sim"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => removeSchedule()}
      />
    </>
  )
}

type ScheduleViewProps = {
  start: Date
  end: Date
  schedule: Schedule
}
function ScheduleView({ start, end, schedule }: ScheduleViewProps) {
  return (
    <>
      <Flex alignItems="center">
        <Icon as={IoCalendarClearOutline} mr={4} />
        <Text fontSize="sm" mr={4}>
          {formatDateWithWeekDate(start)}
        </Text>
        <Text fontSize="sm">
          {formatToHourMinutes(start)} – {formatToHourMinutes(end)}
        </Text>
      </Flex>

      <Flex mt={4}>
        <Icon as={IoPinOutline} mr={4} />
        <Text fontSize="sm">{scheduleTypeEnum[schedule.appointmentType]}</Text>
      </Flex>

      <Flex mt={4}>
        <Icon as={IoTimeOutline} mr={4} />
        <Text fontSize="sm">Duração: {schedule.duration} min</Text>
      </Flex>

      <Flex mt={4}>
        <Icon as={IoPersonCircleOutline} mr={4} />
        <Text fontSize="sm">{schedule.patient.name}</Text>
      </Flex>

      <Flex mt={4}>
        <Icon as={IoOptionsOutline} mr={4} />
        <Text fontSize="sm">
          {schedule.patient.paymentType?.description ?? ''}
        </Text>
      </Flex>

      {schedule.description && (
        <Flex mt={4}>
          <Icon as={IoChatbubbleOutline} mr={4} />
          <Text fontSize="sm">{schedule.description}</Text>
        </Flex>
      )}
    </>
  )
}
