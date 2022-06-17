import { Box, Divider, Flex, Stack } from '@chakra-ui/react'
import { SideBar } from './side-bar'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh" w="full" direction="row">
      <Stack
        direction="row"
        w="full"
        divider={<Divider orientation="vertical" />}
      >
        <SideBar />
        <Box w="full" bg="white" p="4">
          {children}
        </Box>
      </Stack>
    </Flex>
  )
}
