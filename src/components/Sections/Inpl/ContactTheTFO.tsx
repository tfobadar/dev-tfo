import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Container } from '@chakra-ui/react';
import { SbBlokData } from '@storyblok/react';
import { useEffect, useRef, useState } from 'react';
import IconWithContent from './IconWithContent';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function ContactTheTFO({ blok }: StoryblokComponentProps) {
  const cardsPerRow = {
    desktop: blok?.cardsPerRow,
    mobile: blok?.cardsPerRowMobile || '1',
  };
  const gaps = {
    row: {
      desktop: blok?.rowGapDesktop || '80',
      mobile: blok?.rowGapMobile || '42',
    },
    column: {
      desktop: blok?.columnGapDesktop || '30',
      mobile: blok?.columnGapMobile || '20',
    },
  };
  const formBlok: SbBlokData = blok;
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
          justifyContent: 'center',
          flexWrap: { base: 'wrap', md: 'wrap' },
          display: { base: 'flex', md: 'flex' },
        };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} ref={elementRef}>
      <Reveal>
        <Box {...responsive}>
          {blok.cards?.map(
            (component: any & { component: string }, index: number) => {
              return (
                <IconWithContent
                  blok={component}
                  formBlok={formBlok}
                  cardsPerRow={cardsPerRow}
                  gaps={gaps}
                  wrapperWidth={width}
                  key={`${component.component}-${index}`}
                />
              );
            },
          )}
        </Box>
      </Reveal>
    </Container>
  );
}
