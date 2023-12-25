import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import {
  Container,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  chakra,
} from '@chakra-ui/react';
import { Buttons } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { useRouter } from 'next/router';
import { useState } from 'react';

const step = 100_000;
const sliderMinScale = 300_000;
const sliderMaxScale = 10_000_000;

const calculateReturns = (investment: number, rate = 8.78, years = 20) => {
  let futureValue = investment;
  for (let i = 1; i <= years; i++) {
    futureValue = futureValue + (futureValue * rate) / 100;
  }
  return Math.round(futureValue);
};

export default function InvestmentReturnSlider({
  blok,
}: StoryblokComponentProps) {
  const { locale } = useRouter();

  const isRTL = !isEnglishLanguage(locale);

  const { footer, text } = blok;

  const buttons = {
    ...getButtonsListFromStoryblok({
      ctas: footer,
      buttonsProps: [
        {
          fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
          color: 'gray.850',
        },
      ],
    }),
  } as ButtonsByLimit;
  const [sliderValue, setSliderValue] = useState(900000);

  const labelStyles = {
    mt: '5',
    fontSize: { base: 'sm', md: 'md' },
    fontWeight: { base: 'unset', md: 'medium' },
    color: 'white',
  };
  const direction = !isEnglishLanguage(locale);

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Slider
        isReversed={direction}
        onChange={(val) => setSliderValue(val)}
        step={step}
        min={sliderMinScale}
        max={sliderMaxScale}
        defaultValue={sliderValue}
        mb={[16, 16, 24]}
        mt={[6, 6, 10]}
      >
        <SliderMark
          value={sliderMinScale}
          {...labelStyles}
          me={direction ? '-62px' : 0}
        >
          {formatNumberToCurrency(sliderMinScale)}
        </SliderMark>
        <SliderMark
          value={sliderMaxScale}
          {...labelStyles}
          ms={{ base: '-93px', md: '-108px' }}
        >
          {isRTL ? `+10 مليون دولار` : `$10 million +`}
        </SliderMark>
        <SliderMark
          w="auto"
          mt="-10"
          fontSize={{ base: 'sm', md: 'lg' }}
          color="white"
          textAlign="center"
          fontWeight={{ base: 'unset', md: 'medium' }}
          value={sliderValue}
          me={{
            base:
              sliderValue >= 8900000
                ? '-10px'
                : sliderValue >= 300000 && sliderValue < 1000000
                ? '-14'
                : '-10',
            md:
              sliderValue >= 9700000
                ? '-10px'
                : sliderValue >= 300000 && sliderValue < 700000
                ? '-16'
                : '-10',
          }}
          ms={{
            base:
              sliderValue >= 8700000
                ? '-85px'
                : sliderValue >= 300000 && sliderValue < 1400000
                ? '-2'
                : '-10',
            md:
              sliderValue >= 9400000
                ? '-120px'
                : sliderValue >= 300000 && sliderValue < 700000
                ? '-2'
                : '-10',
          }}
        >
          {formatNumberToCurrency(sliderValue)}
        </SliderMark>
        <SliderTrack bg={'gray.700'}>
          <SliderFilledTrack bg={'tfo.primary.500'} />
        </SliderTrack>
        <SliderThumb bg={'tfo.primary.500'} height={6} width={6} />
      </Slider>

      <Text textAlign="center" mb={4}>
        {text}{' '}
        <chakra.span color="tfo.primary.500">
          {formatNumberToCurrency(calculateReturns(sliderValue))}
        </chakra.span>
      </Text>

      <Text textAlign="center" fontSize="sm" color="gray.500" mb={16}>
        {renderRichText({ content: footer[0].text })}
      </Text>

      <Buttons {...buttons} />
    </Container>
  );
}
