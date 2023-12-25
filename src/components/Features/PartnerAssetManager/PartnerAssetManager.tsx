import { StoryblokComponentProps } from '@/types/component';
import { Box, Container, Text } from '@chakra-ui/react';

import { Slide } from '@/types/carousel';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import TFOSwiper from '@/components/Carousel/TFOSwiper';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import TFOSlider from '@/components/Carousel/TFOSlider';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function PartnerAssetManager({
  blok,
  blokType,
}: StoryblokComponentProps) {
  const testimonials = blok?.testimonials?.[0]?.slides;
  const router = useRouter();
  const { locale } = router;

  let textAlignMobile = blok.alignMobile;
  let textAlignDesktop = blok.alignDesktop;

  const textAlign = [
    textAlignMobile || 'start',
    textAlignMobile || 'start',
    textAlignDesktop || 'center',
  ];
  const isBlokTypeHeroFooter = blokType === 'heroFooter';

  const getSlides = (testimonials: Slide[]) => {
    if (!testimonials || !Array.isArray(testimonials)) return [];
    return testimonials.map((testimonial, index) => (
      <SwiperSlide key={index}>
        <Text
          fontStyle="italic"
          fontSize={['lg', '2xl']}
          lineHeight="1.2"
          maxW="2xl"
          textAlign={textAlign}
          margin="auto"
          py="8"
          px={['0', '0', '8']}
        >
          {testimonial?.description}
        </Text>
      </SwiperSlide>
    ));
  };
  return (
    <>
      <Container maxWidth={MAX_CONTAINER_WIDTH}>
        <Reveal>
          <Box>
            {blok?.title && (
              <Text align={textAlign} fontSize={['2xl', '3xl', '4xl']} mb="6">
                {blok?.title}
              </Text>
            )}
            {blok?.description && (
              <Text
                align={textAlign}
                fontSize="md"
                mb={isBlokTypeHeroFooter ? '4' : '6'}
                color="gray.400"
                maxW="lg"
                mx={[0, 0, 'auto']}
                {...(isBlokTypeHeroFooter && {
                  fontSize: 'xs',
                  textTransform: 'uppercase',
                  fontWeight: 'normal',
                  letterSpacing: '2px',
                })}
              >
                {blok?.description}
              </Text>
            )}
            <TFOSlider blok={blok?.logos[0]} blokType={blokType} />
            {testimonials && testimonials.length > 0 && (
              <>
                <Text
                  casing="uppercase"
                  textAlign={textAlign}
                  color="gray.400"
                  letterSpacing={isEnglishLanguage(locale) ? '2px' : ''}
                  mt="8"
                  fontSize={['xs', 'xs', 'md']}
                >
                  {blok?.testimonialTitle}
                </Text>
                <Box
                  sx={{
                    '& .swipper-pagination': {
                      mt: 0,
                    },
                  }}
                >
                  <TFOSwiper
                    slidesPerGroup={1}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    showNavigation={false}
                    showPagination={testimonials.length > 1}
                  >
                    {getSlides(testimonials)}
                  </TFOSwiper>
                </Box>
              </>
            )}
          </Box>
        </Reveal>
      </Container>
    </>
  );
}
