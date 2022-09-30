import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import { IconType } from 'react-icons'
import { IoHappy, IoHome, IoOptions, IoWallet } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

type Menu = {
  description: string
  icon: IconType
  link: string
  subLink?: string[]
}
type Props = {
  isLargerThanMd?: boolean
  isLargerThanSm?: boolean
  onClose: () => void
}

export const SideBar: React.FC<Props> = ({
  isLargerThanMd = false,
  isLargerThanSm = false,
  onClose,
}) => {
  const user = useSelector((state: RootState) => state.userSession)
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
    <Flex
      justifyContent="center"
      m={2}
    >
      <Grid
        templateColumns={{ base: 'repeat(5, 1fr)', md: 'repeat(1, 1fr)' }}
        h={{ base: 'auto', md: '250px' }}
        gap={{ base: 5, md: 1 }}
      >
        {user.name && (
          <Flex justifySelf="center">
            <Avatar size="sm" name={user.name} src={user.picture}></Avatar>
          </Flex>
        )}
        {menus.map((menu) => {
          const isActiveSubLink = menu.subLink?.includes(pathname)
          const isActiveLink = asPath === menu.link
          const isActiveRoute = isActiveSubLink || isActiveLink
          return (
            <GridItem key={menu.description}>
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
                      bgColor={isActiveRoute ? 'primary.indigo.light' : 'white'}
                      w={{
                        base: "38px",
                        md: "50px",
                        lg: "50px"
                      }}
                      h={{
                        base: "38px",
                        md: "50px",
                        lg: "50px"
                      }}
                      borderRadius="8px"
                    >
                      <Icon
                        w={{
                          base: 4,
                          md: 5,
                          lg: 5
                        }}
                        h={{
                          base: 4,
                          md: 5,
                          lg: 5
                        }}
                        as={menu.icon}
                        color={
                          isActiveRoute ? 'primary.indigo.dark' : 'gray.700'
                        }
                      />
                    </Flex>
                  </Flex>
                </Link>
              </NextLink>
            </GridItem>
          )
        })}
      </Grid>
    </Flex>
  )
}
