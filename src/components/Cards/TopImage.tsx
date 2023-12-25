import { ARABIC_FONT_FAMILY, ENGLISH_FONT_FAMILY } from '@/constants/globals';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import { Grid, GridItem } from '@chakra-ui/react';
import { Cards, theme } from '@tfo/mytfo-components';
import { CardWithTopImage } from '@tfo/mytfo-components/lib/types/cards/topImage';
import Image from 'next/image';
import { useRouter } from 'next/router';
const { TopImage } = Cards;

export default function CardTopImage({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const getCardsWithTopImage = (cards: any) => {
    return cards?.map((card: any, index: number) => {
      const onClick = () => {
        router.push(card?.ctas?.[0]?.url);
      };
      const props: CardWithTopImage = {
        heading: {
          text: card?.text,
          icon: card?.icon?.filename ? (
            <Image
              src={card?.icon?.filename}
              alt={card?.icon?.alt}
              height={14}
              width={14}
            />
          ) : (
            ''
          ),
          color: theme.colors['tfo'].contrast[200],
        },
        subHeading: {
          text: card?.subHeading,
          fontWeight: 'normal',
          noOfLines: 3,
          fontFamily: isEnglishLanguage(router.locale)
            ? ENGLISH_FONT_FAMILY
            : ARABIC_FONT_FAMILY,
          mt: '14px',
        },
        description: {
          text: blok?.isCardWithTopImage
            ? renderRichText({ content: card?.description })
            : card?.description,
          lineHeight: '120%',
          fontWeight: 'normal',
          fontSize: 'md',
          noOfLines: 3,
          mt: 5,
        },
        imageProps: {
          src: card?.image?.filename,
          alt: card?.image?.alt,
          height: blok?.isCardWithTopImage ? 200 : 'full',
          width: 'full',
          objectFit: blok?.isCardWithTopImage ? 'cover' : 'contain',
        },
        footer: { text: card?.footer },
        buttons: card?.ctas?.map((cta: any) => ({ children: cta.label })),
        handleOnClick: onClick,
      };
      return (
        <GridItem key={`${card?.subHeading} ${index}`}>
          <TopImage {...props} />
        </GridItem>
      );
    });
  };

  return (
    <Grid
      paddingY={10}
      gap={4}
      templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(3, 1fr)' }}
      placeItems={{
        base: 'center',
        md: blok?.isCardWithTopImage ? 'baseline' : 'center',
      }}
    >
      {getCardsWithTopImage(blok?.cards)}
    </Grid>
  );
}
