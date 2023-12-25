import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { SBImage, StoryblokComponentProps } from '@/types/component';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';
import TFOSwiper from '../Carousel/TFOSwiper';

export default function OurGlobalPresence({ blok }: StoryblokComponentProps) {
  const Slide = ({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: SBImage;
  }) => {
    return (
      <Flex
        position="relative"
        h={[230, 320]}
        justifyContent="center"
        alignItems="center"
        objectFit="contain"
        background="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))"
      >
        <Box position="absolute" h={[230, 320]} w="full">
          <Image
            src={image.filename}
            alt={image.alt}
            fill
            style={{
              mixBlendMode: 'overlay',
              objectFit: 'cover',
              borderRadius: '4px',
              position: 'absolute',
            }}
          />
        </Box>
        <Box position="relative" textAlign="center">
          <Heading fontSize={['2xl', '4xl']} mb="4" fontWeight={400}>
            {title}
          </Heading>
          <Text fontSize="sm" maxW="220px">
            {description}
          </Text>
        </Box>
      </Flex>
    );
  };

  const getSlides = (
    slides: {
      title: string;
      description: string;
      image: SBImage;
      _uid: string;
    }[],
  ) => {
    if (!slides || !Array.isArray(slides)) return [];
    return slides.map(({ _uid, ...rest }) => {
      return (
        <SwiperSlide key={_uid}>
          <Slide {...rest} />
        </SwiperSlide>
      );
    });
  };
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Box>
        <TFOSwiper slidesPerView={1} slidesPerGroup={1}>
          {getSlides(blok?.offices?.[0]?.slides)}
        </TFOSwiper>
      </Box>
    </Container>
  );
}
