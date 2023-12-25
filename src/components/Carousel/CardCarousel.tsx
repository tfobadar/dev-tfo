import React from 'react';
import { useRouter } from 'next/router';
import TFOSwiper from '../Carousel/TFOSwiper';
import { Button, Buttons } from '@tfo/mytfo-components';
import { SwiperSlide, useSwiper } from 'swiper/react';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { ISbStoryData, StoryblokComponent } from '@storyblok/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';

const NavigationComponent = ({ buttons }: { buttons: ButtonsByLimit }) => {
  const router = useRouter();
  const swiper = useSwiper();
  const isLTR = isEnglishLanguage(router.locale);

  return (
    <Flex
      justifyContent="space-between"
      mt={['40px', '40px', '72px']}
      gap={10}
      direction={['column', 'column', 'row']}
      flexDirection={['column-reverse', 'unset']}
    >
      <Buttons {...buttons} />
      <Flex justifyContent="center" gap={10}>
        <Button
          variant="outline"
          borderRadius="full"
          p="0"
          width="40px"
          height="40px"
          className="swiper-button-prev1"
          _after={{
            content: '""',
          }}
          transform={isLTR ? '' : 'rotate(180deg)'}
          isDisabled={swiper.isBeginning}
        >
          <ChevronLeftIcon w="5" h="5" />
        </Button>
        <Button
          variant="outline"
          borderRadius="full"
          p="0"
          width="40px"
          height="40px"
          className="swiper-button-next1"
          _after={{
            content: '""',
          }}
          transform={isLTR ? '' : 'rotate(180deg)'}
          isDisabled={swiper.isEnd}
        >
          <ChevronRightIcon w="5" h="5" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default function CardCarousel({ blok }: StoryblokComponentProps) {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const buttons: ButtonsByLimit = {
    list: blok?.CTAs?.[0]?.buttons.map((button: SBButton) => ({
      ...getButtonFromStoryBlok({ button }),
      width: ['full', 'auto', 'auto'],
      fontWeight: 'medium',
      fontSize: 'lg',
    })),
  };

  return (
    <Flex
      __css={{
        '.swiper-slide.swiper-slide-next +.swiper-slide ~ .swiper-slide': {
          opacity: 0.2,
        },
        '.swiper-slide-prev': {
          opacity: 0.2,
        },
      }}
    >
      <TFOSwiper
        spaceBetween={60}
        showNavigation={true}
        showPagination={false}
        slidesPerGroup={isMobileScreen ? 1 : 3}
        slidesPerView={isMobileScreen ? 1.3 : 3.5}
        showPaginationTop={isMobileScreen ? true : false}
        NavigationComponent={<NavigationComponent buttons={buttons} />}
      >
        {blok.card?.map(
          (component: ISbStoryData & { component: string }, index: number) => (
            <SwiperSlide key={`${component.component}-${index}`}>
              <StoryblokComponent
                blok={component}
                key={`${component.component}-${index}`}
                type={blok.type}
              />
            </SwiperSlide>
          ),
        )}
      </TFOSwiper>
    </Flex>
  );
}
