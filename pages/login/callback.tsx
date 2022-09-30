import { Box, Text } from '@chakra-ui/react'
import formidable from 'formidable'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { setUserSession } from '../../src/store/reducers/userSessionSlice'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'

type Props = {
  sessionToken: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const form = formidable({})

  const data: any = await new Promise((resolve, reject) => {
    form.parse(context.req, (err: any, fields: any, files: any) => {
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
}

const LoginCallback: React.FC<Props> = ({ sessionToken }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const { name, email, picture, iat, exp }: any = jwt.decode(sessionToken)
    const dispatched = dispatch(setUserSession({ name, email, picture, iat, exp, token: sessionToken }))
    if (dispatched.payload) {
      router.push('/')
    }
  }, [dispatch, sessionToken, router])

  return (
    <Box>
      <Text>Redirecting...</Text>
    </Box>
  )
}

export default LoginCallback
