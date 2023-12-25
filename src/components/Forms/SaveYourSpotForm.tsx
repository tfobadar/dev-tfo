import React, { useState } from 'react';
import { Input, Select, theme, Buttons } from '@tfo/mytfo-components';
import {
  Box,
  FormControl,
  Heading,
  useToast,
  Text,
  useBreakpointValue,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps } from 'formik';
import {
  SAVE_YOUR_SPOT_FORM_INITIAL_VALUES,
  SELECT_CUSTOM_STYLES,
} from './constants';
import { StoryblokComponentProps } from '@/types/component';
import api from '@/helpers/getAxiosInstance';
import renderRichText from '@/helpers/renderRichText';
import * as Yup from 'yup';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import {
  trackFeedbackFormErrorSubmitEvent,
  trackFeedbackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';

export default function FeedBackForm({ blok }: StoryblokComponentProps) {
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fields, sectionTitle, thankYouMessage, hubSpotFormID } = blok;
  const { thankYouTitle, thankYouDescription } = thankYouMessage?.[0];
  const isMobile = useBreakpointValue({ base: true, md: false });
  const thankYouDesc = thankYouDescription
    ? renderRichText({ content: thankYouDescription })
    : '';
  const title = sectionTitle?.[0]?.title
    ? renderRichText({ content: sectionTitle?.[0]?.title })
    : '';

  const titleSalutation = {
    label: fields?.[0]?.label,
    placeholder: fields?.[0]?.placeholder,
    validators: fields?.[0]?.validators,
    selectOption: fields?.[0]?.options,
  };
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
  const email = {
    label: fields?.[3]?.label,
    placeholder: fields?.[3]?.placeholder,
    validators: fields?.[3]?.validators,
  };
  const membershipId = {
    label: fields?.[4]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
  };

  const ctas = fields?.[5];
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
              trackFeedbackFormErrorSubmitEvent({
                label: `${'submit-' + document.title}`,
              });
            }
          },
        },
      ],
    }),
  } as ButtonsByLimit;

  const bottomLabel = {
    label: fields?.[6]?.text,
  };

  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };
  const submit = async (values: {
    titleSalutation: string;
    firstName: string;
    lastName: string;
    email: string;
    membershipId: string;
  }) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'title_salutation',
          value: values.titleSalutation,
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
          name: 'email',
          value: values.email,
        },
        {
          name: 'phone',
          value: '',
        },
        {
          name: 'mcc_id',
          value: values.membershipId,
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
      api.defaults.baseURL = `${process.env.HB_FORM_API}/${process.env.NEXT_PUBLIC_HUBSPOT_ID}`;
      const response = await api.post(`${hubSpotFormID}`, JSON.stringify(data));
      if (response.status == 200) {
        setIsSubmitted(true);
        trackFeedbackFormSubmitEvent({
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
    titleSalutation: Yup.string().required(
      titleSalutation?.validators?.[0]?.errorMessage,
    ),
    firstName: Yup.string().required(firstName?.validators?.[0]?.errorMessage),
    lastName: Yup.string().required(lastName?.validators?.[0]?.errorMessage),
    email: Yup.string()
      .email(email?.validators?.[1]?.message)
      .required(email?.validators?.[0]?.errorMessage),
    membershipId: Yup.string().required(
      membershipId?.validators?.[0]?.errorMessage,
    ),
  });

  return (
    <Flex
      w="full"
      flexDir={{ base: 'column', md: 'row' }}
      id={isMobile && sectionTitle[0]?.id}
    >
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        me={5}
        ms={{ base: 0, lg: 5 }}
        my={{ base: 8, md: 0 }}
      />
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
        <Box w="full">
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
            initialValues={SAVE_YOUR_SPOT_FORM_INITIAL_VALUES}
            onSubmit={submit}
            validationSchema={FORM_VALIDATION_SCHEMA}
          >
            {({ errors, touched }) => (
              <Form>
                <Flex my={6}>
                  <Box w="50%">
                    <Box
                      as="label"
                      color={theme.colors.gray[500]}
                      fontSize={'sm'}
                      fontWeight={'medium'}
                      htmlFor="titleSalutation"
                      mb={2}
                      display="inline-block"
                    >
                      {titleSalutation.label}
                    </Box>
                    <Field name="titleSalutation">
                      {({ field, form, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={!!meta.touched && !!meta.error}
                          isRequired
                        >
                          <Select
                            id="titleSalutation"
                            name={field.name}
                            placeholder={titleSalutation.placeholder}
                            options={titleSalutation.selectOption}
                            value={
                              titleSalutation.selectOption
                                ? titleSalutation.selectOption.find(
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
                          {errors.titleSalutation && touched.titleSalutation ? (
                            <Box
                              display={'inline-block'}
                              color={'red.500'}
                              mt={2}
                              fontSize={'xs'}
                            >
                              {errors.titleSalutation}
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
                <Box my={6}>
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
                <Box my={6}>
                  <Box
                    as="label"
                    color={theme.colors.gray[500]}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    htmlFor="membershipId"
                    display={'inline-block'}
                  >
                    {membershipId.label}
                  </Box>
                  <Field
                    as={Input}
                    id="membershipId"
                    name="membershipId"
                    placeholder={membershipId.placeholder}
                    mt={2}
                    bg={theme.colors.gray[800]}
                    _focus={{ borderColor: theme.colors.gray[800] }}
                    _focusVisible={{ boxShadow: 'none' }}
                    formControlProps={{
                      errorProps: { color: 'red.500', fontSize: 'xs' },
                      isInvalid: touched.membershipId && errors.membershipId,
                      error: errors.membershipId,
                    }}
                    errorBorderColor="gray.800"
                  />
                </Box>
                <Box mt={14}>
                  <Buttons {...button} justifyContent={'start'} />
                  <Text py={4} textAlign={{ base: 'center', md: 'start' }}>
                    {renderRichText({ content: bottomLabel?.label })}
                  </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Flex>
  );
}
