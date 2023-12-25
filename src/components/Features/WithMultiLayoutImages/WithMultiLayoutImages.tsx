import renderRichText from '@/helpers/renderRichText';
import {
  SBButton,
  SBIconWithContent,
  StoryblokComponentProps,
} from '@/types/component';
import {
  ButtonProps,
  Container,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Features, Modal } from '@tfo/mytfo-components';
import {
  ButtonsByLimit,
  CardWithIcon,
} from '@tfo/mytfo-components/lib/types/common';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import Image from 'next/image';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { useState } from 'react';
import AssetClass from '@/components/subcomponents/Modals/AssetClass';
import {
  ARABIC_FONT_FAMILY,
  ENGLISH_FONT_FAMILY,
  MAX_CONTAINER_WIDTH,
} from '@/constants/globals';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import { GRID_LIST_PROPS } from './constants';
import dynamic from 'next/dynamic';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';
import IconWithContent from '@/components/Cards/IconWithContent';
import { SbBlokData } from '@storyblok/react';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const { WithMultiLayoutImages } = Features;
export default function FeatureWithMultiLayoutImages({
  blok,
}: StoryblokComponentProps) {
  const { locale } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [modalContent, setModalContent] = useState(null);
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const isDesktopScreen = useBreakpointValue({ base: false, md: true });
  const isImage = blok?.image?.filename;
  const heading = {
    children: blok.heading,
    fontFamily: isEnglishLanguage(locale)
      ? ENGLISH_FONT_FAMILY
      : ARABIC_FONT_FAMILY,
    width: { base: 'full', md: '70%' },
  };
  const description = {
    children: renderRichText({ content: blok.description }),
    color: 'gray.400',
    mt: 6,
    mb: 10,
    width: { base: 'full', md: '70%' },
  };
  const image =
    isImage && !isMobileScreen ? (
      <Image {...getImageFromStoryblok(blok.image)} width={470} height={560} />
    ) : null;
  const grid: ButtonProps[] = blok.grid?.map(
    (gridItem: SBIconWithContent) =>
      ({
        leftIcon: gridItem?.showAnimation ? (
          <LottiePlayer
            blok={{ jsonURL: gridItem?.jsonURL, showInMobile: true }}
            customStyleProps={{
              width: isMobileScreen ? 42 : 60,
              height: isMobileScreen ? 42 : 60,
            }}
            containerCustomStyleProps={{ px: [0, 0, 0, 0], ms: '-2' }}
          />
        ) : (
          <Image
            {...getImageFromStoryblok(gridItem.icon)}
            width={40}
            height={40}
          />
        ),
        children: renderRichText({ content: gridItem.heading }),
        justifyContent: ['space-between', 'space-between', 'center'],
        padding: { base: 2.5, md: 5 },
        width: 'full',
        bgColor: gridItem?.bgColor,
        _hover: {
          bgColor: gridItem?.hoverBgColor,
        },
        fontWeight: 'normal',
        fontSize: { base: 'md', md: '2xl' },
        gap: { base: '4', md: '6' },
        onClick: () => {
          trackButtonEvent({
            label: renderAsString({ content: gridItem.heading }),
            placement: 'middlePage',
          });
          setModalContent(gridItem.modal?.[0]);
          onOpen();
        },
      } as ButtonProps),
  );
  const buttons: ButtonsByLimit = {
    list: blok.ctas?.[0]?.buttons.map((button: SBButton) => ({
      ...getButtonFromStoryBlok({ button }),
      fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
      fontSize: { base: 'md', md: 'lg' },
      width: ['auto', 'auto', 'auto'],
    })),
    ...(blok?.ctas[0]?.alignmentMobile === 'start' && {
      justifyContent: 'flex-start',
    }),
  };
  const list: CardWithIcon[] = blok.list?.map(
    (listItem: SBIconWithContent, index: number) => ({
      key: renderAsString({ content: listItem.heading }),
      heading: {
        children: renderRichText({ content: listItem.heading }),
      },
      image: listItem?.showAnimation ? (
        <LottiePlayer
          blok={{ jsonURL: listItem?.jsonURL, showInMobile: true }}
          customStyleProps={{ width: 52, height: 52, marginBottom: 22 }}
          containerCustomStyleProps={{ px: [0, 0, 0, 0], ms: '-2' }}
        />
      ) : (
        listItem.icon.filename && (
          <Image
            {...getImageFromStoryblok(listItem.icon)}
            width={40}
            height={40}
            style={{ marginBottom: 22 }}
          />
        )
      ),
      wrapperProps:
        isImage && isMobileScreen
          ? { alignItems: 'center', textAlign: 'center' }
          : {},
      description: {
        children: renderRichText({ content: listItem.description }),
        fontSize:
          isImage && index === 0
            ? isMobileScreen
              ? '24px'
              : '4xl'
            : ['md', 'md', isImage ? 'md' : 'xl'],
        color: isImage && index === 0 ? 'white' : 'gray.400',
        mt: '22px',
        mb: isImage ? 'unset' : '24px',
        textAlign: isImage && isMobileScreen && 'center',
      },
      buttons: {
        list: listItem.ctas?.[0]?.buttons.map(
          (button: SBButton) =>
            ({
              ...getButtonFromStoryBlok({ button }),
              textDecoration: 'none',
              _hover: {
                textDecoration: 'underline',
              },
              fontWeight: 'medium',
              fontSize: 'lg',
              lineHeight: '120%',
            } as ButtonsByLimit),
        ),
      } as ButtonsByLimit,
    }),
  );

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        {blok?.hideListInMobile && isMobileScreen ? (
          <>
            {blok?.list?.map((sbData: SbBlokData, index: number) => (
              <IconWithContent key={index} blok={sbData} indexKey={index} />
            ))}
          </>
        ) : (
          <WithMultiLayoutImages
            heading={heading}
            description={description}
            grid={grid}
            list={list}
            image={image}
            buttons={buttons}
            gridListProps={{
              gap: [4, 4, 10],
              justifyContent: { base: 'space-between', md: 'flex-start' },
              // @ts-ignore
              ...GRID_LIST_PROPS,
            }}
            wrapperProps={{
              alignItems: isImage && 'center',
              gap: isImage && !isMobileScreen && 8,
            }}
            listItemProps={{
              justifyContent: isImage && isMobileScreen && 'center',
              border: isImage && isMobileScreen && '0px',
            }}
            cardListProps={{
              gap: 24,
            }}
            detailsWrapper={{
              ...(blok.list.length > 0 && !isImage
                ? {
                    position: { base: 'unset', md: 'sticky' },
                    top: 56,
                    alignItems: 'center',
                  }
                : {}),
              display: isImage && isMobileScreen && 'none',
            }}
          />
        )}
      </Reveal>
      {modalContent && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          customModalBody={<AssetClass content={modalContent} />}
          closeButtonProps={{
            marginTop: 6,
            borderRadius: '50%',
            right: isEnglishLanguage(locale) ? 3 : 'unset',
            left: isEnglishLanguage(locale) ? 'unset' : 3,
          }}
          size={'2xl'}
          overlayProps={{ bg: 'rgba(34, 34, 34, 0.5)' }}
          contentProps={{ pb: 6 }}
        />
      )}
    </Container>
  );
}
