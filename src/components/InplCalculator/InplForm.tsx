import formatCurrencyWithCommas from '@/helpers/formatCurrencyWithCommas';
import renderRichText from '@/helpers/renderRichText';
import { Box, Text, VStack } from '@chakra-ui/react';
import { SbBlokData } from '@storyblok/react';
import { Button, Input } from '@tfo/mytfo-components';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';

import FieldSelect from '../subcomponents/FieldSelect';
import {
  getFormValidations,
  ImplResponse,
  INITIAL_VALUES,
  Values,
} from './constants';

interface InplFormProps {
  blok: SbBlokData & {
    body?: [];
    [key: string]: any;
    _uid?: string;
  };
  setData: Dispatch<SetStateAction<ImplResponse | undefined>>;
}

export default function InplForm({ blok, setData }: InplFormProps) {
  const { fields, sectionTitle, formSubmitLabel } = blok;
  // Extract storyblok content of each fields
  const investAmountField = {
    label: fields?.[0]?.label,
    placeholder: fields?.[0]?.placeholder,
    validators: fields?.[0]?.validators,
  };

  const initialPaymentField = {
    label: fields?.[1]?.label,
    placeholder: fields?.[1]?.placeholder,
    validators: fields?.[1]?.validators,
  };

  const paymentDurationField = {
    label: fields?.[2]?.label,
    options: fields?.[2]?.options || [],
    defaultOption: fields?.[2]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };

  const portfolioValueField = {
    label: fields?.[4]?.label,
    options: fields?.[4]?.options || [],
    defaultOption: fields?.[4]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };
  const paymentPlanField = {
    label: fields?.[3]?.label,
    options: fields?.[3]?.options || [],
    defaultOption: fields?.[3]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };

  const handleApiCall = useCallback(
    async (values: Values) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_INPL_GRAPH_URL}`,
          {
            method: 'POST',
            headers: {
              'x-functions-key': process.env.NEXT_PUBLIC_INPL_API_KEY || '',
            },
            body: JSON.stringify({
              InvestmentAmount: values.investmentAmount
                ? parseInt(values.investmentAmount.replace(/\D/g, ''))
                : 0,
              InitialAmount: values.initialPayment
                ? parseInt(values.initialPayment.replace(/\D/g, ''))
                : 0,
              Duration: parseInt(values.paymentDuration) * 12,
              Frequency: parseInt(values.paymentPlan),
              PortfolioValueAt: parseInt(values.portfolioValueAt),
            }),
          },
        );
        const data: ImplResponse = await response.json();
        setData(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    [setData],
  );

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    setSubmitting(true);
    await handleApiCall(values);
    setSubmitting(false);
  };

  useEffect(() => {
    handleApiCall(INITIAL_VALUES);
  }, [handleApiCall]);

  return (
    <Box
      p={8}
      bg="gray.850"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.800"
    >
      <Text fontSize={['lg']} fontWeight={500} mb={10}>
        {renderRichText({ content: sectionTitle?.[0]?.title })}
      </Text>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={() =>
          getFormValidations(investAmountField, initialPaymentField)
        }
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          errors,
          touched,
          values,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form>
            <VStack spacing="7" alignItems="stretch">
              <Box>
                <Text>{investAmountField.label}</Text>
                <Text fontSize="sm" color="gray.500" mb={3}>
                  {investAmountField.placeholder}
                </Text>
                <Field
                  as={Input}
                  id="investmentAmount"
                  name="investmentAmount"
                  label={investAmountField.label}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e?.target.value;

                    const investmentAmountUSD = formatCurrencyWithCommas(value);
                    setFieldValue('investmentAmount', investmentAmountUSD);
                  }}
                  onBlur={() => {
                    if (values.investmentAmount) {
                      const minimumInitialInvestment =
                        parseInt(values.investmentAmount.replace(/\D/g, '')) *
                        0.25;
                      const investmentAmountUSD = formatCurrencyWithCommas(
                        minimumInitialInvestment,
                      );
                      setFieldValue('initialPayment', investmentAmountUSD);
                    }
                    setFieldTouched('investmentAmount', true);
                  }}
                  inputLeftElement="$"
                  formControlProps={{
                    errorProps: { color: 'red.500', fontSize: 'xs' },
                    isInvalid:
                      touched.investmentAmount && errors.investmentAmount,
                    error: errors.investmentAmount,
                  }}
                  errorBorderColor="gray.800"
                />
              </Box>

              <Box>
                <Text>{initialPaymentField.label}</Text>
                <Text fontSize="sm" color="gray.500" mb={3}>
                  {initialPaymentField.placeholder}
                </Text>
                <Field
                  as={Input}
                  id="initialPayment"
                  name="initialPayment"
                  inputLeftElement="$"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e?.target.value;

                    const initialPaymentUSD = formatCurrencyWithCommas(value);
                    setFieldValue('initialPayment', initialPaymentUSD);
                  }}
                  formControlProps={{
                    errorProps: { color: 'red.500', fontSize: 'xs' },
                    isInvalid: touched.initialPayment && errors.initialPayment,
                    error: errors.initialPayment,
                  }}
                  errorBorderColor="gray.800"
                />
              </Box>

              <FieldSelect
                name="paymentDuration"
                label={paymentDurationField.label}
                options={paymentDurationField.options}
              />
              <FieldSelect
                name="portfolioValueAt"
                label={portfolioValueField.label}
                options={portfolioValueField.options}
              />

              <FieldSelect
                name="paymentPlan"
                label={paymentPlanField.label}
                options={paymentPlanField.options}
              />
            </VStack>
            <Button
              type="submit"
              variant="outline"
              mt={8}
              isLoading={isSubmitting}
            >
              {formSubmitLabel}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
