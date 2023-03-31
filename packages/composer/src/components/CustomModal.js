import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue as mode
} from '@chakra-ui/react'

export const CustomModal = ({ header, footer, onClose, children, theme, ...props }) => {
  return (
    <Modal onClose={onClose} {...props}>
      <ModalOverlay {...theme?.overlay} />
      <ModalContent backdropFilter="blur(20px)" {...theme?.content}>
        { header && <ModalHeader {...theme?.header}>{header}</ModalHeader> }
        { onClose && <ModalCloseButton /> }
        <ModalBody {...theme?.body}>{children}</ModalBody>
        { footer && <ModalFooter {...theme?.footer}>{footer}</ModalFooter> }
      </ModalContent>
    </Modal>
  )
}