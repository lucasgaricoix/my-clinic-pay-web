import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, FieldProps, getIn } from 'formik'

type Props = {
  id: string
  name: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  autocomplete?: boolean
  size?: string | {}
}

export const FormikTimeInput: React.FC<Props> = ({
  id,
  name,
  label = '',
  placeholder,
  isRequired = false,
  isDisabled = false,
  autocomplete = false,
  size = 'md',
}) => {
  return (
    <Field id={name} name={name} timezone="America/Sao_Paulo">
      {({ field, form }: FieldProps<string>) => {
        return (
          <FormControl
            isRequired={isRequired}
            isInvalid={
              !!getIn(form.errors, name) && !!getIn(form.touched, name)
            }
          >
            <Input
              variant="outline"
              {...field}
              id={name}
              name={name}
              placeholder={placeholder}
              isRequired={isRequired}
              isDisabled={isDisabled}
              autoComplete={autocomplete ? 'true' : 'false'}
              type="time"
              focusBorderColor="primary.blue.pure"
              bgColor="transparent"
              borderColor="gray.300"
              size={size}
              minW={{ base: '125px', md: '143.8px' }}
            />
            {getIn(form.errors, name) && (
              <FormErrorMessage>{getIn(form.errors, name)}</FormErrorMessage>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
