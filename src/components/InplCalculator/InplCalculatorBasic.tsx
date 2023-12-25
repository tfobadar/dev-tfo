import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import { StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Circle,
  Container,
  Grid,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { AreaChart } from '@tfo/mytfo-components';
import React from 'react';
import { useEffect, useState } from 'react';
import { CurrentImplResponse } from './constants';

import InplCard from './InplCard';
import InplForm from './InplForm';
import InplTooltip from './InplTooltip';

export default function InplCalculatorBasic({ blok }: StoryblokComponentProps) {
  const [data, setData] = useState<CurrentImplResponse>();
  const [chartData, setChartData] = useState<
    { area1: number | null; area2: number | null; xDataKey: number }[]
  >([]);

  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  useEffect(() => {
    if (data?.distributions) {
      let chartData = [];
      const { CumulativeInvestmentAmount, PortfolioValue, Deposits } =
        data.distributions;
      for (let i = 0; i <= data.portfolioValueAt; i++) {
        chartData.push({
          area1: PortfolioValue[i],
          area2:
            CumulativeInvestmentAmount[i] > 0
              ? CumulativeInvestmentAmount[i]
              : null,
          xDataKey: i,
        });
      }
      setChartData(chartData);
    }
  }, [data]);

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1.5fr 3fr']}
        gridGap={6}
        mb={[10, 14]}
      >
        <InplForm blok={blok?.form?.[0]} setData={setData} />

        <Box>
          <Grid
            gridTemplateColumns={[
              '1fr',
              '1fr',
              '1fr',
              '1fr',
              '1fr 1fr 1fr  1fr',
            ]}
            gridGap={6}
          >
            <InplCard
              title={
                data?.frequency === 1
                  ? blok?.monthlyPaymentLabel
                  : data?.frequency === 3
                  ? blok?.quaterlyPaymentLabel
                  : blok?.semiAnuallyPaymentLabel
              }
              value={
                data?.installment_amount
                  ? formatNumberToCurrency(data?.installment_amount)
                  : ''
              }
            />
            <InplCard
              title={blok?.expectedReturnLabel}
              value={
                data?.expectedTotalReturn
                  ? formatNumberToCurrency(data?.expectedTotalReturn)
                  : ''
              }
            />
            <InplCard
              title={blok?.estimatedEarningLabel}
              value={
                data?.estimatedEarnings
                  ? formatNumberToCurrency(data?.estimatedEarnings)
                  : ''
              }
            />
            <InplCard
              title={blok?.yieldLabel}
              value={data?.yield ? formatNumberToCurrency(data?.yield) : ''}
            />
          </Grid>
          <Box
            bg="gray.900"
            mt={6}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.800"
            py={4}
            px={[1, 4]}
          >
            <AreaChart
              data={chartData}
              area1Props={{ dataKey: 'area1', connectNulls: true }}
              area2Props={{ dataKey: 'area2', connectNulls: true }}
              xAxisProps={{
                dataKey: 'xDataKey',
                tickLine: true,
                includeHidden: true,
                label: {
                  value: blok?.xAxisLabel,
                  dy: 20,
                },
                style: {
                  fontSize: isMobile ? '14px' : '16px',
                  fill: 'white',
                },
              }}
              chartProps={{
                margin: {
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 20,
                },
              }}
              yAxisProps={{
                tickFormatter: (value: number) => {
                  return formatNumberToCurrency(
                    value,
                    'USD',
                    'en-US',
                    'compact',
                  );
                },
                width: isMobile ? 50 : 70,
                tickLine: true,
                style: {
                  fontSize: isMobile ? '12px' : '16px',
                  fill: 'white',
                },
              }}
              height={isMobile ? 300 : 450}
              showGrid={false}
              showTooltip
              tooltipProps={{
                content: <InplTooltip data={data} blok={blok?.tooltip?.[0]} />,
                filterNull: true,
              }}
            />
            <VStack alignItems="flex-end">
              <HStack>
                <Circle size="4" bg="tfo.primary.500"></Circle>
                <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                  {`${blok?.tooltip?.[0]?.portfolioValueLabel} + ${blok?.tooltip?.[0]?.cumulativeYieldLabel}`}
                </Text>
              </HStack>
              <HStack>
                <Circle size="4" bg="liteSlateGray.500"></Circle>
                <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                  {blok?.tooltip?.[0]?.cumulativeInvestmentLabel}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Grid>

      <Text fontSize="xs" color="gray.400" textAlign="center">
        {blok?.disclaimer}
      </Text>
    </Container>
  );
}
