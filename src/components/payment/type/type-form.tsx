import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import * as yup from 'yup'
import { PaymentTypeService } from '../../../services/payment'
import { PaymentType } from '../../../types/payment-type/payment-type'

const initialValues: PaymentType = {
  id: '',
  description: '',
  value: 0.0,
}

const schema = yup.object().shape({
  description: yup.string().required(),
  value: yup.number().min(1).required(),
})

export const PaymentTypeFormComponent = () => {
  const route = useRouter()
  const handleSubmit = async (
    values: PaymentType,
    action: FormikHelpers<PaymentType>
  ) => {
    try {
      await PaymentTypeService.save(values)
      action.resetForm()
      route.back()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      direction="column"
      p="4"
      mb="4"
      border="1px solid #EBEBEB"
      borderRadius="16px"
    >
      <Text fontWeight="600" fontSize="20" py="2">
        Tipos de pagamentos
      </Text>
      <Formik<PaymentType>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, errors, touched }) => (
          <Form>
            {values.id && (
              <Field name="id">
                {({ field }: FieldProps<string>) => (
                  <FormControl
                    isReadOnly
                    isInvalid={!!errors.id && !!touched.id}
                  >
                    <FormLabel htmlFor="id">Id</FormLabel>
                    <Input {...field} id="id" placeholder="id" />
                    {errors.id && (
                      <FormErrorMessage>{errors.id}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Field>
            )}
            <Field name="description">
              {({ field }: FieldProps<string>) => {
                return (
                  <FormControl
                    isRequired
                    isInvalid={!!errors.description && !!touched.description}
                  >
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <Input {...field} id="description" />
                    {errors.description && (
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    )}
                  </FormControl>
                )
              }}
            </Field>
            <Field name="value">
              {({ field }: FieldProps<number>) => (
                <FormControl
                  id="value"
                  isRequired
                  isInvalid={!!errors.value && !!touched.value}
                >
                  <FormLabel htmlFor="value">Valor</FormLabel>
                  <Input {...field} id="value" />
                  {errors.value && (
                    <FormErrorMessage>{errors.value}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </Field>
            <Button type="submit" w="320px" my="4">
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}
