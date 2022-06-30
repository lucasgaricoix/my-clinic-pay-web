import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  defaultIsChecked?: boolean
  isRequired?: boolean
}

export const FormikCheckbox: React.FC<Props> = ({
  name,
  label,
  defaultIsChecked = false,
  isRequired = false
}) => {
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        console.log(field)
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel id={name} htmlFor={name}>
              {label}
            </FormLabel>
            <Checkbox
              {...field}
              id={name}
              colorScheme="teal"
              defaultChecked={defaultIsChecked}
              isRequired={isRequired}
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
