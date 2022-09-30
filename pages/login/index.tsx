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
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FormikInput } from '../../src/components/custom/formik'
import { RootState } from '../../src/store/store'

const initialValues = {}

const Login = () => {
  const router = useRouter()
  const state = useSelector((state: RootState) => state.userSession)

  useEffect(() => {
    if (state.name) {
      router.push('/')
    }
  }, [state, router])

  const onSubmit = () => {
    router.push('/')
  }

  return (
    <Flex minH="100%">
      <Flex
        p={10}
        direction="column"
        w="2xl"
        backgroundColor="primary.indigo.dark"
        borderRadius={8}
        mr={24}
      >
        <Text textColor="white" mb={24}>
          My clinic pay
        </Text>
        <Heading textColor="white" mb={8}>
          Start your journey with us
        </Heading>
        <Text textColor="white" mb={36}>
          Discover the best solution for your clinic, with easy and complete
          management for your appointment
        </Text>
        <Flex
          p={4}
          direction="column"
          w="xs"
          justifyContent="center"
          alignSelf="center"
          bgColor="#384bb4"
          borderRadius={6}
        >
          <Text textColor="white" mb={4}>
            Simple unbeliaveble! I am really satisfied with my appointment and
            financial management
          </Text>
          <Flex>
            <Avatar
              name="Lucas Garicoix"
              src="https://ui-avatars.com/api/?name=Lucas+Garicoix"
              mr={4}
            />
            <Box>
              <Text textColor="white">Lucas Garicoix</Text>
              <Text textColor="white" fontSize="xm">
                Software Engineer
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        direction="column"
        w="xl"
      >
        <Heading mb={4}>Bem vindo de volta!</Heading>
        <Flex direction="column">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Flex direction="column" w="md">
                <Form>
                  <FormikInput
                    name="user"
                    label="Email"
                    type="email"
                    isRequired
                  />
                  <FormikInput
                    name="password"
                    label="Senha"
                    type="password"
                    isRequired
                  />
                </Form>
              </Flex>
            )}
          </Formik>

          <Box mt={1}>
            <Link>
              <Text fontSize="sm" color="primary.indigo.dark">
                Esqueci minha senha
              </Text>
            </Link>
          </Box>

          <Button
            w="xs"
            alignSelf="center"
            bgColor="primary.indigo.dark"
            color="white"
            mt={6}
            _hover={{
              bg: 'primary.indigo.light',
              textColor: 'primary.indigo.dark',
            }}
            borderRadius="3xl"
            type="submit"
          >
            Entrar
          </Button>

          <Box alignSelf="center" mt={6}>
            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
              data-width="320"
            />
          </Box>
        </Flex>
        <Flex direction="row">
          <Text mr={1}>Não tem cadastro ainda?</Text>
          <Link href="/signup">
            <Text fontWeight="bold" color="primary.indigo.dark">
              Cadastre-se
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
