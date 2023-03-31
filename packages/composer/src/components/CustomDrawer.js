import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

export const CustomDrawer = ({ children, header, footer, isLoading, onClose, theme, ...rest }) => (
  <Drawer placement="right" size="md" onClose={onClose} {...rest}>
    <DrawerOverlay {...theme?.overlay} />
    <DrawerContent backdropFilter="blur(20px)" {...theme?.content}>
      { (!isLoading && onClose) && <DrawerCloseButton /> }
      { header && <DrawerHeader {...theme?.header}>{header}</DrawerHeader> }
      <DrawerBody {...theme?.body}>{children}</DrawerBody>
      { footer && <DrawerFooter {...theme?.footer}>{footer}</DrawerFooter> }
    </DrawerContent>
  </Drawer>
)