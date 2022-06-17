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
import { useRef } from 'react'
import { IoMenu } from 'react-icons/io5'
import { SideBar } from './side-bar'

export const MainLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 400px)')
  const buttonRef = useRef()

  return (
    <Flex minH="100vh" w="full" direction="row">
      {isMobile ? (
        <>
          <Box p="2">
            {!isOpen && (
              <>
                <IconButton
                  aria-label="menu-button"
                  icon={<IoMenu />}
                  onClick={onOpen}
                />
              </>
            )}
          </Box>
          <VStack>
            {isOpen && <SideBar isMobile={isMobile} onClose={onClose} />}
            <Divider orientation="horizontal" />
            <Box w="full" bg="white" p="4">
              {children}
            </Box>
          </VStack>
        </>
      ) : (
        <Stack direction="row" w="full">
          <SideBar isMobile={isMobile} onClose={onClose} />
          <Divider orientation="vertical" />
          <Box w="full" bg="white" p="4">
            {children}
          </Box>
        </Stack>
      )}
    </Flex>
  )
}
