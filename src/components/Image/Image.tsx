import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex, Image as ChakraImage } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function Image({ blok }: StoryblokComponentProps) {
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex w={'100%'} justifyContent={blok?.align}>
          <ChakraImage
            src={blok.url.filename}
            alt={blok.url.alt}
            height={245}
            width={196}
            style={{ objectFit: 'contain' }}
          />
        </Flex>
      </Reveal>
    </Container>
  );
}
