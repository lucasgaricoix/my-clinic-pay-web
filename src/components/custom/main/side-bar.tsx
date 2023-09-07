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
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import NextLink from 'next/link'
import { useCallback, useRef } from 'react'
import { IconType } from 'react-icons'
import { BiChevronDown } from 'react-icons/bi'
import {
  IoHappy,
  IoHome,
  IoLogOutOutline,
  IoOptions,
  IoSettingsOutline,
  IoWallet,
} from 'react-icons/io5'
import { TbCalendarStats } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserSession } from '../../../store/reducers/userSession'
import { RootState } from '../../../store/store'
import AccountPopover from '../../account/account-popover'

type Menu = {
  description: string
  icon: IconType
  href: string
  subLink?: string[]
}
type Props = {
  isBase?: boolean
  isLargerThanSm?: boolean
  isLargerThanMd?: boolean
  onClose: () => void
}

const menus: Menu[] = [
  { description: 'Home', icon: IoHome, href: '/' },
  {
    description: 'Agendamento',
    icon: TbCalendarStats,
    href: '/appointment',
    subLink: ['/appointment/booking', '/appointment/patient/pick'],
  },
  {
    description: 'Pagamentos',
    icon: IoWallet,
    href: '/payment',
    subLink: ['/payment/income/[id]', '/payment/expense/[id]'],
  },
  {
    description: 'Pacientes',
    icon: IoHappy,
    href: '/patient',
    subLink: ['/patient/[id]'],
  },
  {
    description: 'Tipos de pagamento',
    icon: IoOptions,
    href: '/payment/type',
    subLink: ['/payment/type/[id]'],
  },
  {
    description: 'Configurações',
    icon: IoSettingsOutline,
    href: '/settings',
    subLink: [],
  },
]

export const SideBar: React.FC<Props> = ({ isLargerThanSm = false }) => {
  const { asPath, pathname, push, replace } = useRouter()
  const iconSize = { base: 4, sm: 5, lg: 5 }
  const containerSize = { base: '38px', sm: '50px', lg: '50px' }
  const userSession = useSelector((state: RootState) => state.userSession)
  const initialFocusRef = useRef(null)
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(clearUserSession())
    push('/auth/login')
  }, [dispatch, push])

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems={['space-between', 'center']}
      pl={2}
      w={{ base: 'full', sm: 'auto' }}
      h={{ base: 'auto', sm: '100vh' }}
      position={{ base: 'relative', sm: 'fixed' }}
      borderRightColor="white"
      borderRightWidth={{ base: '0px', sm: '0.1rem', lg: '0.1rem' }}
      zIndex={1}
      bgColor="#fff"
    >
      {userSession.name &&
        (isLargerThanSm ? (
          <Button
            p={0}
            bgColor="transparent"
            position="absolute"
            top={4}
            left={2}
            _hover={{
              backgroundColor: 'transparent',
              blur: 'sm',
            }}
            onClick={() => push('/user')}
          >
            <Avatar
              size="md"
              name={userSession.name}
              src={userSession.picture}
            />
          </Button>
        ) : (
          <Flex
            w="full"
            alignSelf="start"
            alignItems="center"
            // bgColor="primary.blue.pure"
            pb="3"
            borderBottomRightRadius="xl"
            borderBottomLeftRadius="xl"
          >
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
                  pl={2}
                >
                  <Avatar
                    showBorder
                    alignSelf="center"
                    justifySelf="center"
                    size="sm"
                    name={userSession.name}
                    src={userSession.picture}
                  />
                </Button>
              </PopoverTrigger>
              <AccountPopover logout={logout} />
            </Popover>
            <Text fontSize="sm">
              Bem vindo de volta{' '}
              <span style={{ fontWeight: 'bold' }}>{userSession.name}</span>
            </Text>
          </Flex>
        ))}
      <Grid
        py={{ base: 2, sm: 0 }}
        templateColumns={{ base: 'repeat(6, 1fr)', sm: 'repeat(1, 1fr)' }}
        h="auto"
        gap={{ base: 4, sm: 1 }}
      >
        {menus.map((menu) => {
          const isActiveSubLink = menu.subLink?.includes(pathname)
          const isActiveLink = asPath === menu.href
          const isActiveRoute = isActiveSubLink || isActiveLink
          return (
            <GridItem key={menu.description}>
              <NextLink href={menu.href} shallow passHref>
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
                      borderRadius="2xl"
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
      </Grid>
      {isLargerThanSm && userSession.token && (
        <Button
          position="absolute"
          bottom={4}
          onClick={logout}
          size="sm"
          bg="transparent"
          _hover={{ backGroundColor: 'transparent' }}
        >
          <Icon as={IoLogOutOutline} w={6} h={6} color="gray.700" />
        </Button>
      )}
    </Flex>
  )
}
