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
  isDisabled?: boolean
  isRequired?: boolean
}

export const FormikTextArea: React.FC<Props> = ({
  name,
  label,
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
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Textarea
              {...field}
              id={name}
              name={name}
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
