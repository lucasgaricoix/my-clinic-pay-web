import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ThemeTypings,
} from '@chakra-ui/react'
import { useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  label: string
  description: string
  colorScheme: ThemeTypings['colorSchemes']
}

export const CustomAlertDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  label,
  description,
  colorScheme,
}) => {
  const cancelRef = useRef<any>(undefined)
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme={colorScheme} onClick={onSubmit} ml={3}>
              {label}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
