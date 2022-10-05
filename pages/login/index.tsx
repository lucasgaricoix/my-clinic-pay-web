import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FormikInput } from '../../src/components/custom/formik'
import { MediaContext } from '../../src/providers/media-provider'
import { RootState } from '../../src/store/store'

const initialValues = {}

const Login = () => {
  const { push } = useRouter()
  const { isLargerThanMd } = useContext(MediaContext)
  const state = useSelector((state: RootState) => state.userSession)

  useEffect(() => {
    if (state.token) {
      push('/')
    }
  })

  const onSubmit = () => {
    push('/')
  }

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
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Flex
                direction="column"
                w={{
                  base: 'xs',
                  md: 'xl',
                  lg: 'xl',
                }}
              >
                <Form>
                  <FormikInput
                    name="user"
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
                </Form>
              </Flex>
            )}
          </Formik>

          <Box mt={1}>
            <Link>
              <Text fontSize="sm" color="primary.blue.pure">
                Esqueci minha senha
              </Text>
            </Link>
          </Box>

          <Button
            w="xs"
            alignSelf="center"
            bgColor="primary.blue.pure"
            color="white"
            my={6}
            _hover={{
              bg: 'primary.indigo.light',
              textColor: 'primary.blue.pure',
            }}
            borderRadius="3xl"
            type="submit"
          >
            Entrar
          </Button>
        </Flex>

        <Flex direction="row">
          <Text mr={1}>Não tem cadastro ainda?</Text>
          <Link href="/signup">
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
    <Text textColor="white" mb={24}>
      My clinic
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
