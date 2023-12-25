import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { SBImage, StoryblokComponentProps } from '@/types/component';
import { Container } from '@chakra-ui/layout';
import Title from '../Title/Title';
import { Button, Cards } from '@tfo/mytfo-components';
import { useRouter } from 'next/router';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { personaTopCardStyleProps } from '@/constants/cards/persona';
import TFOSwiper from '../Carousel/TFOSwiper';
import { SwiperSlide } from 'swiper/react';
import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function TeamMembers({ blok }: StoryblokComponentProps) {
  const { TopImage } = Cards;
  const router = useRouter();

  const { locale } = router;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { text: ctaText, ...ctaRest } = getButtonFromStoryBlok({
    button: blok?.ctas?.[0],
  });

  const getSwiperSlides = () => {
    return blok?.personas?.map(
      ({
        text,
        subHeading,
        _uid,
        image,
      }: {
        text: string;
        subHeading: string;
        _uid: string;
        image: SBImage;
      }) => {
        return (
          <SwiperSlide key={_uid}>
            <TopImage
              {...personaTopCardStyleProps(image, text, subHeading, locale)}
            />
          </SwiperSlide>
        );
      },
    );
  };

  return (
    <Container maxW={MAX_CONTAINER_WIDTH} textAlign="center">
      <Reveal>
        <Title blok={blok?.sectionDetails?.[0]} />
        <Box
          sx={{
            '&': {
              '@media screen and (max-width: 48em)': {
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                '& .swiper': {
                  marginStart: '20px !important',
                },
              },
            },
          }}
        >
          <TFOSwiper
            slidesPerGroup={isMobile ? 1 : 4}
            slidesPerView={isMobile ? 1.5 : 4}
          >
            {getSwiperSlides()}
          </TFOSwiper>
        </Box>
        <Button {...ctaRest} mt="60px">
          {ctaText}
        </Button>
      </Reveal>
    </Container>
  );
}
