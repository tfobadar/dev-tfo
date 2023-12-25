import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import renderRichText from '@/helpers/renderRichText';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Circle,
  Divider,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Buttons, PieChart } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { Dispatch } from 'react';
import calculatePortfolio from './calculatePortfolio';
import { ActionType } from './constant';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';

type Allocation = {
  slug: 'absolute_return' | 'capital_growth' | 'capital_yield';
  name: string;
  color: { color: string };
};

const ResultSection = ({
  blok,
  expectedAnnualIncomePercentage,
  expectedReturnPercentage,
  dispatch,
}: StoryblokComponentProps & {
  expectedAnnualIncomePercentage: number;
  expectedReturnPercentage: number;
  dispatch: Dispatch<{ type: ActionType; payload: boolean }>;
}) => {
  const pieChartCalculatedData: {
    absolute_return: number;
    capital_growth: number;
    capital_yield: number;
  } = calculatePortfolio(
    expectedAnnualIncomePercentage,
    expectedReturnPercentage,
  );

  const isMobile = useBreakpointValue(
    { base: true, md: false, lg: false },
    {
      fallback: 'base',
    },
  );

  const { locale } = useRouter();
  const investmentSytleOption = blok?.investmentStyleOptions.find(
    (option: { returnPercentage: number }) =>
      option.returnPercentage == expectedReturnPercentage,
  );

  const data = blok?.allocations.map((allocation: Allocation) => {
    return {
      name: allocation.name,
      value: pieChartCalculatedData?.[allocation.slug] || 0,
    };
  });

  const colors = blok?.allocations.map((allocation: Allocation) => {
    return allocation?.color?.color;
  });

  const ctas: ButtonsByLimit = {
    list: blok?.cta?.[0].buttons.map((button: SBButton) => ({
      ...getButtonFromStoryBlok({ button }),
      fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
      onClick: () => {
        trackButtonEvent({
          label: renderAsString({ content: button.text }),
          placement: 'middlePage',
        });
        dispatch({
          type: ActionType.RENDER_RESULT,
          payload: false,
        });
      },
      fontSize: ['md', 'lg'],
      width: 'auto',
    })),
  };

  return (
    <Box>
      <Flex
        mt="16"
        gap={['10', '10', '16']}
        flexDir={['column', 'column', 'row']}
      >
        <Box>
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            mb={{ base: '6', md: '10' }}
          >
            {blok?.perspectivePortfolioTitle}
          </Text>
          <HStack spacing={[2, 10]}>
            <PieChart
              data={data}
              colors={colors}
              width={isMobile ? 162 : 200}
              height={isMobile ? 162 : 200}
              innerRadius={isMobile ? 50 : 70}
              outerRadius={isMobile ? 80 : 100}
              cellProps={{ style: { outline: 'none' } }}
            />
            <VStack alignItems="start">
              {blok?.allocations.map((allocation: Allocation) => (
                <HStack key={allocation.slug}>
                  <Circle size="20px" bg={allocation.color?.color} />
                  <Text fontSize="sm" whiteSpace="nowrap">
                    {`${allocation.name} ${
                      pieChartCalculatedData?.[allocation.slug]
                    }% `}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </HStack>
        </Box>
        <Divider
          orientation={isMobile ? 'horizontal' : 'vertical'}
          alignSelf="stretch"
          height="auto"
        />
        <Box>
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            color="gray.300"
            mb={{ base: '6', md: '8' }}
          >
            {blok?.investmentStyleTitle}
          </Text>
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            color="gray.300"
            fontWeight={500}
            mb={{ base: '4', md: '5' }}
          >
            {renderRichText({
              content: investmentSytleOption?.details?.[0]?.title,
            })}
          </Text>
          <Text color="gray.400" fontSize="md" mb="5">
            {renderRichText({
              content: investmentSytleOption?.details?.[0]?.description,
            })}
          </Text>
        </Box>
      </Flex>
      <Buttons {...ctas} mt={['10', '16']} />
    </Box>
  );
};

export default ResultSection;
