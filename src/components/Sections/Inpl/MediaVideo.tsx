import Title from '@/components/Title/Title';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex, Box } from '@chakra-ui/react';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function MediaVideo({ blok }: StoryblokComponentProps) {
  const { sectionTitle, video, background } = blok;
  const isBackground = background == true ? 'gray.800' : 'transparent';
  const getResponsiveImage = useResponsiveImage(blok.image, blok?.imageMobile);
  return (
    <Box
      bg={{ md: isBackground }}
      pt={{ base: 50, md: 85 }}
      pb={{ base: 0, md: 85 }}
    >
      <Container maxWidth={MAX_CONTAINER_WIDTH}>
        <Flex
          gap={{ base: 8 }}
          flexDir={{ base: 'column', md: 'column' }}
          alignItems="center"
        >
          <Box w={{ base: 'full', md: '55%' }}>
            <Title blok={sectionTitle?.[0]} />
          </Box>
          <Box w="100%">
            <Reveal>
              <VideoPlayer {...getResponsiveImage} videoUrl={video} />
            </Reveal>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
