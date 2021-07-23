import {
  Container,
  Divider,
  Flex,
  HStack,
  Link,
  List,
  ListItem,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const MainLayout: React.FC = ({ children }) => {
  const menus = [
    { description: 'Home', icon: '', link: '/' },
    { description: 'Pagamentos', icon: '', link: '/' },
    { description: 'Pacientes', icon: '', link: '/patient' },
    { description: 'Tipos de pagamento', icon: '', link: '/payment/type' },
  ]
  const SideBar = () => (
    <Flex w="xs">
      <List py={4} spacing={4}>
        {menus.map((menu) => (
          <ListItem key={menu.description}>
            <NextLink href={menu.link} shallow passHref>
              <Link>
                <Text color="gray.700" fontSize="md" fontWeight={600}>
                  {menu.description}
                </Text>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
  return (
    <Container maxW="full" maxH="full" p="8">
      <Flex>
        <Text>My clinic pay</Text>
      </Flex>
      <Divider />
      <HStack
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <SideBar />
        {children}
      </HStack>
    </Container>
  )
}
