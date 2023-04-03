import { Schedule, scheduleTypeEnum } from '@/types/appointment/schedule'
import { formatDateWithWeekDate, formatToHourMinutes } from '@/utils/date'
import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import {
  IoCalendarOutline,
  IoOptionsOutline,
  IoPersonCircleOutline,
  IoTimeOutline,
} from 'react-icons/io5'

interface Props {
  schedule: Schedule
}

export default function PatientPopover({ schedule }: Props) {
  const start = new Date(schedule.start)
  const end = new Date(schedule.end)

  return (
    <Flex w="full">
      <Popover placement="auto">
        <PopoverTrigger>
          <Button variant="unstyled" w="full" fontWeight="regular">
            <Text fontSize="sm" fontWeight="regular">
              {schedule.patient.name.length > 20
                ? schedule.patient.name.substring(0, 20).concat('...')
                : schedule.patient.name}
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg="white"
          borderColor="gray.300"
          shadow="md"
          color="gray.700"
        >
          <PopoverArrow bg="white" />
          <PopoverCloseButton />
          <PopoverHeader>
            {scheduleTypeEnum[schedule.appointmentType]}
          </PopoverHeader>
          <PopoverBody display="flex" flexDirection="column">
            <Flex alignItems="center">
              <Icon as={IoCalendarOutline} mr={2} />
              <Text fontSize="xs" mr={2}>
                {formatDateWithWeekDate(start)}
              </Text>
              <Text fontSize="xs">
                {formatToHourMinutes(start)} – {formatToHourMinutes(end)}
              </Text>
            </Flex>

            <Flex mt={2}>
              <Icon as={IoTimeOutline} mr={2} />
              <Text fontSize="xs">Duração: {schedule.duration} min</Text>
            </Flex>

            <Flex mt={2}>
              <Icon as={IoPersonCircleOutline} mr={2} />
              <Text fontSize="xs">{schedule.patient.name}</Text>
            </Flex>

            <Flex mt={2}>
              <Icon as={IoOptionsOutline} mr={2} />
              <Text fontSize="xs">
                {schedule.patient.paymentType?.description ?? ''}
              </Text>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
