import {
  Box,
  Divider,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { IoMenu } from 'react-icons/io5'
import { SideBar } from './side-bar'

type Props = {
  children?: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isBase, isLargerThanSm, isLargerThanMd] = useMediaQuery([
    '(min-width: 18em)',
    '(min-width: 30em)',
    '(min-width: 48em)',
  ])
  const router = useRouter()
  const notRenderRoutes = ['/login', '/signup']

  if (notRenderRoutes.includes(router.pathname)) {
    return (
      <Box w="full" h="100vh" bg="white" p="4">
        {children}
      </Box>
    )
  }

  return (
    <Flex minH="100vh" w="full" direction="row">
      {isLargerThanMd && (
        <Stack direction="row" w="full" spacing={0}>
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
