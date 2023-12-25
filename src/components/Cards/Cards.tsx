import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Container } from '@chakra-ui/react';
import { ISbStoryData, StoryblokComponent } from '@storyblok/react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import CardCarousel from '../Carousel/CardCarousel';
import getBlokTypeCarousel from '@/helpers/getBlokTypeCarousel';
import getBlokTypeCardWithTopImage from '@/helpers/getBlokTypeCardWithTopImage';
import TopImage from './TopImage';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function Cards({ blok, ...rest }: StoryblokComponentProps) {
  const cardsPerRow = {
    desktop: blok.cardsPerRow,
    mobile: blok.cardsPerRowMobile || '1',
  };
  const gaps = {
    row: {
      desktop: blok.rowGapDesktop || '80',
      mobile: blok.rowGapMobile || '42',
    },
    column: {
      desktop: blok.columnGapDesktop || '30',
      mobile: blok.columnGapMobile || '20',
    },
  };
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // @ts-ignore
      setWidth(elementRef?.current?.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const responsive: any =
    blok.type === 'accordionMobile'
      ? {
          gap: 6,
          justifyContent: 'center',
          flexWrap: { base: 'wrap', md: 'wrap' },
          display: { base: 'block', md: 'flex' },
        }
      : {
          columnGap: [
            `${gaps.column.mobile}px`,
            `${gaps.column.mobile}px`,
            `${gaps.column.desktop}px`,
          ],
          rowGap: [
            `${gaps.row.mobile}px`,
            `${gaps.row.mobile}px`,
            `${gaps.row.desktop}px`,
          ],
          justifyContent: 'start',
          flexWrap: { base: 'wrap', md: 'wrap' },
          display: { base: 'flex', md: 'flex' },
        };
  // If the marketType is false then the CardCarousel will run.
  const marketType = getBlokTypeCarousel(blok.type);
  // If the isCardWithTopImage is true then the CardWithTopImage component will show.
  const isCardWithTopImage = getBlokTypeCardWithTopImage(blok.type);

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} ref={elementRef}>
      <Reveal>
        {isCardWithTopImage ? (
          <TopImage
            blok={{ cards: blok?.card, isCardWithTopImage: isCardWithTopImage }}
          />
        ) : (
          <Box sx={marketType ? undefined : responsive}>
            {!marketType ? (
              blok.card?.map(
                (
                  component: ISbStoryData & { component: string },
                  index: number,
                ) => (
                  <StoryblokComponent
                    blok={component}
                    cardsPerRow={cardsPerRow}
                    gaps={gaps}
                    wrapperWidth={width}
                    indexKey={index}
                    key={`${component.component}-${index}`}
                    {...rest}
                  />
                ),
              )
            ) : (
              <CardCarousel blok={blok} />
            )}
          </Box>
        )}
      </Reveal>
    </Container>
  );
}
