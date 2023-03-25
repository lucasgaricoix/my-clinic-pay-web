import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormikInput } from '@/components/custom/formik'
import GoogleScript from '@/components/signup/google-script'
import { MediaContext } from '@/providers/media-provider'
import { RootState } from '@/store/store'
import { Credential } from '@/types/user/user'
import { useLazyLoginQuery } from '@/services/auth/auth-rtk-api'
import { useCookies } from 'react-cookie'

const initialValues = {
  username: '',
  password: '',
}

const Login = () => {
  const { replace } = useRouter()
  const { isLargerThanMd } = useContext(MediaContext)
  const state = useSelector((state: RootState) => state.userSession)
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [trigger, response] = useLazyLoginQuery()
  const [__, setCookie] = useCookies()

  useEffect(() => {
    if (state.token) {
      replace('/')
    }
  })

  
  const addMonths = (date: Date, months: number) => {
    date.setMonth(date.getMonth(), months)
    return date
  }

  const onSubmit = useCallback(
    async (values: Credential) => {
      try {
        setIsLoading(true)
        const response = await trigger(values)
        if (response.isSuccess) {
          const cookie = response.data.refreshToken.split(';')
          setCookie('refresh-token', cookie[0].trim().substring(14), {
            path: cookie[1].trim().substring(4),
            maxAge: +cookie[2].trim().substring(9),
            expires: addMonths(new Date(), 1),
          })

          await replace('/')
        }
      } catch (error) {
        console.log(error)
        toast({
          title: 'Erro ao fazer login',
          description: 'Verifique se usuário/senha estão corretos',
          status: 'warning',
          position: 'top-right',
          duration: 6000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [replace, toast, trigger, setCookie]
  )

  if (state.token) {
    return null
  }

  return (
    <Flex
      w="full"
      minH="100%"
      id="login-container"
      p={{ base: 0, md: 4, lg: 4 }}
    >
      <GoogleScript />
      {isLargerThanMd && <WhatIsNewLarger />}
      <Flex
        justifyContent={{
          base: 'flex-start',
          md: 'space-between',
          lg: 'space-between',
        }}
        alignItems="center"
        direction="column"
        w={{
          base: 'sm',
          md: 'xl',
          lg: 'xl',
        }}
      >
        <Flex
          w={{
            base: 'xs',
            md: 'lg',
            lg: 'lg',
          }}
          alignItems="center"
          flexWrap="wrap"
          direction="column"
          py={{ base: 4, md: 0, lg: 0 }}
        >
          <Heading mb={2}>
            Bem vindo de volta ao
            <span>
              <Text textColor="primary.blue.pure">MyClinic</Text>
            </span>
          </Heading>
          <Text wordBreak="normal" textColor="gray.500">
            Entre novamente na sua conta e volte para o gerenciamento de suas
            agendas
          </Text>
        </Flex>
        <Flex direction="column">
          <Formik<Credential> initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Form>
                <Stack
                  spacing={4}
                  direction="column"
                  w={{
                    base: 'xs',
                    md: 'xl',
                    lg: 'xl',
                  }}
                >
                  <FormikInput
                    name="username"
                    label="Email"
                    type="email"
                    placeholder="endereço de email"
                    isRequired
                  />
                  <FormikInput
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="senha"
                    isRequired
                  />
                </Stack>
                <Box mt={1}>
                  <Link>
                    <Text fontSize="sm" color="primary.blue.pure">
                      Esqueci minha senha
                    </Text>
                  </Link>
                </Box>

                <Stack my={6} spacing={4}>
                  <Button
                    isLoading={isLoading}
                    w={{
                      base: 'xs',
                      md: 'sm',
                      lg: 'sm',
                    }}
                    alignSelf="center"
                    bgColor="primary.blue.pure"
                    color="white"
                    _hover={{
                      bg: 'white',
                      textColor: 'primary.blue.pure',
                      borderWidth: 1,
                      borderColor: 'primary.blue.pure',
                    }}
                    borderRadius="3xl"
                    type="submit"
                  >
                    Entrar
                  </Button>
                  <Flex
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Divider borderColor="gray.300" w="44%" />
                    <Text fontSize="xs">OU</Text>
                    <Divider borderColor="gray.300" w="44%" />
                  </Flex>
                  <Box
                    alignSelf="center"
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left"
                    data-width={isLargerThanMd ? '384' : '320'}
                  />
                </Stack>
              </Form>
            )}
          </Formik>
        </Flex>

        <Flex direction="row">
          <Text mr={1}>Não tem cadastro ainda?</Text>
          <Link href="/auth/signup">
            <Text fontWeight="bold" color="primary.blue.pure">
              Cadastre-se
            </Text>
          </Link>
        </Flex>

        {!isLargerThanMd && <WhatIsNewSmaller />}
      </Flex>
    </Flex>
  )
}

const WhatIsNewLarger = () => (
  <Flex
    p={10}
    direction="column"
    w="2xl"
    backgroundColor="primary.blue.pure"
    borderRadius={8}
    mr={24}
    shadow="md"
  >
    <Text fontWeight="bold" textColor="white" mb={24}>
      MyClinic
    </Text>
    <Heading textColor="white" mb={8}>
      Comece a administrar sua clinica com nós
    </Heading>
    <Text textColor="white" mb={36}>
      Descubra as melhores soluções pra sua clínica, de forma fácil e completa
      para administrar suas agendas.
    </Text>
    <Flex
      p={4}
      direction="column"
      w="xs"
      justifyContent="center"
      alignSelf="center"
      bgColor="#045dd9"
      borderRadius={6}
      shadow="md"
    >
      <Text textColor="white" mb={4}>
        O que há de novo?
      </Text>

      <Text textColor="white" fontWeight="bold" mb={4}>
        Confirmação de agendamento
      </Text>
      <Text textColor="white">
        Após o agendamento, envie mensagens automáticas para o paciente fazer a
        confirmação
      </Text>
    </Flex>
  </Flex>
)

const WhatIsNewSmaller = () => (
  <Flex
    my={6}
    direction="column"
    borderRadius={4}
    borderColor="gray.200"
    borderWidth={1}
    shadow="md"
    w="xs"
    p={4}
  >
    <Box mb={1}>
      <Text fontWeight="bold" textColor="primary.blue.pure">
        O que há de novo?
      </Text>
    </Box>
    <Box mb={1}>
      <Text fontWeight="bold">Confirmação de agendamento</Text>
    </Box>
    <Box>
      <Text>
        Após o agendamento, envie mensagens automáticas para o paciente fazer a
        confirmação
      </Text>
    </Box>
  </Flex>
)

export default Login
