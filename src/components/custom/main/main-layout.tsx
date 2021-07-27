import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from './side-bar'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh" w="auto" h="auto" direction="row" py="2">
      <SideBar />
      <Box w="full" bg="gray.100" borderRadius="lg" p="3">
        <Box h="full" bg="white" borderRadius="lg" p="3">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
