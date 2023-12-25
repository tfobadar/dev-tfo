import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Text, VStack } from '@chakra-ui/react';
import { TooltipProps } from 'recharts';
import { ImplResponse } from '../constants';
export default function InplYAYATooltip({
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
        <Text fontWeight="medium">{`${blok?.monthLabel} ${payload?.[0]?.payload?.xDataKey} `}</Text>
        <Text>
          {`${blok?.rightPlanWithUsLabel}: ${formatNumberToCurrency(
            Number(payload?.[0]?.value) || 0,
          )}`}
        </Text>
        <Text>
          {`${blok?.leavingMoneyInCashLabel}: ${formatNumberToCurrency(
            Number(payload?.[1]?.value) || 0,
          )}`}
        </Text>
      </VStack>
    </Box>
  );
}
