import { AuthContext } from '@/providers/auth-provider'
import {
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
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
  const { pathname, replace } = useRouter()
  const { isAuthenticated } = useContext(AuthContext)
  const ignoreRenderRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/login/callback',
  ]
  const isIgnoreRenderRoutes = ignoreRenderRoutes.includes(pathname)

  if (isIgnoreRenderRoutes) {
    return (
      <Box w="full" h="100vh">
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
          <VStack w="full" divider={<Divider />} spacing={0}>
            <Box w="full" minH="100vh" pl="67px">
              {children}
            </Box>
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
          <Box w="full">{children}</Box>
        </VStack>
      )}
    </Flex>
  )
}
