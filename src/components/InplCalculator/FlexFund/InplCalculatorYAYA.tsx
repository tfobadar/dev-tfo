import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Center,
  Circle,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { AreaChart, Button } from '@tfo/mytfo-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImplResponse } from '../constants';

import InplCard from '../InplCard';
import InplFormYAYA from './InplFormYAYA';
import InplYAYATooltip from './InplYAYATooltip';

export default function InplCalculatorYAYA({ blok }: StoryblokComponentProps) {
  const [data, setData] = useState<ImplResponse>();
  const [chartData, setChartData] = useState<
    { area1: number | null; area2: number | null; xDataKey: number }[]
  >([]);
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  const [remainingAmount, setRemainingAmount] = useState(0);

  const { text: footerCtaText, ...footerCTAProps } = getButtonFromStoryBlok({
    button: blok?.footerCTA?.[0],
  });

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
      <Box
        px="5"
        py="4"
        bg="gray.900"
        borderRadius="md"
        border="1px solid"
        borderColor="gray.800"
        mb={6}
      >
        <VStack
          alignItems={['center', 'center', 'center', 'start']}
          textAlign={['center', 'center', 'center', 'start']}
          mt={[4, 4, 4, 0]}
        >
          <Heading
            fontSize={['2xl', '2xl', '2xl', '3xl']}
            fontWeight="normal"
            lineHeight={1.2}
          >
            {renderRichText({ content: blok?.title?.[0]?.title })}
          </Heading>
          <Text fontSize="sm" color="gray.400">
            {renderRichText({ content: blok?.title?.[0]?.description })}
          </Text>
        </VStack>
      </Box>

      <Grid
        gridTemplateColumns={['1fr', '1fr', '2fr 3fr', '1.5fr 3fr']}
        gridGap={6}
        mb={[10, 14]}
      >
        <InplFormYAYA
          blok={blok?.form?.[0]}
          setData={setData}
          setRemainingAmount={setRemainingAmount}
        />
        <Box>
          <Box
            bg="gray.900"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.800"
            p={4}
          >
            <Heading textAlign="center" fontSize="2xl" fontWeight={700} mb={2}>
              {blok?.returnsLabel}
            </Heading>
            <Stack
              direction={['column', 'column', 'column', 'row']}
              alignItems={['start', 'center']}
              justifyContent="center"
              gap={[2, 4]}
              mb={8}
            >
              <HStack>
                <Circle size="4" bg="tfo.primary.500"></Circle>
                <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                  {blok?.tooltip?.[0]?.rightPlanWithUsLabel}
                </Text>
              </HStack>
              <HStack>
                <Circle size="4" bg="liteSlateGray.500"></Circle>
                <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                  {blok?.tooltip?.[0]?.leavingMoneyInCashLabel}
                </Text>
              </HStack>
            </Stack>
            <AreaChart
              data={chartData}
              area1Props={{ dataKey: 'area1', connectNulls: true }}
              area2Props={{ dataKey: 'area2', connectNulls: true }}
              chartProps={{
                margin: {
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 20,
                },
              }}
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
                width: isMobile ? 70 : 80,
                tickLine: true,
                label: {
                  value: blok?.yAxisLabel,
                  position: 'insideLeft',
                  angle: -90,
                },
                style: {
                  fontSize: isMobile ? '14px' : '16px',
                },
              }}
              height={isMobile ? 400 : 600}
              showGrid={true}
              showTooltip
              tooltipProps={{
                content: (
                  <InplYAYATooltip data={data} blok={blok?.tooltip?.[0]} />
                ),
                filterNull: true,
              }}
            />
          </Box>
          <Grid
            gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
            gridGap={6}
            mt={6}
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
              title={blok?.estimatedEarningLabel}
              value={
                data?.estimatedEarnings
                  ? formatNumberToCurrency(data?.estimatedEarnings)
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
              title={blok?.yieldLabel}
              value={data?.yield ? formatNumberToCurrency(data?.yield) : ''}
            />
          </Grid>
        </Box>
      </Grid>

      <Text fontSize="xs" color="gray.400" textAlign="center">
        {blok?.disclaimer}
      </Text>
      <Center my={['120px', '80px']} mx="auto">
        <Button {...footerCTAProps}>{footerCtaText}</Button>
      </Center>
    </Container>
  );
}
