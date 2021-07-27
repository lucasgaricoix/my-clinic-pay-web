import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import { ReactEventHandler } from 'react'

type Props = {
  name: string
  label: string
  options: {
    value: string
    label: string
  }[]
  onSelect?: () => (event: ReactEventHandler<HTMLSelectElement>) => void
}

export const FormikSelect: React.FC<Props> = ({
  name,
  label,
  options,
  onSelect,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Select {...field} onSelect={onSelect} id={name}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
2
