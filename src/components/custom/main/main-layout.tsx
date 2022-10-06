import {
  Box,
  Divider,
  Flex,
  Stack,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NavBar from './nav-bar'
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
  const { pathname } = useRouter()
  const notRenderRoutes = ['/login', '/signup', '/login/callback']

  if (notRenderRoutes.includes(pathname)) {
    return (
      <Box w="full" h="100vh" bg="white">
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
          <VStack w="full" bg="white" divider={<Divider />} spacing={0}>
            <NavBar />
            <Box w="full" minH="100vh" >{children}</Box>
          </VStack>
        </Stack>
      )}
      {!isLargerThanMd && (
        <VStack
          w="full"
          minH="100vh"
          spacing={0}
          divider={<Divider orientation="horizontal" />}
        >
          <SideBar
            isLargerThanSm={isLargerThanSm}
            isLargerThanMd={isLargerThanMd}
            onClose={onClose}
          />
          <Box w="full" bg="white">
            {children}
          </Box>
        </VStack>
      )}
    </Flex>
  )
}
