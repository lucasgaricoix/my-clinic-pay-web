import { Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import formidable from 'formidable'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { setUserSession } from '../../src/store/reducers/userSessionSlice'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { createUser } from '../../src/services/user/user.service'
import { UserPayload, UserSession } from '../../src/types/auth/session'
import { setTenantId } from '../../src/services/api'

type Props = {
  sessionToken: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const form = formidable({})

  const data: any = await new Promise((resolve, reject) => {
    form.parse(context.req, (err: any, fields: any) => {
      if (err) reject({ err })
      resolve(fields)
    })
  })

  if (data) {
    return {
      props: {
        sessionToken: data.credential[0],
      },
    }
  }

  return {
    props: {},
  }
}

const LoginCallback: React.FC<Props> = ({ sessionToken }) => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()

  const handleCreateUser = useCallback(
    async (user: UserSession) => {
      try {
        setLoading(true)
        const userPayload: UserPayload = {
          name: user.name,
          email: user.email,
          picture: user.picture,
          role: 'standard',
        }
        const response = await createUser(userPayload)
        setTenantId(response.data.tenantId)
        dispatch(setUserSession({ ...user, id: response.data.id ?? '', tenantId: response.data.tenantId }))
        if (response.data) {
          await push('/login')
        }
      } catch (error) {
        toast({
          title: 'Erro ao buscar usuário',
          description:
            'Não foi possível encontrar o usuário :(',
          status: 'warning',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
        await push('/login')
      } finally {
        setLoading(false)
      }
    },
    [dispatch, push, toast]
  )

  useEffect(() => {
    const { name, email, picture, iat, exp }: any = jwt.decode(sessionToken)
    handleCreateUser({      
      name,
      email,
      picture,
      iat,
      exp,
      token: sessionToken,
    })
  }, [handleCreateUser, sessionToken])

  return (
    <Flex justifyContent="center" alignItems="center">
      {loading ? <Spinner>Loading...</Spinner> : <Text>Redirecting...</Text>}
    </Flex>
  )
}

export default LoginCallback
