import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import formatNumberToCurrency from '@/helpers/formatNumberToCurrency';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Center, Container, Flex, Grid, Text } from '@chakra-ui/react';
import { Button } from '@tfo/mytfo-components';
import { useReducer } from 'react';
import {
  ActionType,
  initialState,
  reducerFn,
  RetirementPlan,
} from './constants';
import RetirementPlannerResult from './RetirementPlannerResult';
import SliderQuestion from './SliderQuestion';
import { trackRetirementTabEvent } from '@/helpers/trackClickEvents';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';

type sliderQuestionBlok = {
  id: ActionType;
  max: string | number;
  min: string | number;
  _uid: string;
  step: string | number;
  question: string;
  component: 'retirementPlannerSliderQuestion';
  defaultValue: string | number;
  questionInfo?: string;
};

export default function RetirementPlanner({ blok }: StoryblokComponentProps) {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const { locale } = useRouter();

  // get individual slider question bloks
  const silderQuestionBlok = blok?.sliderQuestions?.reduce(
    (acc: Record<ActionType, sliderQuestionBlok>, curr: sliderQuestionBlok) => {
      const updatedCurr = {
        ...curr,
        max: Number(curr.max),
        min: Number(curr.min),
        step: Number(curr.step),
        defaultValue: Number(curr.defaultValue),
      };
      acc[curr.id] = updatedCurr;
      return acc;
    },
    {},
  );
  const initialInvestmentAmountBlok =
    silderQuestionBlok[ActionType.INITIAL_INVESTMENT_AMOUNT];
  const monthlyContributionBlok =
    silderQuestionBlok[ActionType.MONTHLY_CONTRIBUTION];
  const monthlyIncomeBlok = silderQuestionBlok[ActionType.MONTHLY_INCOME];
  const retirementAgeBlok = silderQuestionBlok[ActionType.RETIREMENT_AGE];
  const currentAgeBlok = silderQuestionBlok[ActionType.CURRENT_AGE];
  const inheritanceAmountBlok =
    silderQuestionBlok[ActionType.INHERITANCE_AMOUNT];

  const retirementPlanOptionStyle = {
    p: '4',
    bg: 'gray.800',
    borderRadius: 'md',
    _hover: { cursor: 'pointer' },
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    borderColor: 'tfo.primary.500',
  };

  const { text: ctaText, ...ctaProps } = getButtonFromStoryBlok({
    button: blok?.cta[0],
  });

  return (
    <Container
      maxW={MAX_CONTAINER_WIDTH}
      mt={[8, 13]}
      id="retirementCalculator"
    >
      {state.renderResult ? (
        <RetirementPlannerResult
          state={state}
          dispatch={dispatch}
          blok={blok?.retirementPlannerResult?.[0]}
        />
      ) : (
        <>
          <Text fontSize={['md', 'lg']}>{blok?.retirementPlanQuestion}</Text>
          <Text fontSize={['xs', 'sm']} color="gray.500" my="6">
            {blok?.retirementPlanQuestionnfo}
          </Text>
          <Grid gridTemplateColumns={['1fr', '1fr 1fr 1fr']} gridGap="6">
            <Box
              {...retirementPlanOptionStyle}
              onClick={() => {
                trackRetirementTabEvent({
                  label: `${blok?.retirementPlanOptionOne}`,
                });
                dispatch({
                  type: ActionType.RETIREMENT_PLAN,
                  payload: RetirementPlan.RETIRE,
                });
              }}
              border={
                state.retirementPlan?.includes(RetirementPlan.RETIRE)
                  ? '2px solid var(--chakra-colors-tfo-primary-500)'
                  : 'none'
              }
            >
              <Text
                fontSize={['sm', 'lg']}
                fontWeight={
                  state.retirementPlan?.includes(RetirementPlan.RETIRE)
                    ? 'medium'
                    : 'normal'
                }
              >
                {blok?.retirementPlanOptionOne}
              </Text>
            </Box>
            <Box
              {...retirementPlanOptionStyle}
              onClick={() => {
                trackRetirementTabEvent({
                  label: `${blok?.retirementPlanOptionTwo}`,
                });
                dispatch({
                  type: ActionType.RETIREMENT_PLAN,
                  payload: RetirementPlan.STABLE_MONTHLY,
                });
              }}
              border={
                state.retirementPlan?.includes(RetirementPlan.STABLE_MONTHLY)
                  ? '2px solid var(--chakra-colors-tfo-primary-500)'
                  : 'none'
              }
            >
              <Text
                fontSize={['sm', 'lg']}
                fontWeight={
                  state.retirementPlan?.includes(RetirementPlan.STABLE_MONTHLY)
                    ? 'medium'
                    : 'normal'
                }
              >
                {blok?.retirementPlanOptionTwo}
              </Text>
            </Box>
            <Box
              {...retirementPlanOptionStyle}
              onClick={() => {
                trackRetirementTabEvent({
                  label: `${blok?.retirementPlanOptionThree}`,
                });
                dispatch({
                  type: ActionType.RETIREMENT_PLAN,
                  payload: RetirementPlan.PASS_ON,
                });
              }}
              border={
                state.retirementPlan?.includes(RetirementPlan.PASS_ON)
                  ? '2px solid var(--chakra-colors-tfo-primary-500)'
                  : 'none'
              }
            >
              <Text
                fontSize={['sm', 'lg']}
                fontWeight={
                  state.retirementPlan?.includes(RetirementPlan.PASS_ON)
                    ? 'medium'
                    : 'normal'
                }
              >
                {blok?.retirementPlanOptionThree}
              </Text>
            </Box>
          </Grid>
          {state?.retirementPlan?.length ? (
            <>
              <Box my={[10, 16]}>
                <SliderQuestion
                  max={initialInvestmentAmountBlok?.max}
                  min={initialInvestmentAmountBlok?.min}
                  step={initialInvestmentAmountBlok?.step}
                  infoLabel={initialInvestmentAmountBlok?.questionInfo}
                  label={initialInvestmentAmountBlok?.question}
                  defaultValue={initialInvestmentAmountBlok?.defaultValue}
                  formatter={formatNumberToCurrency}
                  value={state.initialInvestmentAmount}
                  onChange={(value) =>
                    dispatch({
                      type: ActionType.INITIAL_INVESTMENT_AMOUNT,
                      payload: value,
                    })
                  }
                />
              </Box>

              <Flex gap="6" flexDirection={['column', 'row']} my={[10, 16]}>
                <SliderQuestion
                  max={currentAgeBlok?.max}
                  min={currentAgeBlok?.min}
                  step={currentAgeBlok?.step}
                  label={currentAgeBlok?.question}
                  defaultValue={currentAgeBlok?.defaultValue}
                  value={state.currentAge}
                  onChange={(value) =>
                    dispatch({ type: ActionType.CURRENT_AGE, payload: value })
                  }
                />
                {(state.retirementPlan?.includes(RetirementPlan.PASS_ON) ||
                  state.retirementPlan?.includes(RetirementPlan.RETIRE)) &&
                  !(
                    state.retirementPlan?.includes(RetirementPlan.PASS_ON) &&
                    state.retirementPlan?.includes(
                      RetirementPlan.STABLE_MONTHLY,
                    )
                  ) && (
                    <SliderQuestion
                      max={retirementAgeBlok?.max}
                      min={retirementAgeBlok?.min}
                      step={retirementAgeBlok?.step}
                      label={retirementAgeBlok?.question}
                      defaultValue={retirementAgeBlok?.defaultValue}
                      value={state.retirementAge}
                      onChange={(value) =>
                        dispatch({
                          type: ActionType.RETIREMENT_AGE,
                          payload: value,
                        })
                      }
                    />
                  )}
              </Flex>

              <Box my={[10, 16]}>
                <SliderQuestion
                  max={monthlyContributionBlok?.max}
                  min={monthlyContributionBlok?.min}
                  step={monthlyContributionBlok?.step}
                  infoLabel={monthlyContributionBlok?.questionInfo}
                  label={monthlyContributionBlok?.question}
                  defaultValue={monthlyContributionBlok?.defaultValue}
                  formatter={formatNumberToCurrency}
                  value={state.monthlyContribution}
                  onChange={(value) =>
                    dispatch({
                      type: ActionType.MONTHLY_CONTRIBUTION,
                      payload: value,
                    })
                  }
                />
              </Box>
              {state.retirementPlan?.includes(RetirementPlan.STABLE_MONTHLY) &&
                !state.retirementPlan?.includes(RetirementPlan.RETIRE) && (
                  <Box my={[10, 16]}>
                    <SliderQuestion
                      max={monthlyIncomeBlok?.max}
                      min={monthlyIncomeBlok?.min}
                      step={monthlyIncomeBlok?.step}
                      label={monthlyIncomeBlok?.question}
                      defaultValue={monthlyIncomeBlok?.defaultValue}
                      formatter={formatNumberToCurrency}
                      value={state.monthlyIncome}
                      onChange={(value) =>
                        dispatch({
                          type: ActionType.MONTHLY_INCOME,
                          payload: value,
                        })
                      }
                    />
                  </Box>
                )}

              <Center>
                <Button
                  {...ctaProps}
                  fontSize={['md', 'lg']}
                  py="10px"
                  px={[4, 6]}
                  fontWeight={isEnglishLanguage(locale) ? 'medium' : 'bold'}
                  onClick={() => {
                    dispatch({ type: ActionType.RENDER_RESULT, payload: true });
                  }}
                >
                  {ctaText}
                </Button>
              </Center>
            </>
          ) : null}
        </>
      )}
    </Container>
  );
}
