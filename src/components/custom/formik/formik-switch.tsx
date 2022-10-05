import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

type Props = {
  name: string
  label: string
  isRequired?: boolean
}

export const FormikSwitch: React.FC<Props> = ({ name, label, isRequired = false }) => {
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel id={name} htmlFor={name}>
              {label}
            </FormLabel>
            <Switch colorScheme="blue" id={name} {...field} isRequired={isRequired} isChecked={!!field.value} />
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
