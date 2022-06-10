import { Flex, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import { IconType } from 'react-icons'
import { IoHappy, IoHome, IoOptions, IoWallet } from 'react-icons/io5'

type Menu = {
  description: string
  icon: IconType
  link: string
  subLink?: string[]
}

export const SideBar = () => {
  const menus: Menu[] = [
    { description: 'Home', icon: IoHome, link: '/' },
    {
      description: 'Pagamentos',
      icon: IoWallet,
      link: '/payment',
      subLink: ['/payment/income/[id]', '/payment/expense/[id]'],
    },
    {
      description: 'Pacientes',
      icon: IoHappy,
      link: '/patient',
      subLink: ['/patient/[id]'],
    },
    {
      description: 'Tipos de pagamento',
      icon: IoOptions,
      link: '/payment/type',
      subLink: ['/payment/type/[id]'],
    },
  ]

  const { asPath, pathname } = useRouter()

  return (
    <Flex w="auto" justifyContent="center" px="5">
      <List py={4} spacing={4}>
        {menus.map((menu) => {
          const isActiveSubLink = menu.subLink?.includes(pathname)
          const isActiveLink = asPath === menu.link
          const isActiveRoute = isActiveSubLink || isActiveLink
          return (
            <ListItem key={menu.description}>
              <NextLink href={menu.link} shallow passHref>
                <Link>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    wrap="wrap"
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      bgColor={
                        isActiveRoute ? 'primary.indigo.light' : 'white'
                      }
                      w="50px"
                      h="50px"
                      borderRadius="8px"
                    >
                      <Icon w={5} h={5} as={menu.icon} color={ isActiveRoute ? 'primary.indigo.dark' : 'gray.700'} />
                    </Flex>
                  </Flex>
                </Link>
              </NextLink>
            </ListItem>
          )
        })}
      </List>
    </Flex>
  )
}
