import { Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MediaContext } from '../../providers/media-provider'

type Props = {
  children: React.ReactNode
}

function Web({ children }: Props) {
  return (
    <Flex
      direction="column"
      bg="white"
      p={8}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      shadow="md"
    >
      {children}
    </Flex> 
  )
}

function Mobile({ children }: Props) {
  return <Flex direction="column" bg="white" w="full" p={6}>
    {children}
    </Flex>
}

export default function FormWrapper({ children }: Props) {
  const { isLargerThanMd } = useContext(MediaContext)

  if (isLargerThanMd) {
    return <Web>{children}</Web>
  }

  return <Mobile>{children}</Mobile>
}
