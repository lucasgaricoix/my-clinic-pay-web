import { Box, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

export const MediaContext = React.createContext({
  isBase: false,
  isLargerThanSm: false,
  isLargerThanMd: false,
})

export default function MediaProvider({ children }: Props) {
  const [isBase, isLargerThanSm, isLargerThanMd] = useMediaQuery([
    '(min-width: 18em)',
    '(min-width: 30em)',
    '(min-width: 48em)',
  ])
  return (
    <MediaContext.Provider value={{ isBase, isLargerThanSm, isLargerThanMd }}>
      <Box>{children}</Box>
    </MediaContext.Provider>
  )
}
