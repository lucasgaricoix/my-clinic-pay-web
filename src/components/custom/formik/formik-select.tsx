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
  isRequired?: boolean
}

export const FormikSelect: React.FC<Props> = ({
  name,
  label,
  options,
  onSelect,
  isRequired = false,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel fontWeight="bold" htmlFor={name}>
              {label}
            </FormLabel>
            <Select
              variant="filled"
              focusBorderColor="primary.blue.pure"
              {...field}
              onSelect={onSelect}
              id={name}
              isRequired={isRequired}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {form.errors[name] && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
2
