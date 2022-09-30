import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FormikInput } from '../custom/formik'

export const SignUpComponent = () => {
  const initialValues = {}

  const onSubmit = () => {}

  return (
    <Flex w="full" h="full">
      <Flex direction="column" p="10em" w="50%">
        <Box>
          <Heading mb={6}>Crie sua conta</Heading>
        </Box>
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
          >
            Criar conta
          </Button>
          <Box alignSelf="center" mt={6}>
            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="outline"
              data-text="signup_with"
              data-size="large"
              data-logo_alignment="left"
              data-width="320"
            ></div>
          </Box>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        w="50%"
        bgColor="primary.indigo.dark"
        borderRadius={16}
      />
    </Flex>
  )
}
