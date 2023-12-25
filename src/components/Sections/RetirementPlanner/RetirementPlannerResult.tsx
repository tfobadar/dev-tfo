import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Circle,
  Container,
  Flex,
  HStack,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AreaChart, Buttons } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { computeRetirementPlan } from './computation';
import { ActionType, InitialState, Action } from './constants';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';

export default function RetirementPlannerResult({
  state,
  dispatch,
  blok,
}: StoryblokComponentProps & {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}) {
  const data = computeRetirementPlan(state);
  const { locale } = useRouter();

  const buttons: ButtonsByLimit = {
    list: blok?.ctas?.[0]?.buttons.map((button: SBButton, index: number) => ({
      ...getButtonFromStoryBlok({ button }),
      fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
      fontSize: ['md', 'lg'],
      py: '10px',
      px: ['16px', '24px'],
      onClick: () => {
        if (index === 0) {
          dispatch({
            type: ActionType.RENDER_RESULT,
            payload: false,
          });
        }
      },
    })),
    justifyContent: 'center',
  };

  const RetirementCard = ({
    label,
    retirementAge,
    monthlyPayment,
    remainingBalance,
  }: {
    label: string;
    retirementAge?: number;
    monthlyPayment?: number;
    remainingBalance?: number;
  }) => (
    <Box>
      <Text fontSize="lg" mb="3" textAlign="center">
        {label}
      </Text>
      <Box
        px="8"
        py="10"
        bg="gray.850"
        border="1px solid"
        borderColor="gray.750"
        borderRadius="md"
        textAlign="center"
      >
        <Text fontSize="lg" mb="2">
          {`${blok?.retireAtLabel} ${retirementAge} ${blok?.withLabel}`}
        </Text>
        <Text fontSize="2xl" fontWeight="medium">
          {formatNumberToCurrency(monthlyPayment || 0)}
        </Text>
        <Text>{blok?.perMonthLabel}</Text>
        {remainingBalance && (
          <>
            <Text fontSize="2xl" fontWeight="medium" mt="6">
              US {formatNumberToCurrency(remainingBalance || 0)}
            </Text>
            <Text>{blok?.amountAvailableLabel}</Text>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <Container maxW="760px" p="0">
      <Flex
        flexDir={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
        gap="8"
      >
        <RetirementCard
          label={blok?.tfoPlanLabel}
          retirementAge={data?.tfoRetirementAge}
          monthlyPayment={data?.tfoTargetMonthlyPayments}
          remainingBalance={data?.tfoRemainingBalance}
        />

        <Circle size="16" bg="gray.850" fontWeight="medium">
          {blok?.vsLabel}
        </Circle>
        <RetirementCard
          label={blok?.cashPlanLabel}
          retirementAge={data?.cashRetirementAge}
          monthlyPayment={data?.cashTargetMonthlyPayments}
          remainingBalance={data?.cashRemainingBalance}
        />
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        my="8"
        w="full"
      >
        <Box
          bg="gray.850"
          p={[2, 10]}
          position="relative"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.700"
          w="full"
        >
          <Text fontSize="lg" mb="6">
            {blok?.chartLabel}
          </Text>
          <VStack alignItems="flex-start" mb="10">
            <HStack>
              <Circle size="4" bg="tfo.primary.500"></Circle>
              <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                {blok?.tfoLegendLabel}
              </Text>
            </HStack>
            <HStack>
              <Circle size="4" bg="liteSlateGray.500"></Circle>
              <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                {blok?.cashLegendLabel}
              </Text>
            </HStack>
          </VStack>
          <Box
            sx={{
              '.recharts-wrapper .recharts-cartesian-grid-horizontal line:first-child,.recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child':
                {
                  strokeOpacity: 0,
                },
              '.recharts-wrapper .recharts-cartesian-grid-vertical line:first-child,.recharts-wrapper .recharts-cartesian-grid-vertical line:last-child':
                {
                  strokeOpacity: 0,
                },
            }}
            dir="ltr"
          >
            <AreaChart
              data={data?.chartData || []}
              area1Props={{ dataKey: 'TFO' }}
              area2Props={{ dataKey: 'CASH' }}
              showTooltip
              tooltipProps={{
                content: (props) => {
                  if (!props?.payload?.length) {
                    return null;
                  }

                  return (
                    <Box
                      padding={['2', '4']}
                      bg="gunmetal.700"
                      borderRadius="md"
                      textAlign="start"
                    >
                      <VStack alignItems="start">
                        <Text fontWeight="medium" fontSize={['sm', 'md']}>
                          {`${blok?.xAxisLabel} ${props?.payload?.[0]?.payload?.age} `}
                        </Text>

                        <HStack>
                          <Square size="4" bg="tfo.primary.500" />
                          <Text fontSize={['sm', 'md']}>
                            {` ${formatNumberToCurrency(
                              Number(props?.payload?.[0]?.value) || 0,
                            )}`}
                          </Text>
                        </HStack>
                        <HStack>
                          <Square size="4" bg="liteSlateGray.500" />
                          <Text fontSize={['sm', 'md']}>
                            {` ${formatNumberToCurrency(
                              Number(props?.payload?.[1]?.value) || 0,
                            )}`}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  );
                },
              }}
              showGrid
              xAxisProps={{
                dataKey: 'age',
                interval: 'preserveStartEnd',
              }}
              yAxisProps={{
                tickFormatter: (value: number) =>
                  formatNumberToCurrency(value, 'USD', 'en-US', 'compact'),
              }}
            />
          </Box>
        </Box>
      </Box>
      <Buttons {...buttons} />
    </Container>
  );
}
