import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import renderRichText from '@/helpers/renderRichText';
import RiskProflilerResult from './RiskProflilerResult';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { StoryblokComponentProps } from '@/types/component';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import DiversificationQuiz from '../DiversificationTool/DiversificationQuiz';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import useCalculator from '@/hooks/useCalculator';
import TFOSwiper from '../Carousel/TFOSwiper';
import { SwiperSlide, useSwiper } from 'swiper/react';
import { Button } from '@tfo/mytfo-components';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function RiskProfliler({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const dir = isEnglishLanguage(locale);

  const questionsData = blok.Questions[0].questions;

  const [answerScore, setAnswerScore] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const riskProflilerResult = result;

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
    setLabel('');
    setDescription('');
  };

  const buttons = {
    ...getButtonsListFromStoryblok({
      ctas: blok.results[0].resultCTAList,
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

  const isMobile = useBreakpointValue(
    { base: true, md: false, lg: false },
    {
      fallback: 'base',
    },
  );

  const data = [
    {
      name: 'A',
      value: 50,
      color: percentage > 0 && percentage < 45 ? '#B99855' : '#1B2123',
    },
    {
      name: 'B',
      value: 50,
      color: percentage >= 45 && percentage <= 80 ? '#B99855' : '#1B2123',
    },
    {
      name: 'C',
      value: 50,
      color: percentage > 80 ? '#B99855' : '#1B2123',
    },
  ];
  const isConservative = (percentage: number): boolean => {
    return percentage > 0 && percentage < 45;
  };
  const isBalanced = (percentage: number): boolean => {
    return percentage >= 45 && percentage <= 80;
  };
  const isAdventurer = (percentage: number): boolean => {
    return percentage > 80;
  };

  useEffect(() => {
    if (isConservative(percentage)) {
      setLabel(blok?.results[0]?.conservativeTitle);
      setDescription(
        renderRichText({
          content: blok?.results[0]?.conservativeDescription,
          removeParagraphTag: false,
        }),
      );
    } else if (isBalanced(percentage)) {
      setLabel(blok?.results[0]?.balancedTitle);
      setDescription(
        renderRichText({
          content: blok?.results[0]?.balancedDescription,
          removeParagraphTag: false,
        }),
      );
    } else if (isAdventurer(percentage)) {
      setLabel(blok?.results[0]?.adventurerTitle);
      setDescription(
        renderRichText({
          content: blok?.results[0]?.adventurerDescription,
          removeParagraphTag: false,
        }),
      );
    }
  }, [percentage]);

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
      className="riskProfliler-tool"
      mb="20"
      id="riskCalculator"
    >
      {!riskProflilerResult && (
        <Text
          textAlign="center"
          mb={{ base: '3', md: '6' }}
          fontSize={{ base: 'sm', md: 'lg' }}
        >
          {dir ? 'Completed' : 'مكتمل'}: {currentQuestionIndex + 1}{' '}
          {dir ? 'of' : 'من'} {questionsData.length}
        </Text>
      )}
      {!riskProflilerResult && (
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
                    index={index}
                    title={item.title}
                    options={item.questionOptions}
                    getAnswerPoints={handlePoints}
                    questionType={item.questionType}
                  />
                </SwiperSlide>
              );
            })}
            <CustomizeNavigation />
          </TFOSwiper>
        </Box>
      )}
      {riskProflilerResult && (
        <RiskProflilerResult
          blok={blok}
          data={data}
          label={label}
          buttons={buttons}
          isMobile={isMobile}
          description={description}
        />
      )}
    </Container>
  );
}
