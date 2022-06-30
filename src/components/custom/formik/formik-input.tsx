import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  type?: string
  isRequired?: boolean
  isDisabled?: boolean
}

export const FormikInput: React.FC<Props> = ({
  name,
  label,
  type,
  isRequired = false,
  isDisabled = false,
}) => {
  return (
    <Field id={name} name={name} timezone="America/Sao_Paulo">
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
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
              isRequired={isRequired}
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
