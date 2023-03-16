import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  id: string
  name: string
  label: string
  defaultIsChecked?: boolean
  isRequired?: boolean
  size?: string | {}
}

export const FormikCheckboxItem: React.FC<Props> = ({
  id = '',
  name,
  label,
  defaultIsChecked = false,
  isRequired = false,
  size = 'md'
}) => {
  console.log()
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <Flex alignItems="center">
              <Checkbox
                {...field}
                id={id}
                colorScheme="blue"
                value={id}
                defaultChecked={defaultIsChecked}
                isRequired={isRequired}
              />
              <FormLabel
                mb={0}
                ml={{ base: 2, md: 3}}
                fontWeight="bold"
                id={name}
                htmlFor={name}
                size={size}
              >
                <Text fontSize={size}>{label}</Text>
              </FormLabel>
            </Flex>
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
