import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Center,
  Container,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Button } from '@tfo/mytfo-components';
import { useReducer } from 'react';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { ActionType, reducerFn } from './constant';
import ResultSection from './PortfolioBuilderResult';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';

type PortfolioBuilderQuestion = {
  question: StoryblokRichtext;
  options: { number: number; _uid: string }[];
};

export default function PortfolioBuilder({ blok }: StoryblokComponentProps) {
  const [state, dispatch] = useReducer(reducerFn, {
    returnPercentage: 4,
    annualIncomePercentage: 0,
  });

  const { text: questionCTAText, ...questionCTAProps } = getButtonFromStoryBlok(
    {
      button: blok?.questionCTA?.[0],
    },
  );

  const isOptionDisabled = (questionIndex: number, option: any) => {
    if (questionIndex === 1) {
      if (!state.returnPercentage) {
        return true;
      } else if (
        state.returnPercentage != 10 &&
        Number(state.returnPercentage) / 2 < Number(option.number)
      ) {
        return true;
      } else if (state.returnPercentage == 10 && option.number == 0) {
        return true;
      }
    }
    return false;
  };

  const handleClick = (questionIndex: number, payload: number) => {
    switch (questionIndex) {
      case 0:
        dispatch({
          type: ActionType.RETURN_PERCENTAGE,
          payload,
        });
        dispatch({
          type: ActionType.ANNUAL_INCOME_PERCENTAGE,
          payload: payload == 10 ? 2 : 0,
        });
        break;
      case 1:
        dispatch({
          type: ActionType.ANNUAL_INCOME_PERCENTAGE,
          payload,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Container maxW={MAX_CONTAINER_WIDTH} mt={[10, 16]}>
      {state.renderResult ? (
        <ResultSection
          expectedReturnPercentage={state.returnPercentage || 0}
          expectedAnnualIncomePercentage={state.annualIncomePercentage || 0}
          blok={blok?.portfolioBuilderResult?.[0]}
          dispatch={dispatch}
        />
      ) : (
        <>
          {blok?.questions?.map(
            (question: PortfolioBuilderQuestion, questionIndex: number) => (
              <Box key={renderAsString({ content: question?.question })}>
                <Text fontSize={{ base: 'md', md: 'lg' }} textAlign="center">
                  {renderRichText({ content: question?.question })}
                </Text>
                <HStack
                  gap={[6, 9]}
                  justifyContent="center"
                  mt="8"
                  mb="16"
                  mx={questionIndex === 0 ? { base: 10, md: '0' } : '0'}
                >
                  {question.options.map((option) => (
                    <Tooltip
                      key={option?._uid}
                      isDisabled={!isOptionDisabled(questionIndex, option)}
                      label={blok?.disableOptionTooltip}
                      shouldWrapChildren
                      padding={[2, 4]}
                      hasArrow
                      color="gray.500"
                      bg="gray.800"
                    >
                      <Button
                        key={option?._uid}
                        variant="outline"
                        bg="gray.800"
                        flex="1"
                        data-value={option?.number}
                        maxW="150px"
                        py="4"
                        px={['2', '10']}
                        textAlign="center"
                        borderRadius="md"
                        _focus={{
                          bg: 'gray.800',
                        }}
                        _hover={{
                          bg: 'gray.800',
                        }}
                        isDisabled={isOptionDisabled(questionIndex, option)}
                        height="auto"
                        onClick={() => (
                          trackButtonEvent({
                            label: `${option?.number}%`,
                            placement: 'middlePage',
                          }),
                          handleClick(questionIndex, option?.number)
                        )}
                        border={
                          (questionIndex == 0 &&
                            state.returnPercentage == option?.number) ||
                          (questionIndex == 1 &&
                            state.annualIncomePercentage == option?.number)
                            ? '1px solid'
                            : 'none'
                        }
                        borderColor="tfo.primary.500"
                        fontWeight={400}
                        color="white"
                        fontSize={{ base: 'sm', md: 'lg' }}
                      >
                        {option?.number}%
                      </Button>
                    </Tooltip>
                  ))}
                </HStack>
              </Box>
            ),
          )}
          <Center>
            <Button
              {...questionCTAProps}
              onClick={() => {
                trackButtonEvent({
                  label: renderAsString({ content: blok.questionCTA[0].text }),
                  placement: 'middlePage',
                });
                dispatch({
                  type: ActionType.RENDER_RESULT,
                  payload: true,
                });
              }}
              isDisabled={!state.returnPercentage}
            >
              {questionCTAText}
            </Button>
          </Center>
        </>
      )}
    </Container>
  );
}
