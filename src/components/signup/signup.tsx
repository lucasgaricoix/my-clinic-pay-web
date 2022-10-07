import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { MediaContext } from '../../providers/media-provider'
import { FormikInput } from '../custom/formik'
import GoogleScript from './google-script'

export const SignUpComponent = () => {
  const { isLargerThanMd } = useContext(MediaContext)
  const initialValues = {}

  const onSubmit = () => {}

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
        <Text>Cadastre-se no MyClinic e ganhe 7 dias grátis</Text>
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
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({}) => (
              <Form>
                <FormikInput name="name" label="Nome" type="text" />
                <FormikInput name="email" label="Email" type="email" />
                <FormikInput name="password" label="Senha" type="password" />
                <FormikInput
                  name="confirm-password"
                  label="Confirmação"
                  type="password"
                />
              </Form>
            )}
          </Formik>
          <Stack mt={6} spacing={4}>
            <Button
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
            <Flex w="full" justifyContent="space-between" alignItems="center">
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
        </Flex>
      </Flex>
    </Flex>
  )
}
