import { Features } from '@tfo/mytfo-components';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { Container, ImageProps } from '@chakra-ui/react';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import renderRichText from '@/helpers/renderRichText';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const { WithSideHug: TFOWithSideHug } = Features;

export default function WithSideHug({ blok }: StoryblokComponentProps) {
  const { locale } = useRouter();
  const heading = {
    children: blok.heading,
  };
  const description = {
    children: renderRichText({
      content: blok.description,
    }),
  };
  const getResponsiveImage = useResponsiveImage(blok.image, blok?.imageMobile);
  const sideHugImage = {
    ...getResponsiveImage,
    width: {
      base: '100%',
      md: 452,
    },
    height: {
      height: '100%',
    },
  } as ImageProps;

  const sideHugImageInpl = {
    ...getResponsiveImage,
    width: {
      base: '100%',
      md: 468,
    },
    height: '100%',
    objectFit: 'contain',
  } as ImageProps;

  const getListData = (data: any) => {
    return data.map((value: any) => {
      const heading = {
        children: renderRichText({ content: value.heading }),
      };
      const description = {
        children: renderRichText({ content: value.description }),
      };

      return {
        heading: heading,
        subHeading: description,
      };
    });
  };

  const sideHugCtaButtons: ButtonsByLimit = {
    limit: 2,
    paddingTop: { base: '0', md: '3' },
    list: blok.ctas?.[0]?.buttons?.map((button: SBButton) => {
      // if button is unstyled, we assume it has link within the rich text content
      let cursorPointer =
        button.variant === 'unstyled'
          ? { cursor: 'default', fontWeight: 'normal', fontSize: 'md' }
          : { cursor: 'pointer' };
      return {
        ...getButtonFromStoryBlok({ button }),
        fontSize: 'md',
        fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
        color: 'gray.850',
        ...cursorPointer,
      };
    }),
  };
  const contentOrder = {
    order: blok.imagePosition == 'right' ? { base: 2, md: 1 } : 2,
    mt: { base: '32px', md: 'unset' },
  };
  const imageOrder = {
    order: blok.imagePosition == 'right' ? { base: 1, md: 2 } : 1,
    justifyContent: blok.imagePosition == 'right' ? 'end' : 'start',
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        {blok.variant == 'basic' && (
          <TFOWithSideHug
            variant={blok.variant}
            heading={heading}
            description={description}
            imageProps={sideHugImage}
            buttons={sideHugCtaButtons}
            contentWrapper={contentOrder}
            imageWrapper={imageOrder}
          />
        )}

        {blok.variant == 'inpl' && (
          <TFOWithSideHug
            variant="basic"
            heading={heading}
            description={description}
            imageProps={sideHugImageInpl}
            buttons={sideHugCtaButtons}
            contentWrapper={contentOrder}
            imageWrapper={imageOrder}
          />
        )}

        {blok.variant == 'list' && (
          <TFOWithSideHug
            variant={blok.variant}
            imageProps={sideHugImage}
            buttons={sideHugCtaButtons}
            data={getListData(blok.list)}
          />
        )}
      </Reveal>
    </Container>
  );
}
