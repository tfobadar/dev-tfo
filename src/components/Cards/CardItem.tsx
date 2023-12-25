import { personaTopCardStyleProps } from '@/constants/cards/persona';
import { Cards, Modal } from '@tfo/mytfo-components';
import renderRichText from '@/helpers/renderRichText';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { SmallAddIcon } from '@chakra-ui/icons';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { Card } from '@/types/card';
import LeaderShipOverlay from '../subcomponents/Modals/LeaderShipOverlay';
import { useCardWithEqualWidth } from '@/hooks/useCardWithEqualWidth';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
const { TopImage } = Cards;

export default function CardItem({
  blok,
  cardsPerRow,
  gaps,
  wrapperWidth,
}: Card) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { text, subHeading, image } = blok;
  const { desktop = '4', mobile = '1' } = cardsPerRow ?? {};
  const { locale } = useRouter();
  const cardWithEqualWidth = useCardWithEqualWidth({
    desktop,
    mobile,
    gaps,
    wrapperWidth,
  });

  const buttons = (title: string = '') => {
    return {
      ...getButtonsListFromStoryblok({
        ctas: blok.buttons,
        buttonsProps: [
          {
            textDecoration: 'none',
            _hover: {
              textDecoration: 'underline',
            },
            leftIcon: (
              <Flex bg={'tfo.primary.500'} borderRadius="50%" h={17} w={17}>
                <SmallAddIcon color={'gray.850'} />
              </Flex>
            ),
            title,
            onClick: () => {
              onOpen();
            },
          },
        ],
      }),
    } as ButtonsByLimit;
  };

  const props = personaTopCardStyleProps(image, text, subHeading);

  return (
    <>
      <TopImage
        {...props}
        imageProps={{ ...props.imageProps, height: 'auto' }}
        description={{
          text: renderRichText({ content: blok.description }),
          noOfLines: 8,
        }}
        cardProps={{
          padding: 0,
          ...cardWithEqualWidth,
        }}
        cardBodyProps={{ pb: { base: 0, md: 6 } }}
        buttons={buttons(props?.heading?.text as string)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        customModalBody={<LeaderShipOverlay content={blok} />}
        closeButtonProps={{
          borderRadius: '50%',
          top: '34px',
          right: isEnglishLanguage(locale) ? '24px' : 'unset',
          left: isEnglishLanguage(locale) ? 'unset' : '24px',
          margin: 0,
        }}
        size={{ base: 'sm', md: '2xl' }}
        overlayProps={{ bg: 'rgba(34, 34, 34, 0.5)' }}
        contentProps={{ pb: 10 }}
      />
    </>
  );
}
