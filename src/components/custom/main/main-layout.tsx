import {
  Container,
  Divider,
  Flex,
  HStack,
  Link,
  List,
  ListItem,
  MenuIcon,
  StackDivider,
  Text,
} from '@chakra-ui/react'

export const MainLayout: React.FC = ({ children }) => {
  const menus = [
    { description: 'Home', icon: <MenuIcon />, link: '/' },
    { description: 'Pagamentos', icon: '', link: '/' },
    { description: 'Pacientes', icon: '', link: '/' },
    { description: 'Tipos de pagamento', icon: '', link: '/payment/type' },
  ]
  const LeftMenu = () => (
    <List py={4} spacing={4}>
      {menus.map((menu) => (
        <ListItem key={menu.description}>
          <Link href={menu.link}>
            <Text color="gray.700" fontSize="md" fontWeight={600}>
              {menu.description}
            </Text>
          </Link>
        </ListItem>
      ))}
    </List>
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
        <LeftMenu />
        {children}
      </HStack>
    </Container>
  )
}
