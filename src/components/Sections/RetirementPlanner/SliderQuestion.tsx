import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

type SliderQuestionProps = {
  max: number;
  min: number;
  step: number;
  defaultValue: number;
  onChange: (value: number) => void;
  label: string;
  value: number;
  infoLabel?: string;
  formatter?: (value: number) => string;
};

export default function SliderQuestion({
  max,
  min,
  step,
  defaultValue,
  onChange,
  label,
  value,
  infoLabel,
  formatter,
  ...rest
}: SliderQuestionProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { locale } = useRouter();
  const isRTL = !isEnglishLanguage(locale);
  const labelStyles = {
    mt: '5',
    fontSize: 'sm',
    color: 'white',
  };
  return (
    <Box flex="1">
      <Flex justifyContent="space-between">
        <Text>{label}</Text>
        {!isMobile && (
          <Text color="tfo.primary.500" fontWeight="medium">
            {formatter ? formatter(value) : value}
          </Text>
        )}
      </Flex>
      <Slider
        aria-label="slider-ex-1"
        isReversed={isRTL}
        step={Number(step)}
        min={min}
        max={max}
        defaultValue={defaultValue}
        my={['10', '6']}
        value={value}
        onChange={onChange}
        {...rest}
      >
        <SliderTrack bg={'gray.700'}>
          <SliderFilledTrack bg={'tfo.primary.500'} />
        </SliderTrack>
        <SliderMark
          value={min}
          {...labelStyles}
          me={isRTL ? `-${min.toString().length - 0.75}em` : 0}
        >
          {formatter ? formatter(min) : min}
        </SliderMark>
        {isMobile && (
          <SliderMark
            value={value}
            color="tfo.primary.500"
            textAlign="center"
            mt="-10"
            ms={
              value < max / 3
                ? '0'
                : value > (max / 3) * 2
                ? `-${value.toString().length - 0.75}em`
                : `-${value.toString().length / 2}em`
            }
            me={
              isRTL && value < max / 3
                ? `-${value.toString().length - 0.75}em`
                : isRTL && value > (max / 3) * 2
                ? '0'
                : `-${value.toString().length / 2}em`
            }
          >
            {formatter ? formatter(value) : value}
          </SliderMark>
        )}
        <SliderMark
          value={max}
          {...labelStyles}
          ms={`-${max.toString().length - 0.8}em`}
        >
          {formatter
            ? max >= 10000000
              ? isRTL
                ? `+10 مليون دولار`
                : `$10 million +`
              : formatter(max)
            : max}
        </SliderMark>
        <SliderThumb bg={'tfo.primary.500'} height={6} width={6} />
      </Slider>
      {infoLabel && (
        <HStack mt="3">
          <InfoIcon color="tfo.primary.500" height={5} width={5} />
          <Text fontSize={['xs', 'sm']} color="gray.500">
            {infoLabel}
          </Text>
        </HStack>
      )}
    </Box>
  );
}
