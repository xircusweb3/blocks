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
import { GradientLoader } from "./GradientLoader"

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

export const MobileDrawer = ({ children, header, footer, isLoading, onClose, contentProps, ...rest }) => (
  <Drawer placement="right" size="md" onClose={onClose} {...rest}>
    <DrawerOverlay backdropFilter="blur(20px)" />
    <DrawerContent ml={4} bg="transparent" {...contentProps}>
      { (!isLoading && onClose) && <DrawerCloseButton mt={1} /> }
      <DrawerBody>{children}</DrawerBody>
    </DrawerContent>
  </Drawer>
)