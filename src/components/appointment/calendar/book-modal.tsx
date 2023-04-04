import { FormikCustomAutoComplete, FormikInput, FormikSelect } from '@/components/custom/formik'
import { FormikCustomAutoCompleteDebounce } from '@/components/custom/formik/formik-auto-complete-debounce'
import { Option } from '@/types/common/common'
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'

interface Props {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSearch: (param: string) => void
  patientsOptions: Option[]
}

const initialValues = {}

export default function BookModal({ isOpen, isLoading, onClose, onSearch, patientsOptions}: Props) {
  function onSubmit() {

  }

  return (
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader></ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       <Formik initialValues={initialValues} onSubmit={onSubmit}>
    //       <Form autoComplete="off">
    //           <FormikCustomAutoCompleteDebounce
    //             name="person.id"
    //             label="Paciente"
    //             placeholder="Clique para procurar o paciente"
    //             items={patientsOptions}
    //             search={onSearch}
    //             isLoading={isLoading}
    //           />
    //           <FormikSelect
    //             name="duration"
    //             label="Duração"
    //             options={selectOptions}
    //           />
    //           <Box pt={4}>
    //             <FormikTextArea
    //               name="description"
    //               label="Descrição"
    //               placeholder="Observações do agendamento"
    //             />
    //           </Box>
    //           <Flex direction="column" pt={8} w="full">
    //             <Button
    //               type="submit"
    //               w="full"
    //               bg="primary.blue.pure"
    //               color="white"
    //               borderRadius="3xl"
    //               _hover={{
    //                 bg: 'primary.blue.pure',
    //               }}
    //             >
    //               Próximo
    //             </Button>
    //           </Flex>
    //         </Form>
    //       </Formik>
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
    null
  )
}
