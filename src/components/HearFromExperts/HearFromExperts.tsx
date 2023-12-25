import React from 'react';
import { StoryblokComponentProps } from '@/types/component';
import { theme, Button } from '@tfo/mytfo-components';
import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import TopImage from '../Cards/TopImage';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function HearFromExperts({ blok }: StoryblokComponentProps) {
  const { title, ctaTitle, cta: ctaUrl } = blok;

  const ctaProps = {
    children: ctaTitle,
    as: NextLink,
    href: getLinkFromStoryblok(ctaUrl),
    variant: 'outline',
    width: { base: 'full', md: 'auto' },
    fontWeight: 'medium',
    onClick: () => {
      trackButtonEvent({
        label: ctaTitle,
        placement: 'middlePage',
      });
    },
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Box>
          <Heading
            as="h3"
            fontWeight={'normal'}
            fontSize={['2xl', '2xl', '4xl']}
            color={theme.colors['tfo'].contrast[200]}
            textAlign={{ base: 'left', md: 'center' }}
            lineHeight={'120%'}
          >
            {title}
          </Heading>
          <Grid>
            <TopImage blok={blok} />
          </Grid>
          <Box textAlign={'center'}>
            <Button {...ctaProps} />
          </Box>
        </Box>
      </Reveal>
    </Container>
  );
}
