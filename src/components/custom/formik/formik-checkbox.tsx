import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  defaultIsChecked?: boolean
}

export const FormikCheckbox: React.FC<Props> = ({
  name,
  label,
  defaultIsChecked = false,
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
            <Checkbox
              {...field}
              id={name}
              colorScheme="teal"
              defaultIsChecked={defaultIsChecked}
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
