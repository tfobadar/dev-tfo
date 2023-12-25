import { Box, Flex, FormControl, Heading, useToast } from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import React, { useState } from 'react';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import {
  DOWNLOAD_CONTENT_FORM_INITIAL_VALUES,
  JOB_TITLE,
  SELECT_CUSTOM_STYLES,
  SENIORITY_LEVEL,
} from './constants';
import { Input, Select, theme, Buttons } from '@tfo/mytfo-components';
import { StoryblokComponentProps } from '@/types/component';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import * as Yup from 'yup';
import { formValues } from '@/types/contactUs';
import api from '@/helpers/getAxiosInstance';
import ThankYouMessage from '../subcomponents/ThankYouMessage';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import renderRichText from '@/helpers/renderRichText';
import { WEBINAR_FORM_TYPE } from '@/constants/globals';
import { scrollToSection } from '@/helpers/scrollToSection';

export default function DownloadContentForm({ blok }: StoryblokComponentProps) {
  const { fields, thankYouMessage, apiErrorMessage } = blok ?? {};
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const [userEmail, setUserEmail] = useState('');

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
  const email = {
    label: fields?.[2]?.label,
    placeholder: fields?.[2]?.placeholder,
    validators: fields?.[2]?.validators,
  };
  const jobTitle = {
    label: fields?.[3]?.label,
    placeholder: fields?.[3]?.placeholder,
    validators: fields?.[3]?.validators,
  };
  const seniorityLevel = {
    label: fields?.[4]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
  };
  const companyName = {
    label: fields?.[5]?.label,
    placeholder: fields?.[5]?.placeholder,
    validators: fields?.[5]?.validators,
  };
  const phoneNo = {
    label: fields?.[6]?.label,
    placeholder: fields?.[7]?.placeholder,
    validators: fields?.[7]?.validators,
  };
  const preferredTopics = {
    label: fields?.[9]?.label,
    placeholder: fields?.[9]?.placeholder,
    validators: fields?.[9]?.validators,
    PREFERRED_TOPICS: fields?.[9]?.options?.map(
      (preferred: StoryblokComponentProps) => ({
        label: preferred.label,
        value: preferred.value,
      }),
    ),
  };
  const ctas = fields?.[8];
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
    email: Yup.string()
      .email(email?.validators?.[1]?.errorMessage)
      .required(email?.validators?.[0]?.errorMessage),
    jobTitle: Yup.string().required(jobTitle?.validators?.[0]?.errorMessage),
    seniorityLevel: Yup.string().required(
      seniorityLevel?.validators?.[0]?.errorMessage,
    ),
    companyName: Yup.string().required(
      companyName?.validators?.[0]?.errorMessage,
    ),
    phoneNo: Yup.string().required(phoneNo?.validators?.[0]?.errorMessage),
    preferredTopics: preferredTopics.label
      ? Yup.mixed().required(preferredTopics?.validators?.[0]?.errorMessage)
      : Yup.mixed(),
  });
  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };
  const submit = async (
    values: formValues & {
      jobTitle: string;
      seniorityLevel: string;
      companyName: string;
    },
  ) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });
    scrollToSection(blok.sectionTitle[0]?.id);
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
        {
          name: 'position_new',
          value: values.jobTitle,
        },
        {
          name: 'seniority_level',
          value: values.seniorityLevel,
        },
        {
          name: 'company',
          value: values.companyName,
        },
      ],
      skipValidation: true,
      context: {
        hutk: getCookie_new('hubspotutk'),
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    setUserEmail(data.fields[0].value);
    if (preferredTopics.label) {
      data.fields.push({
        name: 'preferredTopics',
        value: values.preferredTopics,
      });
    }
    if (blok.formType === WEBINAR_FORM_TYPE) {
      data.fields.push(
        {
          name: 'webinar_type',
          value: blok.formType,
        },
        {
          name: 'preferred_language',
          value: isEnglishLanguage(locale) ? 'English' : 'Arabic',
        },
      );
    }
    try {
      const response = await api.post(
        `${blok.hubSpotFormID}`,
        JSON.stringify(data),
      );

      if (response.status === 200) {
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
  const emailPropsAdded = thankYouMessage.map(
    (blokData: StoryblokComponentProps) => {
      if (blok.formType === WEBINAR_FORM_TYPE) {
        return { ...blokData, email: userEmail, id: blok.sectionTitle[0].id };
      } else {
        return { ...blokData };
      }
    },
  );
  if (isSubmitted) {
    return (
      <Flex direction="column">
        <ThankYouMessage blok={emailPropsAdded} />
      </Flex>
    );
  }
  return (
    <Box>
      {blok.formType === WEBINAR_FORM_TYPE && (
        <Heading
          pb={6}
          fontWeight="medium"
          id={blok.sectionTitle[0].id}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          {renderRichText({ content: blok.sectionTitle[0].title })}
        </Heading>
      )}
      <Formik
        initialValues={DOWNLOAD_CONTENT_FORM_INITIAL_VALUES}
        onSubmit={submit}
        validationSchema={FORM_VALIDATION_SCHEMA}
      >
        {({ errors, touched }) => (
          <Form style={{ width: '100%' }}>
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

            <Flex my={6} gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
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
                  {jobTitle.label}
                </Box>
                <Field name="jobTitle">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={!!meta.touched && !!meta.error}
                      isRequired
                    >
                      <Select
                        name={field.name}
                        placeholder={jobTitle.placeholder}
                        options={JOB_TITLE}
                        value={
                          JOB_TITLE
                            ? JOB_TITLE.find(
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
                      {errors.jobTitle && touched.jobTitle ? (
                        <Box
                          display={'inline-block'}
                          color={'red.500'}
                          mt={2}
                          fontSize={'xs'}
                        >
                          {errors.jobTitle}
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
                  {seniorityLevel.label}
                </Box>
                <Field name="seniorityLevel">
                  {({ field, form, meta }: FieldProps) => (
                    <FormControl
                      isInvalid={!!meta.touched && !!meta.error}
                      isRequired
                    >
                      <Select
                        name={field.name}
                        placeholder={seniorityLevel.placeholder}
                        options={SENIORITY_LEVEL}
                        value={
                          SENIORITY_LEVEL
                            ? SENIORITY_LEVEL.find(
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
                      {errors.seniorityLevel && touched.seniorityLevel ? (
                        <Box
                          display={'inline-block'}
                          color={'red.500'}
                          mt={2}
                          fontSize={'xs'}
                        >
                          {errors.seniorityLevel}
                        </Box>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>

            <Box my={6}>
              <Box
                as="label"
                color={theme.colors.gray[500]}
                fontSize={'sm'}
                fontWeight={'medium'}
                htmlFor="email"
                display={'inline-block'}
              >
                {companyName.label}
              </Box>
              <Field
                as={Input}
                type="companyName"
                id="companyName"
                name="companyName"
                placeholder={companyName.placeholder}
                mt={2}
                bg={theme.colors.gray[800]}
                _focus={{ borderColor: theme.colors.gray[800] }}
                _focusVisible={{ boxShadow: 'none' }}
                formControlProps={{
                  errorProps: { color: 'red.500', fontSize: 'xs' },
                  isInvalid: touched.companyName && errors.companyName,
                  error: errors.companyName,
                }}
                errorBorderColor="gray.800"
              />
            </Box>

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
            {preferredTopics.label && (
              <Box my={6}>
                <Box w={{ base: 'full', md: '100%' }}>
                  <Box
                    as="label"
                    color={theme.colors.gray[500]}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    htmlFor="preferredTopics"
                  >
                    {preferredTopics.label}
                  </Box>
                  <Box mt={2}>
                    <Field name="preferredTopics">
                      {({ field, form, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={!!meta.touched && !!meta.error}
                          isRequired
                        >
                          <Select
                            id="subject"
                            name={field.name}
                            placeholder={preferredTopics.placeholder}
                            options={preferredTopics.PREFERRED_TOPICS}
                            onChange={(option: { value: string }) =>
                              form.setFieldValue(field.name, option.value)
                            }
                            onBlur={field.onBlur}
                            isSearchable={true}
                            variant="basic"
                            customStyles={SELECT_CUSTOM_STYLES}
                          />
                          {errors.preferredTopics && touched.preferredTopics ? (
                            <Box
                              display={'inline-block'}
                              color={'red.500'}
                              mt={2}
                              fontSize={'xs'}
                            >
                              {String(errors.preferredTopics)}
                            </Box>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Box>
              </Box>
            )}
            <Box>
              <Buttons {...button} justifyContent={'start'} />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
