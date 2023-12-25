import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import { SBButton } from '@/types/component';
import { Accordion, Cards, Button } from '@tfo/mytfo-components';
import Image from 'next/image';
import {
  ButtonProps,
  Flex,
  HeadingProps,
  TextProps,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { Card } from '@/types/card';
import { useCardWithEqualWidth } from '@/hooks/useCardWithEqualWidth';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import {
  ARABIC_FONT_FAMILY,
  ENGLISH_FONT_FAMILY,
  PAGE_BANNER_TYPES,
} from '@/constants/globals';
import {
  trackAccordianEvent,
  trackLocationEvent,
} from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import getBlokTypeCarousel from '@/helpers/getBlokTypeCarousel';
import IconWithContentHeading from './subcomponents/IconWithContentHeading';
import { RefferalRewardInfoType } from '@/types/referral';
import { useState } from 'react';

const { WithIcon: CardWithIcon } = Cards;
export default function IconWithContent({
  blok,
  cardsPerRow,
  gaps,
  wrapperWidth,
  type,
  indexKey,
  ...rest
}: Card & {
  getReferralRewardInfo?: RefferalRewardInfoType[];
  indexKey: number;
}) {
  const { getReferralRewardInfo } = rest;
  const isMobile = useBreakpointValue({ base: true, md: false });
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

  const iconSize = isMobile ? blok?.iconSizeMobile : blok.iconSizeDesktop;

  let wrapperProps = {};
  let image = {};
  let headingProps: HeadingProps = {};
  let descriptionProps: TextProps = {};
  const marketPlace = getBlokTypeCarousel(type as string);

  if (
    blok.type === 'card' ||
    blok.type === 'accordionMobile' ||
    blok.type === PAGE_BANNER_TYPES.REFERRAL ||
    blok.type === 'career'
  ) {
    wrapperProps = {
      bg: 'gray.850',
      paddingY: 10,
      paddingX: 8,
      border: '1px solid',
      borderColor: 'gray.750',
      borderRadius: 4,
      justifyContent: blok.type === 'accordionMobile' && 'space-between',
      ...(blok?.showDescEllipsis ? { mb: '10' } : false),
    };
    headingProps = {
      fontSize: blok.type !== 'accordionMobile' ? 'lg' : '4xl',
      fontFamily: isEnglishLanguage(locale)
        ? ENGLISH_FONT_FAMILY
        : ARABIC_FONT_FAMILY,
    };
    descriptionProps = {
      color: 'gray.400',
    };
  }
  wrapperProps = {
    ...wrapperProps,
    ...cardWithEqualWidth,
  };

  const ImageValue = {
    ...getImageFromStoryblok(blok.icon),
    width: blok.type == PAGE_BANNER_TYPES.REFERRAL ? 310 : iconSize ?? 40,
    height: blok.type == PAGE_BANNER_TYPES.REFERRAL ? 170 : iconSize ?? 40,
    style: {
      marginBottom:
        blok.type == PAGE_BANNER_TYPES.REFERRAL
          ? 32
          : blok?.showDescEllipsis
          ? 10
          : 36,
    },
  };

  const isImage: any = blok.type !== 'accordionMobile' && ImageValue;

  if (blok.type === 'card') {
    image = {
      image: <Image {...isImage} />,
    };
  }

  const [isEllipsisDescriptionOpen, setIsEllipsisDescriptionOpen] =
    useState(false);

  const buttonStyles: ButtonProps = {
    variant: 'ghost',
    p: '0',
    onClick: () => setIsEllipsisDescriptionOpen(!isEllipsisDescriptionOpen),
    _hover: { bgColor: 'transparent' },
    _focus: { bgColor: 'transparent' },
    _active: { bgColor: 'transparent' },
  };

  if (blok.component === 'iconWithContent') {
    if (blok?.icon?.filename) {
      if (blok?.showDescEllipsis) {
        image = {
          image: (
            <Flex
              w="full"
              alignItems="self-start"
              justifyContent="space-between"
            >
              <Image {...isImage} />
              <Button {...buttonStyles}>
                <ChevronDownIcon
                  fontSize="3xl"
                  transition="transform 0.2s"
                  transformOrigin="center"
                  color="tfo.primary.500"
                  {...(isEllipsisDescriptionOpen
                    ? {
                        transform: 'rotate(-180deg)',
                      }
                    : false)}
                />
              </Button>
            </Flex>
          ),
        };
      } else {
        image = {
          image: blok.type !== 'accordionMobile' && <Image {...isImage} />,
        };
      }
    }
    wrapperProps = {
      ...wrapperProps,
      alignItems: [blok.contentAlignMobile, blok.contentAlignMobile, 'start'],
      ...(blok?.showDescEllipsis && { py: 8, px: 4, mb: 4 }),
    };
    descriptionProps = {
      color: 'gray.400',
      fontSize: blok?.showDescEllipsis ? 'lg' : 'md',
      lineHeight: '120%',
      textAlign: [blok.contentAlignMobile, blok.contentAlignMobile, 'start'],
    };
    headingProps = {
      fontSize: blok.type === 'accordionMobile' ? '4xl' : 'lg',
      fontFamily: isEnglishLanguage(locale)
        ? ENGLISH_FONT_FAMILY
        : ARABIC_FONT_FAMILY,
      color: 'white',
      lineHeight: '120%',
    };
  }
  if (blok.type === 'career') {
    image = {};
    wrapperProps = {
      ...wrapperProps,
      paddingX: 6,
      paddingY: 6,
    };
    headingProps = {
      ...headingProps,
      fontSize: { base: 'lg', md: 'xl' },
    };
    descriptionProps = {
      ...descriptionProps,
      fontSize: { base: 'md', md: 'lg' },
      mt: 8,
      mb: 0,
    };
  }
  if (blok.type === PAGE_BANNER_TYPES.REFERRAL) {
    wrapperProps = {
      ...wrapperProps,
      paddingX: 8,
      paddingY: 8,
      alignItems: 'center',
    };
    headingProps = {
      ...headingProps,
      fontSize: 'xl',
      fontWeight: 'medium',
      textAlign: 'center',
      mb: 8,
    };
    descriptionProps = {
      ...descriptionProps,
      textAlign: 'center',
      my: 0,
      fontSize: 'md',
      fontWeight: 'normal',
      color: 'gray.400',
    };
  }
  const directionsArrow =
    blok.type === 'accordionMobile' &&
    (dir ? <ChevronLeftIcon h="7" w="6" /> : <ChevronRightIcon h="7" w="6" />);

  const [isSmaller] = useMediaQuery('(max-width: 480px)');

  return (
    <>
      {isSmaller && blok.type == 'accordionMobile' ? (
        <Accordion
          defaultIndex={blok.isOpenInMobileAccordian ? [0] : undefined}
          accordionItems={[
            {
              title: renderRichText({ content: blok.heading }),
              description: renderRichText({ content: blok.description }),
            },
          ]}
          itemProps={{
            bg: 'gray.850',
            marginBottom: { base: 4, md: '0' },
            border: '1px solid',
            borderColor: 'gray.750',
          }}
          buttonProps={{
            fontSize: 'xl',
            pt: 5,
            px: 4,
            pb: 4,
            onClick: () => {
              trackAccordianEvent({
                label: renderAsString({ content: blok.heading }),
                placement: 'middlePage',
              });
            },
          }}
          panelProps={{
            color: 'gray.400',
            textAlign: 'start',
            p: '4',
          }}
          buttons={{
            list: blok.ctas?.[0]?.buttons.map(
              (button: SBButton) =>
                ({
                  ...getButtonFromStoryBlok({ button }),
                  rightIcon: directionsArrow,
                  alignItems: blok.type === 'accordionMobile' && 'center',
                  textDecoration: 'none',
                  marginTop: 2.5,
                  _hover: {
                    textDecoration: 'underline',
                  },
                  onClick: () => {
                    trackLocationEvent({
                      label:
                        renderAsString({ content: blok.heading }) +
                        '-' +
                        renderAsString({ content: button.text }),
                    });
                  },
                } as unknown as ButtonProps),
            ),
          }}
        />
      ) : (
        <CardWithIcon
          wrapperProps={marketPlace ? {} : wrapperProps}
          {...image}
          heading={{
            children: (
              <IconWithContentHeading
                blok={blok}
                indexKey={indexKey}
                {...rest}
              />
            ),
            ...headingProps,
            ...(blok?.showDescEllipsis
              ? {
                  maxWidth: '80%',
                }
              : false),
          }}
          description={{
            children: renderRichText({
              content: blok.description,
              formValues: getReferralRewardInfo?.length && {
                amount: getReferralRewardInfo[indexKey].Amount,
              },
            }),
            ...descriptionProps,
            ...(blok?.showDescEllipsis
              ? {
                  maxWidth: '80%',
                  mt: 3,
                  mb: 2,
                  fontWeight: 'normal',
                  ...(!isEllipsisDescriptionOpen
                    ? {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }
                    : false),
                }
              : false),
          }}
          buttons={{
            list: blok.ctas?.[0]?.buttons.map(
              (button: SBButton) =>
                ({
                  ...getButtonFromStoryBlok({ button }),
                  rightIcon: directionsArrow,
                  alignItems: blok.type === 'accordionMobile' && 'center',
                  textDecoration: 'none',
                  _hover: {
                    textDecoration: 'underline',
                  },
                  onClick: () => {
                    trackLocationEvent({
                      label:
                        renderAsString({ content: blok.heading }) +
                        '-' +
                        renderAsString({ content: button.text }),
                    });
                  },
                } as unknown as ButtonProps),
            ),
          }}
        />
      )}
    </>
  );
}
