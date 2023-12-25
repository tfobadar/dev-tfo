import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import { Cards, Modal } from '@tfo/mytfo-components';
import Image from 'next/image';
import INPLScheduleCall from '@/components/Forms/INPLScheduleCall';
import {
  ButtonProps,
  HeadingProps,
  TextProps,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { Card } from '@/types/card';
import { useCardWithEqualWidth } from '@/hooks/useCardWithEqualWidth';
import { SBImage } from '@/types/component';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';

const { WithIcon: CardWithIcon } = Cards;

export default function IconWithContent({
  blok,
  formBlok,
  cardsPerRow,
  gaps,
  wrapperWidth,
}: any) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { desktop = '4', mobile = '1' } = cardsPerRow ?? {};
  const cardWithEqualWidth = useCardWithEqualWidth({
    desktop,
    mobile,
    gaps,
    wrapperWidth,
  });
  const router = useRouter();
  const { locale } = router;
  const dir = locale == 'en' ? false : true;

  let wrapperProps = {};
  let image = {};
  let headingProps: HeadingProps = {};
  let descriptionProps: TextProps = {};

  wrapperProps = {
    bg: 'gray.800',
    paddingY: 10,
    paddingX: 8,
    border: '1px solid',
    borderColor: 'gray.750',
    borderRadius: 4,
    justifyContent: 'space-between',
  };
  headingProps = {
    fontSize: '4xl',
  };
  descriptionProps = {
    color: 'gray.400',
  };

  wrapperProps = {
    ...wrapperProps,
    ...cardWithEqualWidth,
  };

  const ImageValue = {
    ...getImageFromStoryblok(blok.icon),
    width: 40,
    height: 40,
    style: { marginBottom: 36 },
  };

  const isImage: any = blok.type !== 'accordionMobile' && ImageValue;

  if (blok.type === 'card') {
    image = {
      image: <Image {...isImage} />,
    };
  }

  if (blok.component === 'iconWithContent') {
    image = {
      image: <Image {...isImage} />,
    };
    wrapperProps = {
      ...wrapperProps,
      alignItems: [blok.contentAlignMobile, blok.contentAlignMobile, 'center'],
    };
    descriptionProps = {
      color: 'gray.400',
      fontSize: 'md',
      lineHeight: '120%',
      textAlign: [blok.contentAlignMobile, blok.contentAlignMobile, 'center'],
    };
    headingProps = {
      fontSize: 'lg',
      color: 'white',
      lineHeight: '120%',
    };
  }

  if (blok?.type === 'inplContact') {
    image = {
      image: (
        <Image
          {...isImage}
          src={
            `${
              (blok?.icon as SBImage)?.filename
            }/m/fit-in/70x50/filters:fill(transparent)` as string
          }
          objectFit="contain"
          width={50}
          height={50}
        />
      ),
    };
    wrapperProps = {
      ...wrapperProps,
      justifyContent: 'flex-start',
      minW: '250px',
      paddingX: 5,
    };
  }

  const directionsArrow =
    blok.type === 'accordionMobile' &&
    (dir ? <ChevronLeftIcon h="7" w="6" /> : <ChevronRightIcon h="7" w="6" />);

  const [isSmaller] = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <CardWithIcon
        wrapperProps={wrapperProps}
        {...image}
        heading={{
          children: renderRichText({ content: blok.heading }),
          ...headingProps,
        }}
        description={{
          children: renderRichText({ content: blok.description }),
          ...descriptionProps,
        }}
        buttons={{
          list: blok.ctas?.[0]?.buttons.map(
            (button: any) =>
              ({
                ...getButtonFromStoryBlok({ button }),
                rightIcon: directionsArrow,
                alignItems: 'center',
                textDecoration: 'none',
                _hover: {
                  textDecoration: 'none',
                },
                onClick: () => {
                  trackButtonEvent({
                    label: renderAsString({ content: button.text }),
                    placement: 'middlePage',
                  });
                  button.type == 'button' && onOpen();
                },
              } as unknown as ButtonProps),
          ),
          ...{
            ...(blok?.type === 'inplContact'
              ? {
                  flex: 1,
                  alignItems: 'flex-end',
                }
              : {}),
          },
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        customModalBody={<INPLScheduleCall blok={formBlok} />}
        closeButtonProps={{
          borderRadius: '50%',
          top: '34px',
          margin: 0,
          right: isEnglishLanguage(locale) ? '24px' : 'unset',
          left: isEnglishLanguage(locale) ? 'unset' : '24px',
        }}
        size={{ base: 'sm', md: '2xl' }}
        overlayProps={{ bg: 'rgba(34, 34, 34, 0.5)' }}
        contentProps={{ pb: 10 }}
      />
    </>
  );
}
