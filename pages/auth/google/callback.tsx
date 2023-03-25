import { Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { Credential, UserPayload } from '@/types/user/user'
import { GoogleParsedCredential } from '@/types/auth/google'
import { useLoginQuery, useSignupQuery } from '@/services/auth/auth-rtk-api'

type Props = {
  id: string
  name: string
  email: string
  picture: string
  verified: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...context.query,
    },
  }
}

const LoginCallback: React.FC<Props> = ({
  id,
  name,
  email,
  picture,
}: Props) => {
  const { push } = useRouter()
  // const toast = useToast()
  const googleCredential: GoogleParsedCredential = {
    id,
    name,
    email,
    picture,
  }

  const getUserPayload = (): UserPayload => {
    return {
      name: googleCredential.name,
      email: googleCredential.email,
      password: googleCredential.id,
      picture: googleCredential.picture,
      role: 'standard',
      settings: {
        schedule: {
          rules: [],
        },
      },
    }
  }

  const addMonths = (date: Date, months: number) => {
    date.setMonth(date.getMonth(), months)
    return date
  }

  const getCredential = (): Credential => {
    return {
      username: googleCredential.email,
      password: googleCredential.id,
    }
  }

  const { error, isLoading, isFetching } = useSignupQuery(getUserPayload())

  const { data } = useLoginQuery(getCredential(), { skip: isFetching })

  if (data) {
    console.log(data.refreshToken)
    push('/')
  }

  if (error) {
    // toast({
    //   title: 'Erro ao buscar usuário',
    //   description: 'Não foi possível encontrar o usuário',
    //   status: 'warning',
    //   position: 'top-right',
    //   duration: 6000,
    //   isClosable: true,
    // })
    push('/auth/login')
  }

  if (isLoading) {
    return <Spinner>Loading...</Spinner>
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <Text>Redirecting...</Text>
    </Flex>
  )
}

export default LoginCallback
