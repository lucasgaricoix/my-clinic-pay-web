import {
  Button,
  Icon,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
} from '@chakra-ui/react'
import { IoLogOutOutline } from 'react-icons/io5'

type Props = {
  logout: () => void
}

export default function AccountPopover({ logout }: Props) {
  return (
    <PopoverContent >
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        Gerencie sua conta
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        <Button size="sm" leftIcon={<Icon as={IoLogOutOutline} h="20px" w="20px" />}>
          Sair
        </Button>
      </PopoverBody>
      <PopoverFooter
        border="0"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pb={4}
      ></PopoverFooter>
    </PopoverContent>
  )
}
