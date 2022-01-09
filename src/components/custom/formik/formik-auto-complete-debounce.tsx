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
  useToast
} from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import { Field, FieldProps } from 'formik'
import { useCallback, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { PatientService } from '../../../services/patient'
import { Patient } from '../../../types/patient'

interface Props {
  name: string
  label: string
  placeholder?: string
}

type PatientOptions = {
  value: string
  label: string
}

export const FormikCustomAutoCompleteDebounce: React.FC<Props> = ({
  name,
  label,
  placeholder,
}) => {
  const [visible, setVisible] = useState(true)
  const toast = useToast()
  const [items, setItems] = useState<PatientOptions[]>([])

  const search = useCallback(
    (param: string) => {
      PatientService.search(param)
        .then((response: AxiosResponse<Patient[]>) => {
          const adapted = response.data.map((patient) => ({
            value: patient.id ?? '',
            label: patient.name,
          }))
          setItems(adapted)
        })
        .catch(() => {
          toast({
            title: 'Erro ao buscar os pacientes',
            description: 'Se não conseguir encontrar, cadastre um novo :)',
            status: 'warning',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        })
    },
    [toast]
  )

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
                form.setFieldValue(name, event.target.value, true)
                form.setFieldTouched(name, true)
                if (event.target.value) {
                  search(event.target.value)
                }
              }}
              onClick={() => setVisible(true)}
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
                          form.setFieldValue(name, item.label, true)
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
