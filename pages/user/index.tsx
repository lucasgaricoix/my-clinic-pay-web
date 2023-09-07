import { FormikInput } from '@/components/custom/formik'
import FormWrapper from '@/components/wrapper/form-wrapper'
import { UserService } from '@/services/user/user.service'
import { RootState } from '@/store/store'
import { UserSession } from '@/types/auth/session'
import { Avatar, Button, Stack, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function User() {
  const userSession = useSelector((state: RootState) => state.userSession)
  const toast = useToast()
  const { push } = useRouter()
  const [isLoading, setLoading] = useState(false)

  async function handleSubmit(value: UserSession) {
    try {
      setLoading(true)
      const response = await UserService.updateUser(value)
      if (response.status === 200) {
        toast({
          title: 'Sucesso',
          description: 'Cadastro atualizado com sucesso',
          status: 'info',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
          async onCloseComplete() {
            await push('/')
          },
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack
      w="full"
      h="full"
      bg="primary.gray.background"
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      <FormWrapper>
        <Formik<UserSession>
          initialValues={userSession}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <>
              <Stack w={{ base: 'xs', md: 'md', lg: 'md' }} spacing={4}>
                <Avatar src={values.picture} size="lg" />
                <FormikInput
                  name="picture"
                  label="Foto"
                  placeholder="URL da sua foto"
                />

                <FormikInput
                  name="name"
                  label="Nome"
                  placeholder="Nome completo"
                  isDisabled
                />
                <FormikInput
                  name="email"
                  label="E-mail"
                  placeholder="Seu e-mail"
                  isDisabled
                />
                <Button
                  type="submit"
                  w={{
                    base: 'xs',
                    md: 'md',
                    lg: 'md',
                  }}
                  my="4"
                  bg="primary.blue.pure"
                  textColor="white"
                  _hover={{ bg: 'primary.blue.pure', textColor: 'white' }}
                  borderRadius="3xl"
                >
                  Salvar
                </Button>
              </Stack>
            </>
          )}
        </Formik>
      </FormWrapper>
    </Stack>
  )
}
