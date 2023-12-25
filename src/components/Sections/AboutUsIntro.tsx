import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import renderRichText from '@/helpers/renderRichText';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react';
import { Buttons } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);

export default function AboutUsIntro({ blok }: StoryblokComponentProps) {
  const description = renderRichText({ content: blok?.description });
  const { locale } = useRouter();

  const buttons: ButtonsByLimit = {
    list: blok?.ctas?.[0]?.buttons.map((button: SBButton) => ({
      ...getButtonFromStoryBlok({ button }),
      fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
      fontSize: ['md', 'lg'],
      justifyContent: 'start',
      width: 'auto',
    })),
    justifyContent: 'start',
  };
  return (
    <Container maxW={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Grid
          gridTemplateColumns={['1fr', '1.4fr 2fr']}
          gap={[6, 20]}
          autoFlow={['row', 'column']}
        >
          <Heading fontWeight="normal" as="h2">
            {blok?.title}
          </Heading>
          <Box>
            <Text color="gray.400" lineHeight="19.2px" mb="16">
              {description}
            </Text>
            <Buttons {...buttons} />
          </Box>
        </Grid>
      </Reveal>
    </Container>
  );
}
