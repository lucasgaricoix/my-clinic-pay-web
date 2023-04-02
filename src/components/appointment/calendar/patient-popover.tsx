import { Patient } from '@/types/patient'
import { formatToHourMinutes } from '@/utils/date'
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

interface Props {
  time: Date
  duration: number
  patient: Patient
}

export default function PatientPopover({ time, duration, patient }: Props) {
  // const [onOpen, onClose, isOpen] = useDisclosure()

  return (
    <Popover>
      <PopoverTrigger>
        <button>
          <Text fontSize="sm">{patient.name.substring(0, 20).concat('...')}</Text>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Flex>
            Agendamento {formatToHourMinutes(time)} {duration}
          </Flex>
        </PopoverHeader>
        <PopoverBody>{patient.name}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
