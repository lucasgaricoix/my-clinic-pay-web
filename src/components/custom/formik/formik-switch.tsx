import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
}

export const FormikSwitch: React.FC<Props> = ({ name, label }) => {
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
            <Switch colorScheme="teal" id={name} {...field} />
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
