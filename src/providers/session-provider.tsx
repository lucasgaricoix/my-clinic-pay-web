import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

type Props = {
  children: React.ReactNode
}

export default function SessionWrapper({ children }: Props) {
  const state = useSelector((state: RootState) => state.userSession)
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (!state?.token && pathname != '/login') {
      push('/login')
    }
  }, [state, pathname, push])

  return <Box>{children}</Box>
}
