import { Divider, Flex, Stack } from '@chakra-ui/react'
import Header from './header'
import { ScheduleSettingsComponent } from './schedule/schedule-settings'

export const SettingsComponent = () => {
  return (
    <Flex
      direction="column"
      w="100%"
      h="100vh"
      alignItems="center"
      bgColor="primary.gray.background"
    >
      <Header />
      <Flex
        direction="column"
        w={{ base: 'auto', md: '4xl' }}
        shadow="md"
        borderWidth="2px"
        borderColor={{ base: 'gray.300', md: "gray.600"}}
        borderRadius="sm"
        bgColor="white"
      >
        <Stack divider={<Divider borderColor="gray.300" />} spacing={0}>
          <Flex direction="column" p={{ base: 2, md: 6 }}>
            <ScheduleSettingsComponent />
          </Flex>
          {/* <Flex justifyContent="end" alignItems="center" p={{ base: 2, md: 4 }}>
            <Button
              bgColor="transparent"
              _hover={{
                backgroundColor: 'transparent',
                textDecorationLine: 'underline',
              }}
            >
              <Text fontSize="sm">Cancelar</Text>
            </Button>
            <Button
              form="weekday-time-form"
              type="submit"
              borderRadius="2xl"
              size="sm"
              bgColor="primary.blue.pure"
              _hover={{
                backgroundColor: 'secondary.blue.pure',
              }}
            >
              <Text fontSize="sm" color="white">
                Salvar
              </Text>
            </Button>
          </Flex> */}
        </Stack>
      </Flex>
    </Flex>
  )
}
