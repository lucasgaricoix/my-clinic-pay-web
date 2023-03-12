import {
  Avatar,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import { useCallback, useRef } from 'react'
import { IconType } from 'react-icons'
import { BiChevronDown } from 'react-icons/bi'
import { IoHappy, IoHome, IoOptions, IoWallet } from 'react-icons/io5'
import { TbCalendarStats } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserSession } from '../../../store/reducers/userSessionSlice'
import { RootState } from '../../../store/store'
import AccountPopover from '../../account/account-popover'

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

const menus: Menu[] = [
  { description: 'Home', icon: IoHome, link: '/' },
  { description: 'Agendamento', icon: TbCalendarStats, link: '/appointment' },
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

export const SideBar: React.FC<Props> = ({
  isLargerThanMd = false,
  isLargerThanSm = false,
  onClose,
}) => {
  const { asPath, pathname, push } = useRouter()
  const iconSize = { base: 4, md: 5, lg: 5 }
  const containerSize = { base: '38px', md: '50px', lg: '50px' }
  const userSession = useSelector((state: RootState) => state.userSession)
  const initialFocusRef = useRef(null)
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(clearUserSession())
    push('/login')
  }, [dispatch, push])

  // if (!userSession.token) {
  //   return null
  // }

  return (
    <Flex justifyContent="center" p={2}>
      <Grid
        templateColumns={{ base: 'repeat(6, 1fr)', md: 'repeat(1, 1fr)' }}
        h={{ base: 'auto', md: '250px' }}
        gap={{ base: 4, md: 1 }}
      >
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
                      w={containerSize}
                      h={containerSize}
                      borderRadius="8px"
                    >
                      <Icon
                        w={iconSize}
                        h={iconSize}
                        as={menu.icon}
                        color={isActiveRoute ? 'primary.blue.pure' : 'gray.500'}
                      />
                    </Flex>
                  </Flex>
                </Link>
              </NextLink>
            </GridItem>
          )
        })}
        {!isLargerThanMd && userSession.token && (
          <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button
                bg="transparent"
                _hover={{ bg: 'transparent' }}
                rightIcon={<Icon as={BiChevronDown} />}
              >
                <Avatar
                  alignSelf="center"
                  size="sm"
                  name={userSession.name}
                  src={userSession.picture}
                />
              </Button>
            </PopoverTrigger>
            <AccountPopover logout={logout} />
          </Popover>
        )}
      </Grid>
    </Flex>
  )
}
