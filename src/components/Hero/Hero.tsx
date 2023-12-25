import { SBButton, StoryblokComponentProps } from '@/types/component';
import {
  Box,
  BoxProps,
  Container,
  FlexProps,
  HeadingProps,
  ImageProps,
  TextProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Hero as TFOHero } from '@tfo/mytfo-components';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import renderRichText from '@/helpers/renderRichText';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import {
  ARABIC_FONT_FAMILY,
  ENGLISH_FONT_FAMILY,
  MAX_CONTAINER_WIDTH,
} from '@/constants/globals';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { trackLinkEvent } from '@/helpers/trackClickEvents';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';
import Image from 'next/image';
import { SBImage } from '@/types/component';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { StoryblokComponent } from '@storyblok/react';

export default function Hero({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const {
    ctas: heroCtas,
    description,
    heading,
    videoURL,
    isImageBackground,
    showBackgroundOnMobile = false,
    showBackButton,
    breadCrumb,
    type = 'page',
    fullHeight,
    backButtonText,
    bulletsType,
    customVideoPlacement = false,
    heroBannerLink,
    mobileImagePosition,
    showFullWidthBgImage,
    showBgVideo,
  } = blok;
  const isMobile = useBreakpointValue({ base: true, lg: false });
  // by default, full width hero
  let wrapperProps: BoxProps = {};
  let heroHeight = type === 'article' ? 260 : 380;
  let Wrapper = Box;
  let backgroundWrapperProps: BoxProps = {
    paddingTop: [
      mobileImagePosition === 'top' ? 8 : 20,
      mobileImagePosition === 'top' ? 8 : 20,
      0,
    ],
    paddingBottom: [4, 4, 0],
    // @ts-ignore
    '& div:nth-of-type(1)': {
      justifyContent: {
        base: 'center',
        md: fullHeight ? 'center' : 'flex-start',
      },
      px: 0,
    },
    display: 'flex',
    flexDirection: mobileImagePosition === 'top' ? 'column-reverse' : 'column',
    ...(showFullWidthBgImage && { p: [0, 0] }),
  };
  let contentMainWrapperProps: FlexProps = {
    pos: 'absolute',
    height: '90%',
  };
  if (fullHeight) {
    heroHeight = showFullWidthBgImage ? 800 : 600;
  }
  let imageOuterWrapperProps = {
    height: [
      mobileImagePosition === 'top'
        ? '244px'
        : showFullWidthBgImage
        ? 800
        : '218px',
      mobileImagePosition === 'top'
        ? '244px'
        : showFullWidthBgImage
        ? 800
        : '218px',
      `${heroHeight}px`,
    ],
    paddingBottom: '0!important',
    display: [
      `${showBackgroundOnMobile ? 'block' : 'none'}`,
      `${showBackgroundOnMobile ? 'block' : 'none'}`,
      'block',
    ],
    marginBottom: mobileImagePosition === 'top' ? 8 : 'inherit',
    ...(showFullWidthBgImage && { pos: 'relative' }),
  };

  let imageWrapperProps: BoxProps = {};
  if (isMobile) {
    imageWrapperProps = {
      position: 'absolute',
      width: 'calc(100% + 40px)',
      height: 'calc(100% + 40px)',
      top: '-5',
      left: '-5',
    };
  }
  if (isImageBackground || showBgVideo) {
    imageWrapperProps = {
      ...imageWrapperProps,
      sx: {
        '&::after': {
          content: "''",
          background:
            'linear-gradient(180deg, rgba(17, 17, 17, 0.00) 82.52%, #111 100%)',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'full',
          height: '85%',
          zIndex: 1,
        },
      },
    };
  }

  // determine if its full width image or default center styled container Hero
  if (!isImageBackground && !showBgVideo) {
    Wrapper = Container;
    wrapperProps = {
      maxWidth: MAX_CONTAINER_WIDTH,
    };
    backgroundWrapperProps = { maxHeight: 'auto' };
  }
  const heroHeading = {
    text: renderRichText({ content: heading }),
    as: 'h1',
    color: 'white',
    textAlign: {
      base: type === 'article' ? 'start' : 'unset',
      md: fullHeight ? 'center' : 'start',
    },
    fontSize: {
      base: '3xl',
      md: isImageBackground || showBgVideo ? '5xl' : '4xl',
    },
    fontFamily: isEnglishLanguage(router.locale)
      ? ENGLISH_FONT_FAMILY
      : ARABIC_FONT_FAMILY,
    ...(showFullWidthBgImage && {
      fontWeight: { base: 'normal', md: 'medium' },
    }),
  } as HeadingProps;

  const heroCtaButtons: ButtonsByLimit = {
    limit: 2,
    flexDirection: ['column', 'column', 'row'],
    justifyContent: fullHeight ? 'center' : 'unset',
    alignItems: 'center',
    list: heroCtas?.[0]?.buttons?.map(
      (button: SBButton & SBImage, indx: number) => {
        // if button is unstyled, we assume it has link within the rich text content
        let cursorPointer =
          button.variant === 'unstyled'
            ? { cursor: 'default', fontWeight: 'normal', fontSize: 'md' }
            : { cursor: 'pointer' };

        let buttonIcon = null;
        if (button.icon && button?.icon?.filename !== '') {
          const ImageValue = {
            ...getImageFromStoryblok(button?.icon),
            width: 18,
            height: 18,
          };
          buttonIcon = <Image {...ImageValue} />;
        }

        return {
          key: indx,
          ...getButtonFromStoryBlok({ button }),
          fontSize: { base: 'md', md: 'lg' },
          fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
          alignItems: 'center',
          width: { base: 'fit-content', md: 'auto' },
          rightIcon: buttonIcon,
          ...cursorPointer,
        };
      },
    ),
  };

  const heroWithBgButtons: ButtonsByLimit = {
    limit: 2,
    flexDirection: ['column', 'column', 'row'],
    list: heroCtas?.[0]?.buttons?.map((button: SBButton) => {
      // if button is unstyled, we assume it has link within the rich text content
      let cursorPointer =
        button.variant === 'unstyled'
          ? {
              cursor: 'default',
              fontWeight: 'normal',
              fontSize: { base: 'md', md: 'lg' },
            }
          : { cursor: 'pointer' };

      return {
        ...getButtonFromStoryBlok({ button }),
        fontSize: { base: 'md', md: 'lg' },
        fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
        width: 'fit-content',
        ...cursorPointer,
      };
    }),
    alignItems: 'center',
    justifyContent: showFullWidthBgImage && 'center',
  };
  const backNav: ButtonsByLimit = showBackButton && {
    list: [
      {
        text: backButtonText,
        leftIcon: isEnglishLanguage(router.locale) ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        ),
        color: 'white',
        variant: 'link',
        fontSize: 'lg',
        mb: 5,
        textDecoration: 'none',
        onClick: () => {
          trackLinkEvent({ label: 'Back' });
          router.back();
        },
        _focus: { bg: 'transparent' },
        display: { base: 'none', md: 'flex' },
      },
    ],
  };
  const breadCrumbs = {
    breadcrumbItems: breadCrumb?.[0]?.breadCrumbs.map((item: any) => {
      return {
        text: item.text,
        isCurrentPage: item.isCurrentPage,
        href: getLinkFromStoryblok(item.href),
        onClick: () => {
          item.isCurrentPage
            ? null
            : trackLinkEvent({ label: item.text, placement: 'middlePage' });
        },
      };
    }),
    display: breadCrumb?.[0] ? 'block' : 'none',
  };
  const getResponsiveImage = useResponsiveImage(blok.image, blok?.imageMobile);
  const video = (
    <VideoPlayer
      {...getResponsiveImage}
      videoUrl={videoURL || null}
      heroBannerLink={heroBannerLink || null}
    />
  );
  const bgImage = {
    ...getResponsiveImage,
    borderRadius: 0,
    display: ['block'],
    maxHeight: heroHeight,
  } as ImageProps;

  const bgVideo = (
    <video
      src={videoURL}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: '100%',
        height: '85%',
        objectFit: 'cover',
        position: 'relative',
        zIndex: 0,
        opacity: 0.2,
      }}
    />
  );

  const heroDescription = {
    text: renderRichText({ content: description, bulletsType: bulletsType }),
    color:
      isImageBackground || showBgVideo
        ? { base: 'gray.400', md: 'white' }
        : 'gray.400',
    mt: 5,
    textAlign: { base: 'unset', md: fullHeight ? 'center' : 'start' },
    fontSize: { base: 'md', md: 'lg' },
    display: description?.content?.[0]?.content ? 'block' : 'none',
  } as TextProps;

  return (
    <Wrapper {...wrapperProps}>
      <TFOHero
        variant={
          isImageBackground
            ? 'with-background'
            : showBgVideo
            ? 'with-video-background'
            : 'basic'
        }
        backgroundWrapperProps={backgroundWrapperProps}
        imageProps={bgImage}
        heading={heroHeading}
        videoPlayer={showBgVideo ? bgVideo : video}
        buttons={heroCtaButtons}
        description={heroDescription}
        imageOuterWrapperProps={imageOuterWrapperProps}
        backNav={backNav}
        breadcrumb={breadCrumbs}
        heroWithBgButtons={heroWithBgButtons}
        {...(showFullWidthBgImage && { imageWrapperProps: imageWrapperProps })}
        {...(showFullWidthBgImage && {
          contentMainWrapperProps: contentMainWrapperProps,
        })}
        contentWrapperProps={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          px: { base: 0, md: '20px !important', lg: 0 },
        }}
        customVideoPlacement={isMobile ? customVideoPlacement : false}
        // @ts-ignore
        gap={{ base: customVideoPlacement ? 3 : 16, lg: 16 }}
        {...(blok?.footer?.length && {
          footerContainer: (
            <Box>
              {blok.footer.map((footerItem: any) => (
                <StoryblokComponent
                  blok={footerItem}
                  key={footerItem}
                  blokType="heroFooter"
                />
              ))}
            </Box>
          ),
          footerContainerProps: {
            w: 'full',
            bottom: '20px',
            zIndex: '3',
            ...(isMobile && {
              width: 'auto',
              transform: 'none',
              left: '-5',
              right: '-5',
            }),
          },
        })}
      />
    </Wrapper>
  );
}
