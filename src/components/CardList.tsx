import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO SELECTED IMAGE URL STATE
  const [imageUrl, setImageUrl] = useState('');
  // TODO FUNCTION HANDLE VIEW IMAGE
  const viewImage = (url: string): void => {
    onOpen();
    setImageUrl(url);
  };
  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => {
          return (
            <Card
              key={card.id}
              data={card}
              viewImage={() => viewImage(card.url)}
            />
          );
        })}
      </SimpleGrid>
      <ModalViewImage imgUrl={imageUrl} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
