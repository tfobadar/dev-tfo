import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Heading, Text } from '@chakra-ui/react';
import { Buttons } from '@tfo/mytfo-components';
import AccordionGrid from '../AccordionGrid/AccordionGrid';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function CorePrinciples({ blok }: StoryblokComponentProps) {
  const { locale } = useRouter();
  const ctaStyle = {
    fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
    fontSize: ['md', 'lg'],
    width: 'auto',
  };
  const buttons = {
    ...getButtonsListFromStoryblok({
      ctas: blok.ctas,
      buttonsProps: [
        {
          ...ctaStyle,
        },
        {
          ...ctaStyle,
        },
      ],
    }),
  } as ButtonsByLimit;

  return (
    <Container
      maxW={MAX_CONTAINER_WIDTH}
      textAlign={{ base: 'start', md: 'center' }}
    >
      <Reveal>
        <Heading
          fontWeight="400"
          mx="auto"
          fontSize={{ base: '2xl', lg: '4xl' }}
          mb="6"
        >
          {blok?.title}
        </Heading>
        <Text
          color="gray.400"
          maxW="3xl"
          mx="auto"
          lineHeight="22px"
          mb={{ base: '8', lg: '16' }}
        >
          {blok?.description}
        </Text>
        <AccordionGrid accordionItems={blok?.principles?.[0]?.accordionItems} />
        <Buttons {...buttons} mt="16" />
      </Reveal>
    </Container>
  );
}
