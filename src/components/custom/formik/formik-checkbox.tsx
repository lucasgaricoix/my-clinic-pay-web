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
  isRequired?: boolean
}

export const FormikCheckbox: React.FC<Props> = ({
  name,
  label,
  defaultIsChecked = false,
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
            <FormLabel fontWeight="bold" id={name} htmlFor={name}>
              {label}
            </FormLabel>
            <Checkbox
              {...field}
              id={name}
              colorScheme="blue"
              isChecked={!!field.value}
              defaultChecked={defaultIsChecked}
              isRequired={isRequired}
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
