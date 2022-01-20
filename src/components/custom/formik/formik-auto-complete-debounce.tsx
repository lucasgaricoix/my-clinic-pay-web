import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon
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
  search: (param: string) => void
}

type PatientOptions = {
  value: string
  label: string
}

export const FormikCustomAutoCompleteDebounce: React.FC<Props> = ({
  name,
  label,
  placeholder,
  items,
  search,
}) => {
  const [visible, setVisible] = useState(true)
  const [itemLabel, setItemLabel] = useState('')

  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps) => (
        <>
          <FormControl
            isRequired
            isInvalid={!!form.errors[name] || !!form.errors[name]}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              onChange={(event) => {
                setItemLabel(event.target.value)
                form.setFieldValue(name, event.target.value, true)
                form.setFieldTouched(name, true)
                if (event.target.value) {
                  search(event.target.value)
                }
              }}
              onClick={() => setVisible(true)}
              value={
                items.filter((item) => item.value === field.value)[0]?.label ||
                itemLabel
              }
            />
            <Box py="2">
              {visible && (
                <Stack direction="column" wrap="wrap">
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
