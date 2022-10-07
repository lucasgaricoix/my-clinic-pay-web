import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  placeholder?: string
  isDisabled?: boolean
  isRequired?: boolean
}

export const FormikTextArea: React.FC<Props> = ({
  name,
  label,
  placeholder,
  isDisabled = false,
  isRequired = false,
}) => {
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel fontWeight="bold" htmlFor={name}>
              {label}
            </FormLabel>
            <Textarea
              {...field}
              variant="filled"
              id={name}
              name={name}
              placeholder={placeholder}
              isDisabled={isDisabled}
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
