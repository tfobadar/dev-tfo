import { Reducer } from 'react';

export enum ActionType {
  RETURN_PERCENTAGE = 'RETURN_PERCENTAGE',
  ANNUAL_INCOME_PERCENTAGE = 'ANNUAL_INCOME_PERCENTAGE',
  RENDER_RESULT = 'RENDER_RESULT',
}

type InitialState = {
  returnPercentage?: number;
  annualIncomePercentage?: number;
  renderResult?: boolean;
};

type Action = {
  type: ActionType;
  payload: number | boolean;
};

export const reducerFn: Reducer<InitialState, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.RETURN_PERCENTAGE:
      return { ...state, returnPercentage: action.payload as number };
    case ActionType.ANNUAL_INCOME_PERCENTAGE:
      return { ...state, annualIncomePercentage: action.payload as number };
    case ActionType.RENDER_RESULT:
      return { ...state, renderResult: action.payload as boolean };
    default:
      return state;
  }
};
