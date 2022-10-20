import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import { HiClock } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { MediaContext } from '../../providers/media-provider'
import { RootState } from '../../store/store'
import useCalendar from '../custom/calendar'
import CalendarDay from '../custom/calendar/day'

export default function AppointmentComponent() {
  const { isLargerThanMd } = useContext(MediaContext)

  const { query } = useRouter()

  const userSession = useSelector((state: RootState) => state.userSession)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {Calendar, selectedDate} = useCalendar(onOpen)

  return (
    <Flex
      minH="100vh"
      w="full"
      p={{ base: 0, md: 16 }}
      backgroundColor="primary.gray.background"
    >
      {isOpen && !isLargerThanMd ? (
        <CalendarDay
          date={selectedDate}
          duration={+query.duration!}
          onClose={onClose}
        />
      ) : (
        <Stack
          direction={['column', 'row']}
          divider={<StackDivider />}
          w={{ base: 'full' }}
          h={{ base: '100vh', md: '3xl' }}
          bg="white"
          shadow="md"
          borderWidth={{
            base: 'none',
            md: 1,
          }}
          borderRadius={{
            base: 'none',
            md: 'md',
          }}
          borderColor="gray.200"
          spacing={0}
        >
          <Flex
            p={{ base: 4, lg: 6 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="sm"
          >
            <Text fontWeight="bold" textColor="gray.600" mb={2}>
              {userSession.name}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              {query.patient}
            </Text>
            <HStack mt={6} spacing={10}>
              <HStack>
                <Icon color="gray.500" as={HiClock} w="1.50rem" h="1.50rem" />
                <Text color="gray.500" fontWeight="bold">
                  {query.duration} min
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text fontSize="xs">{query.type}</Text>
                <Box w="18px" h="18px" borderRadius="50%" bg={query.color} />
              </HStack>
            </HStack>
          </Flex>
          <VStack
            p={8}
            spacing={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="sm"
          >
            <Text fontWeight="bold">Selecione uma Data</Text>
            <Calendar/>
          </VStack>
          {isLargerThanMd && (
            <Flex w="full" height="auto">
            <CalendarDay
              date={selectedDate}
              duration={+query.duration!}
              onClose={onClose}
            />
          </Flex>
          )}
        </Stack>
      )}
    </Flex>
  )
}
