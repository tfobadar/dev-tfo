import {
  Box,
  Flex,
  FormControl,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import React, { useState } from 'react';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import {
  INPL_INITIAL_VALUES,
  INTENDED_AMOUNTS,
  SELECT_CUSTOM_STYLES,
} from './constants';
import { Input, Select, theme, Buttons } from '@tfo/mytfo-components';
import ContentSpacer from '../Spacer/Spacer';
import { StoryblokComponentProps } from '@/types/component';
import renderRichText from '@/helpers/renderRichText';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import * as Yup from 'yup';
import { formValues } from '@/types/contactUs';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import api from '@/helpers/getAxiosInstance';
import ThankYouMessage from '../subcomponents/ThankYouMessage';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';

export default function InplContactForm({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const { fields, thankYouMessage, apiErrorMessage } = blok;
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstName = {
    label: fields?.[1]?.label,
    placeholder: fields?.[1]?.placeholder,
    validators: fields?.[1]?.validators,
  };
  const lastName = {
    label: fields?.[2]?.label,
    placeholder: fields?.[2]?.placeholder,
    validators: fields?.[2]?.validators,
  };
  const phoneNo = {
    label: fields?.[3]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
  };
  const email = {
    label: fields?.[5]?.label,
    placeholder: fields?.[5]?.placeholder,
    validators: fields?.[5]?.validators,
  };
  const totalInvestment = {
    label: fields?.[7]?.label,
    placeholder: fields?.[7]?.placeholder,
    validators: fields?.[7]?.validators,
  };
  const preferredPortfolio = {
    label: fields?.[8]?.label,
    placeholder: fields?.[8]?.placeholder,
    validators: fields?.[8]?.validators,
    options: fields?.[8]?.options,
  };
  const preferredPaymentPlan = {
    label: fields?.[9]?.label,
    placeholder: fields?.[9]?.placeholder,
    validators: fields?.[9]?.validators,
    options: fields?.[9]?.options,
  };
  const ctas = fields?.[10];
  const button = {
    ...getButtonsListFromStoryblok({
      // @ts-ignore
      ctas: [ctas],
      shouldTrackEvent: false,
      buttonsProps: [
        {
          type: 'submit',
          width: { base: 'full', md: 'auto' },
          onClick: () => {
            if (!isSubmitted) {
              trackFormErrorSubmitEvent({
                label: `${'submit-' + document.title}`,
              });
            }
          },
        },
      ],
    }),
  } as ButtonsByLimit;
  const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    firstName: Yup.string().required(firstName?.validators?.[0]?.errorMessage),
    lastName: Yup.string().required(lastName?.validators?.[0]?.errorMessage),
    country: Yup.string().required(''),
    phoneNo: Yup.string()
      .required(phoneNo?.validators?.[0]?.errorMessage)
      .matches(/^[0-9]*$/, phoneNo?.validators?.[1]?.errorMessage),
    email: Yup.string()
      .email(email?.validators?.[1]?.errorMessage)
      .required(email?.validators?.[0]?.errorMessage),
    totalInvestment: Yup.string().required(
      totalInvestment?.validators?.[0]?.errorMessage,
    ),
    preferredPortfolio: Yup.string().required(
      preferredPortfolio?.validators?.[0]?.errorMessage,
    ),
    preferredPaymentPlan: Yup.string().required(
      preferredPaymentPlan?.validators?.[0]?.errorMessage,
    ),
  });
  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };
  const submit = async (
    values: formValues & {
      totalInvestment: string;
      preferredPortfolio: string;
      preferredPaymentPlan: string;
    },
  ) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'email',
          value: values.email,
        },
        {
          name: 'firstname',
          value: values.firstName,
        },
        {
          name: 'lastname',
          value: values.lastName,
        },
        {
          name: 'phone',
          value: values.country + values.phoneNo,
        },
        { name: 'investment_amount', value: values.totalInvestment },
        {
          name: 'preferred_portfolio_duration',
          value: values.preferredPortfolio,
        },
        { name: 'preferred_payment_plan', value: values.preferredPaymentPlan },
        {
          name: 'preferred_language',
          value: isEnglishLanguage(locale) ? 'English' : 'Arabic',
        },
      ],
      skipValidation: true,
      context: {
        hutk: getCookie_new('hubspotutk'),
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    try {
      const response = await api.post(
        `${
          isEnglishLanguage(locale)
            ? process.env.HB_INPL_FORM_ID_EN
            : process.env.HB_INPL_FORM_ID_AR
        }`,
        JSON.stringify(data),
      );
      if (response.status == 200) {
        setIsSubmitted(true);
        trackFormSubmitEvent({
          label: 'submit',
        });
      }
    } catch (error) {
      toast({
        title: `${apiErrorMessage}`,
        status: 'error',
        duration: 5000,
      });
    }
  };
  if (isSubmitted) {
    return <ThankYouMessage blok={thankYouMessage} />;
  }
  return (
    <>
      <Heading
        fontSize={'md'}
        fontWeight={'normal'}
        lineHeight={'120%'}
        color={'gray.400'}
        mb={4}
      >
        {renderRichText({ content: fields?.[0]?.text })}
      </Heading>
      <Formik
        initialValues={INPL_INITIAL_VALUES}
        onSubmit={submit}
        validationSchema={FORM_VALIDATION_SCHEMA}
      >
        {({ errors, touched }) => (
          <Form>
            <Flex gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
              <Box w={{ base: 'full', md: '50%' }}>
                <Box
                  as="label"
                  color={theme.colors.gray[500]}
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  htmlFor="firstName"
                >
                  {firstName.label}
                </Box>

                <Field
                  as={Input}
                  id="firstName"
                  name="firstName"
                  placeholder={firstName.placeholder}
                  mt={2}
                  bg={theme.colors.gray[800]}
                  _focus={{ borderColor: theme.colors.gray[700] }}
                  _focusVisible={{ boxShadow: 'none' }}
                  formControlProps={{
                    errorProps: { color: 'red.500', fontSize: 'xs' },
                    isInvalid: touched.firstName && errors.firstName,
                    error: errors.firstName,
                  }}
                  errorBorderColor="gray.800"
                />
              </Box>
              <Box w={{ base: 'full', md: '50%' }}>
                <Box
                  as="label"
                  color={theme.colors.gray[500]}
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  htmlFor="lastName"
                >
                  {lastName.label}
                </Box>

                <Field
                  as={Input}
                  id="lastName"
                  name="lastName"
                  placeholder={lastName.placeholder}
                  mt={2}
                  bg={theme.colors.gray[800]}
                  _focus={{ borderColor: theme.colors.gray[800] }}
                  _focusVisible={{ boxShadow: 'none' }}
                  formControlProps={{
                    errorProps: { color: 'red.500', fontSize: 'xs' },
                    isInvalid: touched.lastName && errors.lastName,
                    error: errors.lastName,
                  }}
                  errorBorderColor="gray.800"
                />
              </Box>
            </Flex>
            <Box my={6}>
              <Box
                as="label"
                color={theme.colors.gray[500]}
                fontSize={'sm'}
                fontWeight={'medium'}
                htmlFor="country"
                display={'inline-block'}
              >
                {phoneNo.label}
              </Box>
              <Flex gap={5} mt={2}>
                <Box w="250px">
                  <Field name="country">
                    {({ field, form, meta }: FieldProps) => (
                      <FormControl
                        isInvalid={!!meta.touched && !!meta.error}
                        isRequired
                      >
                        <Select
                          id="subject"
                          instanceId="country"
                          name={field.name}
                          placeholder="Select"
                          options={COUNTRY_CODES}
                          value={
                            COUNTRY_CODES
                              ? COUNTRY_CODES.find(
                                  (option: { value: any }) =>
                                    option.value === field.value,
                                )
                              : ''
                          }
                          onChange={(option: { value: string }) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          onBlur={field.onBlur}
                          isSearchable={false}
                          variant="basic"
                          customStyles={SELECT_CUSTOM_STYLES}
                        />
                        {errors.country && touched.country ? (
                          <Box
                            display={'inline-block'}
                            color={'red.500'}
                            mt={2}
                            fontSize={'xs'}
                          >
                            {errors.country}
                          </Box>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box w="80%">
                  <Field
                    as={Input}
                    id="phoneNo"
                    name="phoneNo"
                    placeholder={phoneNo.placeholder}
                    bg={theme.colors.gray[800]}
                    _focus={{ borderColor: theme.colors.gray[800] }}
                    _focusVisible={{ boxShadow: 'none' }}
                    w="full"
                    formControlProps={{
                      errorProps: { color: 'red.500', fontSize: 'xs' },
                      isInvalid: touched.phoneNo && errors.phoneNo,
                      error: errors.phoneNo,
                    }}
                    errorBorderColor="gray.800"
                  />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Box
                as="label"
                color={theme.colors.gray[500]}
                fontSize={'sm'}
                fontWeight={'medium'}
                htmlFor="email"
                display={'inline-block'}
              >
                {email.label}
              </Box>
              <Field
                as={Input}
                type="email"
                id="email"
                name="email"
                placeholder={email.placeholder}
                mt={2}
                bg={theme.colors.gray[800]}
                _focus={{ borderColor: theme.colors.gray[800] }}
                _focusVisible={{ boxShadow: 'none' }}
                formControlProps={{
                  errorProps: { color: 'red.500', fontSize: 'xs' },
                  isInvalid: touched.email && errors.email,
                  error: errors.email,
                }}
                errorBorderColor="gray.800"
              />
            </Box>
            <ContentSpacer
              blok={{
                heightMobile: 31,
                height: 31,
                showHorizontalLine: false,
              }}
            />
            <Heading
              fontSize={'md'}
              fontWeight={'normal'}
              lineHeight={'120%'}
              color={'gray.400'}
              mb={4}
            >
              {renderRichText({ content: fields?.[6]?.text })}
            </Heading>
            <Flex gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
              <Box w={{ base: 'full', md: '50%' }}>
                <Box
                  as="label"
                  color={theme.colors.gray[500]}
                  mb={2}
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  htmlFor="country"
                  display={'inline-block'}
                >
                  {totalInvestment.label}
                </Box>
                <Field name="totalInvestment">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={!!meta.touched && !!meta.error}
                      isRequired
                    >
                      <Select
                        name={field.name}
                        instanceId="totalInvestment"
                        placeholder={totalInvestment.placeholder}
                        options={INTENDED_AMOUNTS}
                        value={
                          INTENDED_AMOUNTS
                            ? INTENDED_AMOUNTS.find(
                                (option: { value: any }) =>
                                  option.value === field.value,
                              )
                            : ''
                        }
                        onChange={(option: { value: string }) =>
                          form.setFieldValue(field.name, option.value)
                        }
                        onBlur={field.onBlur}
                        isSearchable={false}
                        variant="basic"
                        customStyles={SELECT_CUSTOM_STYLES}
                      />
                      {errors.totalInvestment && touched.totalInvestment ? (
                        <Box
                          display={'inline-block'}
                          color={'red.500'}
                          mt={2}
                          fontSize={'xs'}
                        >
                          {errors.totalInvestment}
                        </Box>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box w={{ base: 'full', md: '50%' }}>
                <Box
                  as="label"
                  color={theme.colors.gray[500]}
                  mb={2}
                  fontSize={'sm'}
                  fontWeight={'medium'}
                  htmlFor="country"
                  display={'inline-block'}
                >
                  {preferredPortfolio.label}
                </Box>
                <Field name="preferredPortfolio">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={!!meta.touched && !!meta.error}
                      isRequired
                    >
                      <Select
                        instanceId="preferredPortfolio"
                        name={field.name}
                        placeholder={preferredPortfolio.placeholder}
                        options={preferredPortfolio.options}
                        value={
                          preferredPortfolio.options
                            ? preferredPortfolio.options.find(
                                (option: { value: any }) =>
                                  option.value === field.value,
                              )
                            : ''
                        }
                        onChange={(option: { value: string }) =>
                          form.setFieldValue(field.name, option.value)
                        }
                        onBlur={field.onBlur}
                        isSearchable={false}
                        variant="basic"
                        customStyles={SELECT_CUSTOM_STYLES}
                      />
                      {errors.preferredPortfolio &&
                      touched.preferredPortfolio ? (
                        <Box
                          display={'inline-block'}
                          color={'red.500'}
                          mt={2}
                          fontSize={'xs'}
                        >
                          {errors.preferredPortfolio}
                        </Box>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
            <Box>
              <Box
                as="label"
                color={theme.colors.gray[500]}
                mb={2}
                fontSize={'sm'}
                fontWeight={'medium'}
                htmlFor="country"
                display={'inline-block'}
                mt={8}
              >
                {preferredPaymentPlan.label}
              </Box>
              <Field name="preferredPaymentPlan">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={!!meta.touched && !!meta.error}
                    isRequired
                  >
                    <Select
                      instanceId="preferredPaymentPlan"
                      name={field.name}
                      placeholder={preferredPaymentPlan.placeholder}
                      options={preferredPaymentPlan.options}
                      value={
                        preferredPaymentPlan.options
                          ? preferredPaymentPlan.options.find(
                              (option: { value: any }) =>
                                option.value === field.value,
                            )
                          : ''
                      }
                      onChange={(option: { value: string }) =>
                        form.setFieldValue(field.name, option.value)
                      }
                      onBlur={field.onBlur}
                      isSearchable={false}
                      variant="basic"
                      customStyles={SELECT_CUSTOM_STYLES}
                    />
                    {errors.preferredPaymentPlan &&
                    touched.preferredPaymentPlan ? (
                      <Box
                        display={'inline-block'}
                        color={'red.500'}
                        mt={2}
                        fontSize={'xs'}
                      >
                        {errors.preferredPaymentPlan}
                      </Box>
                    ) : null}
                  </FormControl>
                )}
              </Field>
            </Box>
            <ContentSpacer
              blok={{
                heightMobile: 31,
                height: 31,
                showHorizontalLine: false,
              }}
            />
            <Box>
              <Buttons {...button} justifyContent={'start'} />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
