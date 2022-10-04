import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5'
import { BiChevronDown } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserSession } from '../../../store/reducers/userSessionSlice'
import { RootState } from '../../../store/store'
import AccountPopover from '../../account/account-popover'

export default function NavBar() {
  const user = useSelector((state: RootState) => state.userSession)
  const dispatch = useDispatch()
  const initialFocusRef = useRef(null)
  const { push } = useRouter()

  const logout = useCallback(() => {
    dispatch(clearUserSession())
    push('/login')
  }, [dispatch, push])

  return (
    <Flex px={4} w="full" justifyContent="flex-end" alignItems="center">
      <HStack>
        <Icon as={IoNotificationsOutline} w="20px" h="20px" />
        <Icon as={IoSettingsOutline} w="20px" h="20px" />
        {user.name && (
          <Flex justifySelf="center">
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
                  <Avatar size="sm" name={user.name} src={user.picture} />
                </Button>
              </PopoverTrigger>
              <AccountPopover logout={logout} />
            </Popover>
          </Flex>
        )}
      </HStack>
    </Flex>
  )
}
