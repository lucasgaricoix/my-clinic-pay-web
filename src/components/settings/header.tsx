import { Flex, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      bgColor="white"
      w="full"
      justifyContent="center"
      shadow="lg"
      p={6}
      mb={6}
    >
      <Text fontSize="lg" fontWeight="bold">
        Configurações
      </Text>
    </Flex>
  )
}