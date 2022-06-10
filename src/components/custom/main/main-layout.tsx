import { Box, Flex } from '@chakra-ui/react'
import { SideBar } from './side-bar'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh" w="auto" h="auto" direction="row" >
      <SideBar />
      <Box w="full" bg="gray.100" pl="1">
        <Box h="full" bg="white" p="2">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
