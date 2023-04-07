import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
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
  items: {
    value: string
    label: string
  }[]
  search: (param: string) => void
  placeholder?: string
  isLoading?: boolean
}

export const FormikCustomAutoCompleteDebounce: React.FC<Props> = ({
  name,
  label,
  items = [],
  search,
  placeholder,
  isLoading,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [itemLabel, setItemLabel] = useState('')

  return (
    <Field id={name} name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <>
            <FormControl
              isRequired
              isInvalid={!!form.errors[name] || !!form.errors[name]}
            >
              <FormLabel fontWeight="bold" htmlFor={name}>
                {label}
              </FormLabel>
              <Stack spacing={4}>
                <InputGroup>
                  <Input
                    {...field}
                    variant="filled"
                    focusBorderColor="primary.blue.pure"
                    id={name}
                    placeholder={placeholder}
                    borderColor="gray.600"
                    borderWidth="1px"
                    bg="white"
                    _focus={{
                      borderWidth: '2px',
                    }}
                    onChange={(event) => {
                      setItemLabel(event.target.value)
                      form.setFieldValue(name, event.target.value, true)
                      form.setFieldTouched(name, true)
                      if (event.target.value) {
                        search(event.target.value)
                      }
                    }}
                    onClick={() => setIsVisible(!isVisible)}
                    value={
                      items.find((item) => item.value === field.value)?.label ||
                      itemLabel
                    }
                  />
                  <InputRightElement>
                    {isLoading && <Spinner color="gray.600" />}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Box py="2">
                {isVisible && (
                  <Stack direction="column" wrap="wrap">
                    {items.map((item) => (
                      <Box py={2} key={item.value}>
                        <Tag
                          size="md"
                          variant="solid"
                          bgColor="primary.blue.pure"
                          onClick={() => {
                            form.setFieldValue(name, item.value, true)
                            form.setFieldTouched(name, true)
                            setIsVisible(!isVisible)
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
