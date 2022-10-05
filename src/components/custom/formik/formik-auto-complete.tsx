import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'

interface Props {
  name: string
  label: string
  placeholder?: string
  items: {
    value: string
    label: string
  }[]
}

export const FormikCustomAutoComplete: React.FC<Props> = ({
  name,
  label,
  placeholder,
  items = [],
}) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <>
            <FormControl
              isRequired
              isInvalid={!!form.errors[name] || !!form.errors[name]}
            >
              <FormLabel htmlFor={name}>{label}</FormLabel>
              {!isVisible && (
                <Input
                  {...field}
                  id={name}
                  placeholder={placeholder}
                  onClick={() => setIsVisible(!isVisible)}
                  value={
                    items.filter((item) => item.value === field.value)[0]
                      ?.label || ''
                  }
                />
              )}
              <Box>
                {isVisible && (
                  <Stack direction="row" wrap="wrap" alignItems="flex-start" spacing={1}>
                    {items.map((item) => (
                      <Box py={2} key={item.value}>
                        <Tag
                          size="md"
                          variant="solid"
                          bgColor="primary.blue.pure"
                          onClick={() => {
                            form.setFieldValue(name, item.value, true)
                            form.setFieldTouched(name, true)
                            setIsVisible(false)
                          }}
                        >
                          <TagLeftIcon w={5} h={5} as={IoAdd} />
                          <TagLabel>{item.label}</TagLabel>
                        </Tag>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
              {form.errors[name] && (
                <FormErrorMessage>
                  {form.errors[name] as string}
                </FormErrorMessage>
              )}
            </FormControl>
          </>
        )
      }}
    </Field>
  )
}
