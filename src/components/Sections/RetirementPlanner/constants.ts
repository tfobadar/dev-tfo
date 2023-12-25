import { Reducer } from 'react';

export enum RetirementPlan {
  RETIRE = 'RETIRE',
  STABLE_MONTHLY = 'STABLE_MONTHLY',
  PASS_ON = 'PASS_ON',
}

export enum ActionType {
  RETIREMENT_PLAN = 'RETIREMENT_PLAN',
  INITIAL_INVESTMENT_AMOUNT = 'INITIAL_INVESTMENT_AMOUNT',
  MONTHLY_CONTRIBUTION = 'MONTHLY_CONTRIBUTION',
  CURRENT_AGE = 'CURRENT_AGE',
  RETIREMENT_AGE = 'RETIREMENT_AGE',
  MONTHLY_INCOME = 'MONTHLY_INCOME',
  INHERITANCE_AMOUNT = 'INHERITANCE_AMOUNT',
  RENDER_RESULT = 'RENDER_RESULT',
}

export type InitialState = {
  retirementPlan?: RetirementPlan[];
  renderResult?: boolean;
  initialInvestmentAmount: number;
  monthlyContribution: number;
  currentAge: number;
  retirementAge: number;
  monthlyIncome: number;
  inheritanceAmount: number;
};

export type Action = {
  type: ActionType;
  payload: number | boolean | RetirementPlan;
};

export const initialState = {
  retirementPlan: [RetirementPlan.RETIRE] as RetirementPlan[],
  renderResult: false,
  initialInvestmentAmount: 1000000,
  monthlyContribution: 5000,
  currentAge: 50,
  retirementAge: 60,
  monthlyIncome: 20000,
  inheritanceAmount: 1000000,
};

export const reducerFn: Reducer<InitialState, Action> = (
  state,
  { type, payload },
) => {
  switch (type) {
    case ActionType.RETIREMENT_PLAN: {
      // if retirementPlan is present then remove it i.e. toggle it
      // else if retirementPlan length is 2 then remove the first element and add the new element
      // else add the new retirementPlan
      if (state.retirementPlan?.includes(payload as RetirementPlan)) {
        return {
          ...initialState,
          retirementPlan: state.retirementPlan.filter(
            (plan) => plan !== (payload as RetirementPlan),
          ),
        };
      } else if (state.retirementPlan?.length === 2) {
        return {
          ...initialState,
          retirementPlan: state.retirementPlan
            .slice(1, 2)
            .concat(payload as RetirementPlan),
        };
      } else {
        return {
          ...state,
          retirementPlan: state.retirementPlan?.concat(
            payload as RetirementPlan,
          ),
        };
      }
    }

    case ActionType.INITIAL_INVESTMENT_AMOUNT:
      return { ...state, initialInvestmentAmount: payload as number };
    case ActionType.MONTHLY_CONTRIBUTION:
      return { ...state, monthlyContribution: payload as number };
    case ActionType.CURRENT_AGE:
      return { ...state, currentAge: payload as number };
    case ActionType.RETIREMENT_AGE:
      return { ...state, retirementAge: payload as number };
    case ActionType.MONTHLY_INCOME:
      return { ...state, monthlyIncome: payload as number };
    case ActionType.INHERITANCE_AMOUNT:
      return { ...state, inheritanceAmount: payload as number };
    case ActionType.RENDER_RESULT:
      return { ...state, renderResult: payload as boolean };
    default:
      return state;
  }
};
