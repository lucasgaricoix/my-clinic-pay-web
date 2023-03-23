import { useLazySignupQuery } from '@/services/auth/auth-rtk-api'
import { UserPayload } from '@/types/user/user'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { MediaContext } from '../../providers/media-provider'
import { FormikInput } from '../custom/formik'
import GoogleScript from './google-script'

interface Signin {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const SignUpComponent = () => {
  const { isLargerThanMd } = useContext(MediaContext)
  const { replace } = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [trigger, response] = useLazySignupQuery()

  function getUserPayload(values: Signin): UserPayload {
    return {
      name: values.name,
      email: values.email,
      password: values.password,
      picture: '',
      role: 'standard',
      settings: {
        schedule: {
          rules: [],
        },
      },
    }
  }

  async function onSubmit(values: Signin) {
    try {
      setIsLoading(true)
      const response = await trigger(getUserPayload(values))
      if (response.isSuccess) {
        await replace('/auth/login')
      }
      toast({
        title: 'Cadastro',
        description: 'Usuário cadastrado com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex
      alignItems="center"
      w="full"
      h="full"
      direction="column"
      bg="transparent"
    >
      <GoogleScript />

      <Flex py={4} direction="column" justify="center" alignItems="center">
        <Heading py={4} color="primary.blue.pure">
          MyClinic
        </Heading>
        <Text>Cadastre-se agora e começe a gerenciar seus agendamentos</Text>
      </Flex>
      <Flex
        direction="column"
        w={{
          base: 'xs',
          md: 'md',
          lg: 'lg',
        }}
        p={8}
        bg="transparent"
        borderWidth={1}
        borderColor="gray.300"
        borderRadius={6}
        shadow="md"
      >
        <Flex direction="column">
          <Formik<Signin> initialValues={initialValues} onSubmit={onSubmit}>
            {({}) => (
              <Form>
                <FormikInput
                  name="name"
                  placeholder="nome completo"
                  label="Nome"
                  type="text"
                />
                <FormikInput
                  name="email"
                  placeholder="seu melhor e-amil"
                  label="Email"
                  type="email"
                />
                <FormikInput
                  name="password"
                  placeholder="senha"
                  label="Senha"
                  type="password"
                />
                <FormikInput
                  name="confirm-password"
                  placeholder="confirma a senha"
                  label="Confirmação"
                  type="password"
                />
                <Stack mt={6} spacing={4}>
                  <Button
                    isLoading={isLoading}
                    type='submit'
                    w={{
                      base: '2xs',
                      md: 'sm',
                      lg: 'sm',
                    }}
                    alignSelf="center"
                    bgColor="primary.blue.pure"
                    color="white"
                    _hover={{
                      bg: 'primary.blue.pure',
                      textColor: 'white',
                    }}
                    borderRadius="3xl"
                  >
                    Criar conta
                  </Button>
                  <Flex
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Divider borderColor="gray.300" w="44%" />
                    <Text>OU</Text>
                    <Divider borderColor="gray.300" w="44%" />
                  </Flex>
                  <Box
                    alignSelf="center"
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signup_with"
                    data-size="large"
                    data-logo_alignment="left"
                    data-width={isLargerThanMd ? '384' : '256'}
                  />
                </Stack>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Flex>
  )
}
