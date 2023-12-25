import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { Slide } from '@/types/carousel';
import { SBStoryData, StoryblokComponentProps } from '@/types/component';
import {
  Box,
  BoxProps,
  Container,
  HeadingProps,
  Text,
  TextProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { SwiperSlide } from 'swiper/react';
import TFOSwiper from './TFOSwiper';
import Image, { ImageProps } from 'next/image';

type CarouselSlide = {
  type: 'slides' | 'children';
  slide: SBStoryData;
};

export default function TFOCarousel({ blok }: StoryblokComponentProps) {
  let slideProps: BoxProps = {};
  let headingProps: HeadingProps = {};
  let descriptionProps: TextProps = {};
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getSlides = ({ type = 'slides', slide }: CarouselSlide) => {
    let imageProps;
    if (isMobile && slide?.imageMobile) {
      imageProps = getImageFromStoryblok(slide?.imageMobile);
    } else {
      imageProps = getImageFromStoryblok(slide?.image);
    }
    if (type === 'slides') {
      return {
        title: slide?.title,
        description: slide?.description,
        imageProps: imageProps,
      } as Slide;
    }
    // TODO: type === 'children'
    // return <StoryblokComponent />
  };

  if (blok?.type === 'unstyled') {
    slideProps = {
      bg: 'none',
      gap: 6,
    };
    headingProps = {
      mt: '2.5',
      fontSize: { base: 'md', md: 'xl' },
      fontWeight: 'normal',
      textAlign: 'center',
      color: { base: '#F9F9F9', md: '#fff' },
    };
    descriptionProps = {
      fontSize: { base: 'sm', md: 'md' },
      color: 'gray.400',
      textAlign: 'center',
      maxW: { base: '100%', md: '75%' },
    };
  }

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <TFOSwiper
        slidesPerGroup={1}
        slidesPerView={1}
        showNavigation={false}
        showNumbersInPagination={true}
      >
        {blok?.slides?.map((slide: SBStoryData, index: number) => {
          const slideDetail = getSlides({
            type: 'slides',
            slide,
          });
          return (
            <SwiperSlide key={index}>
              <Box
                maxW={['252px', '832px']}
                height={['414px', '456px']}
                position="relative"
                margin="auto"
              >
                {slideDetail?.imageProps && (
                  <Image
                    {...(slideDetail?.imageProps as ImageProps)}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </Box>
              <Box mt={[6, 8]} textAlign="center">
                <Text fontSize={['md', 'xl']} lineHeight="120%">
                  {slideDetail?.title}
                </Text>
                <Text
                  fontSize={['sm', 'md']}
                  lineHeight="120%"
                  color="gray.400"
                  mt={[6, 3]}
                >
                  {slideDetail?.description}
                </Text>
              </Box>
            </SwiperSlide>
          );
        })}
      </TFOSwiper>
    </Container>
  );
}
