import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex, Box } from '@chakra-ui/react';
import { SbBlokData, StoryblokComponent } from '@storyblok/react';
import dynamic from 'next/dynamic';
import useStyles from './useStyles';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function FeatureWithComponents({
  blok,
  ...rest
}: StoryblokComponentProps) {
  const { flexProps } = useStyles(blok);

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex
          direction={{
            base: blok?.flexDirectionMobile || 'column',
            md: blok?.flexDirectionMobile || 'column',
            lg: blok?.flexDirectionDesktop || 'row',
          }}
          {...flexProps}
        >
          <Box width={['full', 'full', '50%']}>
            {blok.leftComponents
              ? blok.leftComponents.map((blok: SbBlokData) => (
                  <StoryblokComponent blok={blok} key={blok._uid} {...rest} />
                ))
              : null}
          </Box>
          <Box width={['full', 'full', '50%']}>
            {blok.rightComponents
              ? blok.rightComponents.map((blok: SbBlokData) => (
                  <StoryblokComponent blok={blok} key={blok._uid} {...rest} />
                ))
              : null}
          </Box>
        </Flex>
      </Reveal>
    </Container>
  );
}
