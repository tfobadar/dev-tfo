import formatCurrencyWithCommas from '@/helpers/formatCurrencyWithCommas';
import renderRichText from '@/helpers/renderRichText';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import { Box, Text, VStack, Flex, useBreakpointValue } from '@chakra-ui/react';
import { SbBlokData } from '@storyblok/react';
import { Button, Input } from '@tfo/mytfo-components';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';

import FieldSelect from '../../subcomponents/FieldSelect';
import FieldSlider from '../../subcomponents/FieldSlider';
import {
  getFormValidations,
  getFormValidationsYAYA,
  ImplResponse,
  INITIAL_VALUES_YAYA,
  ValuesYaYa,
} from '../constants';

interface InplFormProps {
  blok: SbBlokData & {
    body?: [];
    [key: string]: any;
    _uid?: string;
  };
  setData: Dispatch<SetStateAction<ImplResponse | undefined>>;
  setRemainingAmount: Dispatch<SetStateAction<number>>;
}

export default function InplFormYAYA({
  blok,
  setData,
  setRemainingAmount,
}: InplFormProps) {
  const {
    fields,
    sectionTitle,
    formSubmitLabel,
    resetBtnLabel,
    yearLabel,
    yearsLabel,
  } = blok;

  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const { locale } = useRouter();
  // Extract storyblok content of each fields

  const entirePortfolio = {
    label: fields?.[0]?.label,
    placeholder: fields?.[0]?.placeholder,
    validators: fields?.[0]?.validators,
  };

  const investAmountField = {
    label: fields?.[1]?.label,
    placeholder: fields?.[1]?.placeholder,
    validators: fields?.[1]?.validators,
    tooltip: fields?.[1]?.tooltip,
  };

  const initialPaymentField = {
    label: fields?.[2]?.label,
    placeholder: fields?.[2]?.placeholder,
    validators: fields?.[2]?.validators,
    tooltip: fields?.[2]?.tooltip,
  };

  const paymentDurationField = {
    label: fields?.[3]?.label,
    placeholder: fields?.[3]?.placeholder,
    options: fields?.[3]?.options || [],
    defaultOption: fields?.[3]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };

  const paymentPlanField = {
    label: fields?.[4]?.label,
    options: fields?.[4]?.options || [],
    defaultOption: fields?.[4]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };

  const portfolioValueField = {
    label: fields?.[5]?.label,
    options: fields?.[5]?.options || [],
    placeholder: fields?.[5]?.placeholder,
    defaultOption: fields?.[5]?.options?.find(
      (option: { default: boolean }) => option.default,
    ),
  };

  const yearFormatter = (value: number) => {
    if (locale == 'en') {
      return `${value} ${value == 1 ? yearLabel : yearsLabel}`;
    } else {
      if (value == 1) {
        return `سنة`;
      } else if (value == 2) {
        return `سنتان`;
      } else {
        return `${value} ${yearsLabel}`;
      }
    }
  };

  const handleApiCall = useCallback(
    async (values: ValuesYaYa) => {
      const entirePortfolio = Math.trunc(
        values.entirePortfolio
          ? parseInt(values.entirePortfolio.replace(/\D/g, ''))
          : 0,
      );
      const investmentAmount = Math.trunc(
        entirePortfolio * (values.investmentAmount / 100),
      );
      const initialPayment = Math.trunc(
        investmentAmount * (values.initialPayment / 100),
      );
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_INPL_GRAPH_URL}`,
          {
            method: 'POST',
            headers: {
              'x-functions-key': process.env.NEXT_PUBLIC_INPL_API_KEY || '',
            },
            body: JSON.stringify({
              InvestmentAmount: investmentAmount,
              InitialAmount: initialPayment,
              Duration: values.paymentDuration * 12,
              Frequency: parseInt(values.paymentPlan),
              PortfolioValueAt: parseInt(values.portfolioValueAt),
            }),
          },
        );
        const data: ImplResponse = await response.json();
        setData(data);
        setRemainingAmount(values?.investmentAmount - values.initialPayment);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    [setData, setRemainingAmount],
  );

  const handleSubmit = async (
    values: ValuesYaYa,
    { setSubmitting }: FormikHelpers<ValuesYaYa>,
  ) => {
    setSubmitting(true);
    await handleApiCall(values);
    setSubmitting(false);
  };

  useEffect(() => {
    handleApiCall(INITIAL_VALUES_YAYA);
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
        initialValues={INITIAL_VALUES_YAYA}
        validationSchema={() =>
          getFormValidationsYAYA(
            entirePortfolio,
            investAmountField,
            initialPaymentField,
          )
        }
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values, isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <VStack spacing="7" alignItems="stretch">
                <Box>
                  <Text fontWeight={500}>{entirePortfolio.label}</Text>
                  <Text fontSize="sm" color="gray.500" mb={3}>
                    {entirePortfolio.placeholder}
                  </Text>
                  <Field
                    as={Input}
                    id="entirePortfolio"
                    name="entirePortfolio"
                    inputLeftElement="$"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e?.target.value;

                      const initialPaymentUSD = formatCurrencyWithCommas(value);
                      setFieldValue('entirePortfolio', initialPaymentUSD);
                    }}
                    formControlProps={{
                      errorProps: { color: 'red.500', fontSize: 'xs' },
                      isInvalid:
                        touched.entirePortfolio && errors.entirePortfolio,
                      error: errors.entirePortfolio,
                    }}
                    errorBorderColor="gray.800"
                  />
                </Box>
                <Box>
                  <Field name="investmentAmount">
                    {({ field, form, meta }: FieldProps) => {
                      return (
                        <FieldSlider
                          field={field}
                          form={form}
                          meta={meta}
                          label={investAmountField.label}
                          placeholder={investAmountField.placeholder}
                          initialValue={INITIAL_VALUES_YAYA.investmentAmount}
                          min={1}
                          max={100}
                          step={1}
                          handleChange={(value) => {
                            form.setFieldTouched('investmentAmount', true);
                            form.setFieldValue('investmentAmount', value, true);
                          }}
                          formControlProps={{
                            errorProps: { color: 'red.500', fontSize: 'xs' },
                          }}
                          showTooltip={false}
                          tooltipLabel={investAmountField.tooltip}
                          formatter={(value: number) => {
                            let absoluteEntirePortfolio = form.values
                              .entirePortfolio
                              ? parseInt(
                                  form.values.entirePortfolio.replace(
                                    /\D/g,
                                    '',
                                  ),
                                )
                              : 0;
                            let absoluteInvestmentAmount = Math.round(
                              (absoluteEntirePortfolio * value) / 100,
                            );
                            return `${value}% (${formatCurrencyWithCommas(
                              absoluteInvestmentAmount,
                              true,
                            )})`;
                          }}
                        />
                      );
                    }}
                  </Field>
                </Box>

                <Box>
                  <Field name="initialPayment">
                    {({ field, form, meta }: FieldProps) => (
                      <FieldSlider
                        field={field}
                        form={form}
                        meta={meta}
                        label={initialPaymentField.label}
                        placeholder={initialPaymentField.placeholder}
                        min={1}
                        max={100}
                        step={1}
                        initialValue={INITIAL_VALUES_YAYA.initialPayment}
                        handleChange={(value) => {
                          form.setFieldTouched('initialPayment', true);
                          form.setFieldValue('initialPayment', value, true);
                        }}
                        formControlProps={{
                          errorProps: { color: 'red.500', fontSize: 'xs' },
                        }}
                        showTooltip={false}
                        tooltipLabel={initialPaymentField.tooltip}
                        formatter={(value: number) => {
                          let absoluteEntirePortfolio = form.values
                            .entirePortfolio
                            ? parseInt(
                                form.values.entirePortfolio.replace(/\D/g, ''),
                              )
                            : 0;
                          let absoluteInitialPayment = Math.round(
                            (((absoluteEntirePortfolio *
                              form.values.investmentAmount) /
                              100) *
                              value) /
                              100,
                          );
                          return `${value}% (${formatCurrencyWithCommas(
                            absoluteInitialPayment,
                            true,
                          )})`;
                        }}
                      />
                    )}
                  </Field>
                </Box>

                <Box>
                  <Field name="paymentDuration">
                    {({ field, form, meta }: FieldProps) => (
                      <FieldSlider
                        field={field}
                        form={form}
                        meta={meta}
                        label={paymentDurationField.label}
                        placeholder={paymentDurationField.placeholder}
                        min={1}
                        max={5}
                        step={1}
                        initialValue={INITIAL_VALUES_YAYA.paymentDuration}
                        handleChange={(value) => {
                          form.setFieldValue('paymentDuration', value);
                        }}
                        formControlProps={{
                          errorProps: { color: 'red.500', fontSize: 'xs' },
                        }}
                        formatter={yearFormatter}
                      />
                    )}
                  </Field>
                </Box>

                <FieldSelect
                  name="paymentPlan"
                  label={paymentPlanField.label}
                  options={paymentPlanField.options}
                />

                <Box>
                  <Field name="portfolioValueAt">
                    {({ field, form, meta }: FieldProps) => (
                      <FieldSlider
                        field={field}
                        form={form}
                        meta={meta}
                        label={portfolioValueField.label}
                        placeholder={portfolioValueField.placeholder}
                        min={1}
                        max={10}
                        step={1}
                        initialValue={parseInt(
                          INITIAL_VALUES_YAYA.portfolioValueAt,
                        )}
                        handleChange={(value) => {
                          form.setFieldValue('portfolioValueAt', value);
                        }}
                        formControlProps={{
                          errorProps: { color: 'red.500', fontSize: 'xs' },
                        }}
                        formatter={yearFormatter}
                      />
                    )}
                  </Field>
                </Box>
              </VStack>
              <Flex
                flexDir="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Button
                  onClick={() => {
                    trackButtonEvent({
                      label: formSubmitLabel,
                      placement: 'middlePage',
                    });
                  }}
                  type="submit"
                  variant="outline"
                  mt={8}
                  isLoading={isSubmitting}
                  width={['full', 'full', 'auto']}
                >
                  {formSubmitLabel}
                </Button>
                <Button
                  variant="link"
                  mt={8}
                  size="sm"
                  onClick={() => {
                    trackButtonEvent({
                      label: resetBtnLabel,
                      placement: 'middlePage',
                    });
                    setFieldValue(
                      'entirePortfolio',
                      INITIAL_VALUES_YAYA.entirePortfolio,
                    );
                    setFieldValue(
                      'investmentAmount',
                      INITIAL_VALUES_YAYA.investmentAmount,
                    );
                    setFieldValue(
                      'initialPayment',
                      INITIAL_VALUES_YAYA.initialPayment,
                    );
                    setFieldValue(
                      'paymentDuration',
                      INITIAL_VALUES_YAYA.paymentDuration,
                    );
                    setFieldValue(
                      'paymentPlan',
                      INITIAL_VALUES_YAYA.paymentPlan,
                      true,
                    );
                  }}
                >
                  {resetBtnLabel}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
