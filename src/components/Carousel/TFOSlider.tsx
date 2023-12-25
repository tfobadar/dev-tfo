import { SBStoryData, StoryblokComponentProps } from '@/types/component';
import {
  Divider,
  Box,
  Container,
  useBreakpointValue,
  Flex,
  Image,
} from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { SwiperSlide } from 'swiper/react';
import TFOSwiper from './TFOSwiper';

export default function TFOSlider({ blok, blokType }: StoryblokComponentProps) {
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const isBlokTypeHeroFooter = blokType === 'heroFooter';
  const pseudoElementCommonStyles = {
    content: '""',
    width: isMobileView ? '90px' : '150px',
    height: 'full',
    position: 'absolute',
    top: '0',
    zIndex: '10',
    pointerEvents: 'none',
    direction: 'ltr',
  };
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Box
        mt={isBlokTypeHeroFooter ? '0' : '16'}
        mb={isBlokTypeHeroFooter ? '0' : '24'}
        __css={{
          '.swiper': {
            position: 'relative',
            '&:before': {
              ...pseudoElementCommonStyles,
              left: '0',
              bg: 'linear-gradient(to right, #111 44%, rgba(17,17,17,70%) 70%, rgb(17,17,17,25%) 90%, rgb(17,17,17,10%) 100%)',
            },
            '&:after': {
              ...pseudoElementCommonStyles,
              right: '0',
              bg: 'linear-gradient(to left, #111 44%, rgba(17,17,17,70%) 70%, rgb(17,17,17,25%) 90%, rgb(17,17,17,10%) 100%)',
            },
          },
          '.swiper-wrapper': {
            alignItems: 'center',
            '.swiper-slide': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        }}
      >
        <TFOSwiper
          slidesPerGroup={
            isMobileView
              ? blok?.slidesPerRowMobile || 2
              : blok?.slidesPerRowDesktop || 1
          }
          slidesPerView={
            isMobileView
              ? blok?.slidesPerRowMobile || 2
              : blok?.slidesPerRowDesktop || 1
          }
          showNavigation={false}
          showPagination={false}
          grabCursor={true}
          loop={true}
          allowTouchMove={false}
          autoplay={
            blok?.enableAutoPlaySlides
              ? {
                  delay: 1000,
                  disableOnInteraction: false,
                }
              : false
          }
          speed={blok?.speed || 10000}
          observer={true}
          observeParents={true}
          spaceBetween={0}
          style={{
            minHeight: '100%',
          }}
        >
          {blok?.slides?.map((slide: SBStoryData, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Flex pos="relative" width="full" px={5}>
                  <Image
                    src={slide?.image?.filename || ''}
                    alt={slide?.image?.alt || ''}
                    width="100%"
                    height={
                      isBlokTypeHeroFooter
                        ? isMobileView
                          ? '50px'
                          : '45px'
                        : '50px'
                    }
                    loading="lazy"
                  />
                  <Box className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                </Flex>
                <Divider
                  role="presentation"
                  orientation="vertical"
                  height="20px"
                  opacity="1"
                  borderLeftWidth="2px"
                  borderColor="gray.700"
                  position="absolute"
                  right="0"
                  top="50%"
                  transform="translateY(-50%)"
                />
              </SwiperSlide>
            );
          })}
        </TFOSwiper>
      </Box>
    </Container>
  );
}
