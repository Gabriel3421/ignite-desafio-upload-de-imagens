import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.900"
        width="fit-content"
        maxW="900px"
        borderRadius={8}
      >
        <ModalBody padding={0}>
          <Image
            src={imgUrl}
            alt="image"
            maxH="600px"
            maxW="900px"
            objectFit="cover"
            margin={0}
            borderTopRadius={8}
          />
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
