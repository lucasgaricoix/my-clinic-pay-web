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
  const [visible, setVisible] = useState(true)
  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps) => (
        <>
          <FormControl
            isRequired
            isInvalid={!!form.errors[name] || !!form.errors[name]}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {!visible && (
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                onClick={() => setVisible(true)}
                value={
                  items.filter((item) => item.value === field.value)[0]
                    ?.label || ''
                }
              />
            )}
            <Box py="2">
              {visible && (
                <Stack direction="row" wrap="wrap" alignItems="center">
                  {items.map((item) => (
                    <Box py={2} key={item.value}>
                      <Tag
                        size="md"
                        variant="solid"
                        colorScheme="teal"
                        onClick={() => {
                          form.setFieldValue(name, item.value, true)
                          form.setFieldTouched(name, true)
                          setVisible(false)
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
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        </>
      )}
    </Field>
  )
}
