import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { DiversificationQuiz } from './DiversificationQuiz';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import DiversificationResult from './DiversificationResult';
import useCalculator from '@/hooks/useCalculator';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import TFOSwiper from '../Carousel/TFOSwiper';
import { SwiperSlide, useSwiper } from 'swiper/react';
import { Button } from '@tfo/mytfo-components';

function DiversificationTool({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const dir = isEnglishLanguage(locale);

  const questionsData = blok.Questions[0].questions;

  const [answerScore, setAnswerScore] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(false);

  const diversificationResult = result;

  const { handlePoints, handleBeforeChange, percentage } = useCalculator(
    dir,
    questionsData,
    answerScore,
    setCurrentQuestionIndex,
    setResult,
    setAnswerScore,
  );

  const reSetAnswer = () => {
    setResult(false);
    setAnswerScore([]);
    setCurrentQuestionIndex(0);
  };

  const buttons = {
    ...getButtonsListFromStoryblok({
      ctas: blok.diversificationToolResult[0].resultCTAList,
      buttonsProps: [
        {
          onClick: reSetAnswer,
          fontWeight: dir ? 'medium' : 'bold',
          px: { base: '2.5', md: '6	' },
          marginEnd: { base: '0', md: '3' },
          fontSize: { base: 'md', md: 'lg' },
        },
        {
          fontWeight: dir ? 'medium' : 'bold',
          px: { base: '2.5', md: '6	' },
          fontSize: { base: 'md', md: 'lg' },
        },
      ],
    }),
  } as ButtonsByLimit;

  const CustomizeNavigation = () => {
    const swiper = useSwiper();

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
          onClick={() => {
            swiper.slidePrev();
            handleBeforeChange(swiper.activeIndex - 1, swiper.activeIndex);
          }}
          transform={dir ? '' : 'rotate(180deg)'}
          isDisabled={swiper.isBeginning}
        >
          <ChevronLeftIcon w="5" h="5" />
        </Button>
        <Button
          variant="outline"
          borderRadius="full"
          p="0"
          bg="tfo.primary.500"
          color="gray.700"
          _disabled={{
            border: '1px solid',
            borderColor: '#4A3D22',
            bg: 'transparent',
            color: 'gray.700',
          }}
          width="40px"
          height="40px"
          className="swiper-button-next1"
          _after={{
            content: '""',
          }}
          onClick={() => {
            handleBeforeChange(swiper.activeIndex, swiper.activeIndex + 1);
            swiper.slideNext();
          }}
          transform={dir ? '' : 'rotate(180deg)'}
          isDisabled={
            !answerScore.find((answer: any) => {
              return answer.questionIndex == currentQuestionIndex;
            })
          }
        >
          <ChevronRightIcon w="5" h="5" />
        </Button>
      </Flex>
    );
  };
  return (
    <Container
      maxWidth={MAX_CONTAINER_WIDTH}
      className="diversification-tool"
      mb={diversificationResult ? '0' : '20'}
      id="diversificationCalculator"
    >
      {!diversificationResult && (
        <Text
          textAlign="center"
          mb={{ base: '3', md: '6' }}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          {dir ? 'Completed' : 'مكتمل'}: {currentQuestionIndex + 1}{' '}
          {dir ? 'of' : 'من'} {questionsData.length}
        </Text>
      )}
      {!diversificationResult && (
        <Box>
          <TFOSwiper
            slidesPerGroup={1}
            slidesPerView={1}
            showNavigation={false}
            speed={0}
          >
            {questionsData.map((item: any, index: any) => {
              return (
                <SwiperSlide key={index}>
                  <DiversificationQuiz
                    key={index}
                    index={index}
                    title={item.title}
                    options={item.questionOptions}
                    getAnswerPoints={handlePoints}
                  />
                </SwiperSlide>
              );
            })}
            <CustomizeNavigation />
          </TFOSwiper>
        </Box>
      )}
      {diversificationResult && (
        <DiversificationResult
          blok={blok}
          percentage={percentage}
          buttons={buttons}
        />
      )}
    </Container>
  );
}
export { DiversificationTool };
