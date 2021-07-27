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
  type?: string
  isDisabled?: boolean
}

export const FormikInput: React.FC<Props> = ({
  name,
  label,
  type,
  isDisabled = false,
}) => {
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel id={name} htmlFor={name}>
              {label}
            </FormLabel>
            <Input
              {...field}
              id={name}
              name={name}
              type={type}
              isDisabled={isDisabled}
            />
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
