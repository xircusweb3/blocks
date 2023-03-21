import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  HStack,
  Spacer,
  useColorModeValue as mode
} from "@chakra-ui/react"

export const RightDrawer = ({ children, header, footer, isLoading, onClose, ...rest }) => (
  <Drawer placement="right" size="md" onClose={onClose} {...rest}>
    <DrawerOverlay />
    <DrawerContent bg={mode('white', 'black')} borderLeftWidth={{ base: 0, md: 1 }} borderColor={mode('gray.50', 'gray.900')}>
      <DrawerHeader>
        <HStack>
          <Heading size="md">{header}</Heading>
          <Spacer />
        </HStack>
      </DrawerHeader>
      { (!isLoading && onClose) && <DrawerCloseButton _focus={{ boxShadow: '0 !important' }} mt={1} /> }
      <DrawerBody>{children}</DrawerBody>
      { footer && <DrawerFooter>{footer}</DrawerFooter> }
    </DrawerContent>
  </Drawer>
)