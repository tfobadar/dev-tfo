import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { Button } from '@tfo/mytfo-components';
import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, useSwiper, SwiperProps, SwiperRef } from 'swiper/react';

const CustomizeNavigation = () => {
  const router = useRouter();
  const swiper = useSwiper();
  const isLTR = isEnglishLanguage(router.locale);

  return (
    <Flex justifyContent="center" mt={['40px', '40px', '72px']} gap={10}>
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
  );
};

export default function TFOSwiper({
  children,
  showNavigation = true,
  showNumbersInPagination = false,
  showPagination = true,
  NavigationComponent = <CustomizeNavigation />,
  showPaginationTop = false,
  ...rest
}: PropsWithChildren<React.RefAttributes<SwiperRef> & SwiperProps> & {
  showNavigation?: boolean;
  showNumbersInPagination?: boolean;
  showPagination?: boolean;
  NavigationComponent?: React.ReactElement;
  showPaginationTop?: boolean;
}) {
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const [snapGrid, setSnapGrid] = useState<number[]>([]);
  const [snapIndex, setSnapIndex] = useState(0);

  //create custom Pagination component for Swiper

  const CustomPagination = () => {
    const swiper = useSwiper();
    const slideCount = snapGrid?.length || 0;

    return (
      <Flex
        justifyContent="center"
        mt={[8, 8, 10]}
        className="swipper-pagination"
      >
        {Array.from({ length: slideCount }).map((_, index) => {
          if (showNumbersInPagination) {
            return (
              <Box
                key={`pagination-${index}`}
                w={8}
                h={8}
                bg={index === snapIndex ? 'tfo.primary.500' : 'gray.750'}
                mx={1}
                borderRadius="full"
                cursor="pointer"
                onClick={() => {
                  swiper.slideTo(
                    index == 0
                      ? 0
                      : index * Math.floor(rest.slidesPerGroup || 1),
                  );
                }}
                display="flex"
                justifyContent="center"
                alignItems={'center'}
                color="gray.1000"
              >
                <Text>{index + 1}</Text>
              </Box>
            );
          } else {
            return (
              <Box
                key={`pagination-${index}`}
                w={8}
                h={1}
                bg={index === snapIndex ? 'tfo.primary.500' : 'gray.750'}
                mx={1}
                cursor="pointer"
                onClick={() => {
                  swiper.slideTo(
                    index == 0
                      ? 0
                      : index * Math.floor(rest.slidesPerGroup || 1),
                  );
                }}
              />
            );
          }
        })}
      </Flex>
    );
  };

  return (
    <Box>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        }}
        spaceBetween={10}
        slidesPerView={isMobileView ? 1.5 : 4}
        slidesPerGroup={isMobileView ? 1 : 4}
        onSnapGridLengthChange={(swiper) => {
          setSnapGrid(swiper.snapGrid);
        }}
        onSnapIndexChange={(swiper) => {
          setSnapIndex(swiper.snapIndex);
        }}
        {...rest}
      >
        {children}
        {showPaginationTop && <CustomPagination />}
        {showNavigation && NavigationComponent}
        {showPagination && <CustomPagination />}
      </Swiper>
    </Box>
  );
}
