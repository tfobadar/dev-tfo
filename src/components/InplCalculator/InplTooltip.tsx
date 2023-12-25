import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Text, VStack } from '@chakra-ui/react';
import { TooltipProps } from 'recharts';
import { ImplResponse } from './constants';
export default function InplTooltip({
  payload,
  label,
  data,
  blok,
}: StoryblokComponentProps &
  TooltipProps<ValueType, NameType> & {
    data?: ImplResponse;
  }) {
  if (!payload || payload?.length < 2) {
    return null;
  }
  return (
    <Box padding="4" bg="gunmetal.700" borderRadius="md">
      <VStack textAlign="start" alignItems="start">
        <Text fontSize={['xs', 'sm', 'md']}>
          {`${blok?.monthLabel} ${label} `}
        </Text>
        <Text fontSize={['xs', 'sm', 'md']}>
          {`${blok?.portfolioValueLabel} + ${
            blok?.cumulativeYieldLabel
          }: ${formatNumberToCurrency(Number(payload?.[0]?.value) || 0)}`}
        </Text>
        <Text fontSize={['xs', 'sm', 'md']}>
          {`${blok?.cumulativeInvestmentLabel} ${formatNumberToCurrency(
            Number(payload?.[1]?.value) || 0,
          )}`}
        </Text>
      </VStack>
    </Box>
  );
}
