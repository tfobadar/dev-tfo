import React, { useState } from 'react';
import { Input, Select, theme, Buttons, Textarea } from '@tfo/mytfo-components';
import {
  Box,
  Flex,
  FormControl,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps } from 'formik';
import { GENERAL_INITIAL_VALUES, SELECT_CUSTOM_STYLES } from './constants';
import { StoryblokComponentProps } from '@/types/component';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import api from '@/helpers/getAxiosInstance';
import { formValues } from '@/types/contactUs';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import renderRichText from '@/helpers/renderRichText';
import * as Yup from 'yup';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import {
  trackGeneralEnquiryFormErrorSubmitEvent,
  trackGeneralEnquiryFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
export default function GeneralEnquiryForm({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fields, sectionTitle, thankYouMessage } = blok;
  const { thankYouTitle, thankYouDescription } = thankYouMessage?.[0];
  const thankYouDesc = thankYouDescription
    ? renderRichText({ content: thankYouDescription })
    : '';
  const title = sectionTitle?.[0]?.title
    ? renderRichText({ content: sectionTitle?.[0]?.title })
    : '';
  const firstName = {
    label: fields?.[0]?.label,
    placeholder: fields?.[0]?.placeholder,
    validators: fields?.[0]?.validators,
  };
  const lastName = {
    label: fields?.[1]?.label,
    placeholder: fields?.[1]?.placeholder,
    validators: fields?.[1]?.validators,
  };
  const phoneNo = {
    label: fields?.[2]?.label,
    placeholder: fields?.[3]?.placeholder,
    validators: fields?.[3]?.validators,
  };
  const email = {
    label: fields?.[4]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
  };
  const textArea = {
    label: fields?.[5]?.label,
    placeholder: fields?.[5]?.placeholder,
    validators: fields?.[5]?.validators,
  };
  const ctas = fields?.[6];
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
              trackGeneralEnquiryFormErrorSubmitEvent({
                label: `${'submit-' + document.title}`,
              });
            }
          },
        },
      ],
    }),
  } as ButtonsByLimit;
  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };
  const submit = async (values: formValues & { message: string }) => {
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
        { name: 'message', value: values.message },
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
            ? process.env.HB_ENQUIRY_FORM_ID_EN
            : process.env.HB_ENQUIRY_FORM_ID_AR
        }`,
        JSON.stringify(data),
      );
      if (response.status == 200) {
        setIsSubmitted(true);
        trackGeneralEnquiryFormSubmitEvent({
          label: 'submit',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };
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
    message: Yup.string().required(textArea?.validators?.[0]?.errorMessage),
  });
  return (
    <>
      {isSubmitted ? (
        <>
          {thankYouMessage && thankYouMessage.length > 0 ? (
            <Heading
              as="h2"
              fontSize={'2xl'}
              fontWeight={'normal'}
              color="white"
              textTransform={'capitalize'}
            >
              {thankYouTitle}
            </Heading>
          ) : null}
          {thankYouDesc?.[0]?.props?.children !== null ? (
            <Text
              color={'gray.400'}
              fontSize={'md'}
              fontWeight={'normal'}
              mt={4}
            >
              {thankYouDesc}
            </Text>
          ) : null}
        </>
      ) : (
        <>
          {title?.[0]?.props?.children !== null ? (
            <Heading
              as="h2"
              fontSize={{ base: 'lg', md: '2xl' }}
              fontWeight={'normal'}
              color="white"
              mb={7}
            >
              {title}
            </Heading>
          ) : null}
          <Formik
            initialValues={GENERAL_INITIAL_VALUES}
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
                <Box mt={6}>
                  <Box
                    as="label"
                    color={theme.colors.gray[500]}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    htmlFor="message"
                    display={'inline-block'}
                  >
                    {textArea.label}
                  </Box>
                  <Field
                    as={Textarea}
                    id="message"
                    name="message"
                    placeholder={textArea.placeholder}
                    mt={2}
                    bg={theme.colors.gray[800]}
                    _focus={{ borderColor: theme.colors.gray[800] }}
                    _focusVisible={{ boxShadow: 'none' }}
                    formControlProps={{
                      errorProps: { color: 'red.500', fontSize: 'xs' },
                      isInvalid: touched.message && errors.message,
                      error: errors.message,
                    }}
                    errorBorderColor="gray.800"
                  />
                </Box>
                <Box mt={16}>
                  <Buttons {...button} justifyContent={'start'} />
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}
