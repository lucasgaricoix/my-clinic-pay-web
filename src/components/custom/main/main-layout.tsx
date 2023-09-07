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
import { SideBar } from './side-bar'
import { useContext } from 'react'
import { MediaContext } from '@/providers/media-provider'

type Props = {
  children?: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { onClose } = useDisclosure()
  const { isBase, isLargerThanSm, isLargerThanMd } = useContext(MediaContext)
  const { pathname } = useRouter()
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
      {isLargerThanSm ? (
        <Stack direction="row" w="full" spacing={0} >
          <SideBar
            isBase={isBase}
            isLargerThanSm={isLargerThanSm}
            isLargerThanMd={isLargerThanMd}
            onClose={onClose}
          />
          <Divider orientation="vertical" />
          <VStack w="full" divider={<Divider />} spacing={0}>
            <Box w="full" minH="100vh" pl="67px">
              {children}
            </Box>
          </VStack>
        </Stack>
      ) : (
        <VStack
          w="full"
          minH="100vh"
          spacing={0}
          divider={<Divider orientation="horizontal" />}
        >
          <SideBar
            isBase={isBase}
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
