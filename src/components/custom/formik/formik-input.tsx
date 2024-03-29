import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  isRequired?: boolean
  isDisabled?: boolean
  autocomplete?: boolean
  size?: string | object
}

export const FormikInput: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  isRequired = false,
  isDisabled = false,
  autocomplete = false,
  size = 'md',
}) => {
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            w={size}
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel fontWeight="bold" id={name} htmlFor={name}>
              {label}
            </FormLabel>
            <Input
              variant="filled"
              {...field}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              isRequired={isRequired}
              isDisabled={isDisabled}
              autoComplete={autocomplete ? 'true' : 'false'}
              borderColor="gray.600"
              borderWidth="1px"
              bg="white"
              focusBorderColor="primary.blue.pure"
              _focus={{
                borderWidth: '2px'
              }}
              w={size}
            />
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
