import * as Yup from 'yup';
export const INITIAL_VALUES = {
  investmentAmount: '$300,000',
  initialPayment: '$75,000',
  paymentDuration: '5',
  paymentPlan: '3',
  portfolioValueAt: '5',
};
export const INITIAL_VALUES_YAYA = {
  entirePortfolio: '10,000,000',
  investmentAmount: 15,
  initialPayment: 25,
  paymentDuration: 1,
  paymentPlan: '3',
  portfolioValueAt: '5',
};

export interface Values {
  investmentAmount: string;
  initialPayment: string;
  paymentDuration: string;
  paymentPlan: string;
  portfolioValueAt: string;
}

export interface ValuesYaYa {
  investmentAmount: number;
  initialPayment: number;
  paymentDuration: number;
  paymentPlan: string;
  entirePortfolio: string;
  portfolioValueAt: string;
}
export const PAYMENT_DURATION_OPTIONS = [];

export interface ImplResponse {
  portfolioValueAt: number;
  frequency: number;
  estimatedEarnings: number;
  expectedTotalReturn: number;
  initial_payment: number;
  installment_amount: number;
  distributions: ImplDistribution;
  yield: number;
}
export interface CurrentImplResponse {
  portfolioValueAt: number;
  frequency: number;
  estimatedEarnings: number;
  expectedTotalReturn: number;
  initial_payment: number;
  installment_amount: number;
  distributions: ImplDistribution;
  yield: number;
}
export interface ImplDistribution {
  CumulativeInvestmentAmount: number[];
  Deposits: number[];
  PortfolioValue: number[];
}

export type BlokField = {
  validators: {
    errorMessage: string;
    maxLength?: string;
    minLength?: string;
  }[];
  label: string;
  placeholder: string;
};

export const getFormValidations = (
  investAmountField: BlokField,
  initialPaymentField: BlokField,
) =>
  Yup.object().shape({
    investmentAmount: Yup.string()
      .required(investAmountField.validators?.[0]?.errorMessage)
      .test('min', investAmountField.validators?.[1]?.errorMessage, (value) => {
        let x = value ? parseInt(value.replace(/\D/g, '')) : 0;
        return x >= 300000;
      })
      .test('max', investAmountField.validators?.[2]?.errorMessage, (value) => {
        let x = value ? parseInt(value.replace(/\D/g, '')) : 0;
        return x <= 25000000;
      }),
    initialPayment: Yup.string()
      .required(initialPaymentField.validators?.[0]?.errorMessage)
      .test(
        'min-investment-amount',
        initialPaymentField.validators?.[1]?.errorMessage,
        function (value) {
          let initialPayment = value ? parseInt(value.replace(/\D/g, '')) : 0;
          let { investmentAmount } = this.parent;
          let investmentAmountAbsolute = investmentAmount
            ? parseInt(investmentAmount.replace(/\D/g, ''))
            : 0;
          return initialPayment >= investmentAmountAbsolute * 0.25;
        },
      )
      .test(
        'max',
        initialPaymentField.validators?.[2]?.errorMessage,
        function (value) {
          let initialPayment = value ? parseInt(value.replace(/\D/g, '')) : 0;
          let { investmentAmount } = this.parent;
          let investmentAmountAbsolute = investmentAmount
            ? parseInt(investmentAmount.replace(/\D/g, ''))
            : 0;
          return initialPayment <= investmentAmountAbsolute;
        },
      ),
    paymentDuration: Yup.string().required(),
    paymentPlan: Yup.string().required(),
  }) as Yup.ObjectSchema<Values>;

export const getFormValidationsYAYA = (
  entirePortfolio: BlokField,
  investAmountField: BlokField,
  initialPaymentField: BlokField,
) =>
  Yup.object().shape({
    entirePortfolio: Yup.string()
      .required(entirePortfolio.validators?.[0]?.errorMessage)
      .test('min', entirePortfolio.validators?.[1]?.errorMessage, (value) => {
        const minValue = parseInt(
          entirePortfolio.validators?.[1]?.minLength || '300000',
        );
        let x = value ? parseInt(value.replace(/\D/g, '')) : 0;
        return x >= minValue;
      })
      .test('max', entirePortfolio.validators?.[2]?.errorMessage, (value) => {
        const maxValue = parseInt(
          entirePortfolio.validators?.[2]?.maxLength || '25000000',
        );
        let x = value ? parseInt(value.replace(/\D/g, '')) : 0;
        return x <= maxValue;
      }),
    investmentAmount: Yup.number()
      .required(investAmountField.validators?.[0]?.errorMessage)
      .test(
        'min',
        investAmountField.validators?.[1]?.errorMessage,
        function (value) {
          let { entirePortfolio } = this.parent;
          const minValue = parseInt(
            investAmountField.validators?.[1]?.minLength || '300000',
          );
          let absoluteEntirePortfolio = entirePortfolio
            ? parseInt(entirePortfolio.replace(/\D/g, ''))
            : 0;

          return (value * absoluteEntirePortfolio) / 100 >= minValue;
        },
      )
      .test('max', investAmountField.validators?.[2]?.errorMessage, (value) => {
        let x = value;
        return x <= 25000000;
      }),
    initialPayment: Yup.number()
      .required(initialPaymentField.validators?.[0]?.errorMessage)
      .min(
        parseInt(initialPaymentField.validators?.[1]?.minLength || '25'),
        initialPaymentField.validators?.[1]?.errorMessage,
      ),
    paymentDuration: Yup.number().required(),
    paymentPlan: Yup.string().required(),
  }) as Yup.ObjectSchema<ValuesYaYa>;
