import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { Patient } from '../../types/patient'
import NextLink from 'next/link'

type Props = {
  patients: Patient[]
  handlePaymentButton: (patientId: string) => void
}

type Display = {
  label: string
  value: string | number
}

type Options = {
  handlePaymentButton: (patientId: string) => void
  id: string
}

function Display({ label, value }: Display) {
  return (
    <Flex justifyContent="space-between">
      <Text fontSize="sm" textColor="gray.600">
        {label}
      </Text>
      <Text fontSize="sm">{value}</Text>
    </Flex>
  )
}

function OptionsButton({ handlePaymentButton, id }: Options) {
  return (
    <Stack justifyContent="space-between" direction="column">
      <NextLink href={`patient/${id}`}>
        <Button
          bg="primary.blue.pure"
          color="white"
          borderRadius="2xl"
          size="sm"
          w="full"
          _hover={{
            bg: 'primary.blue.pure',
          }}
        >
          Editar
        </Button>
      </NextLink>
      <Button
        onClick={() => handlePaymentButton(id)}
        bg="white"
        variant="outline"
        colorScheme="red"
        borderRadius="2xl"
        size="sm"
        w="full"
      >
        Excluir
      </Button>
    </Stack>
  )
}

export default function PatientListCard({
  patients,
  handlePaymentButton,
}: Props) {
  const getAge = (birthday: string) => {
    const date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime()
    var ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return (
    <Stack direction="column">
      {patients.map((patient) => (
        <Stack
          key={patient.id}
          spacing={1}
          borderWidth={1}
          borderColor="gray.300"
          borderRadius="md"
          direction="column"
          shadow="md"
          p={2}
          divider={<Divider />}
        >
          <Display label="Nome:" value={patient.name} />
          <Display
            label="Data de nascimento:"
            value={new Date(patient.birthDate).toLocaleDateString('pt', {
              timeZone: 'UTC',
            })}
          />
          <Display label="Idade:" value={getAge(patient.birthDate)} />
          <Display label="Responsável:" value={patient.responsible.name} />
          <OptionsButton
            handlePaymentButton={handlePaymentButton}
            id={patient.id!}
          />
        </Stack>
      ))}
    </Stack>
  )
}
