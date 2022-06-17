import {
  Box,
  Divider,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
  VStack
} from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import { SideBar } from './side-bar'

export const MainLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isBase, isLargerThanSm, isLargerThanMd] = useMediaQuery([
    '(min-width: 18em)',
    '(min-width: 30em)',
    '(min-width: 48em)',
  ])

  return (
    <Flex minH="100vh" w="full" direction="row">
      {isLargerThanMd && (
        <Stack direction="row" w="full">
          <SideBar isLargerThanMd={isLargerThanSm} onClose={onClose} />
          <Divider orientation="vertical" />
          <Box w="full" bg="white" p="4">
            {children}
          </Box>
        </Stack>
      )}
      {(isBase || isLargerThanSm) && !isLargerThanMd && (
        <VStack w="full" align="stretch">
          {!isOpen && (
            <Box p="2">
              <IconButton
                aria-label="menu-button"
                icon={<IoMenu />}
                onClick={onOpen}
              />
            </Box>
          )}
          {isOpen && (
            <SideBar isLargerThanMd={isLargerThanSm} onClose={onClose} />
          )}
          <Divider orientation="horizontal" />
          <Box w="full" bg="white" p="4">
            {children}
          </Box>
        </VStack>
      )}
    </Flex>
  )
}
