import {
  Box,
  ButtonProps,
  Flex,
  FormControl,
  useToast,
  Text,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import React, { useContext, useState } from 'react';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import { REFERRAL_SEND_INVITE, SELECT_CUSTOM_STYLES } from './constants';
import {
  Input,
  Select,
  theme,
  Buttons,
  Checkbox,
  Modal,
} from '@tfo/mytfo-components';
import { StoryblokComponentProps } from '@/types/component';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import * as Yup from 'yup';
import { formValues } from '@/types/contactUs';
import ThankYouMessage from '../subcomponents/ThankYouMessage';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
import api from '@/helpers/getAxiosInstance';
import ReferralFormContext from '@/utils/ReferralFormContext';
import getAPIErrorMessages from '@/helpers/getAPIErrorMessages';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import renderRichText from '@/helpers/renderRichText';
import Link from 'next/link';
import { scrollToSection } from '@/helpers/scrollToSection';

export default function ReferralForm({
  blok,
  queryParams = null,
}: StoryblokComponentProps): React.JSX.Element {
  const toast = useToast();
  const { locale } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    fields,
    thankYouMessage,
    apiErrorMessage,
    apiValidationMessages,
    sectionTitle,
  } = blok ?? {};
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<formValues | null>(null);
  const { updateReferralData, referralData } = useContext(ReferralFormContext);
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
    label: fields?.[3]?.label,
    placeholder: fields?.[3]?.placeholder,
    validators: fields?.[3]?.validators,
  };
  const email = {
    label: fields?.[4]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
  };
  const ctas = fields?.[5];

  const checkbox = {
    label: fields?.[6]?.label,
    placeholder: fields?.[6]?.placeholder,
    validators: fields?.[6]?.validators,
    tooltip: fields?.[6]?.tooltip,
  };

  let buttonDisabledState = {};
  if (isLoading) {
    buttonDisabledState = {
      isLoading: true,
    };
  }
  const button = {
    ...getButtonsListFromStoryblok({
      // @ts-ignore
      ctas: [ctas],
      shouldTrackEvent: false,
      buttonsProps: [
        {
          type: 'submit',
          width: { base: 'full', md: 'auto' },
          ...buttonDisabledState,
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
    phoneNo: Yup.string()
      .matches(/^[0-9]*$/, phoneNo?.validators?.[0]?.errorMessage)
      .required(phoneNo?.validators?.[1]?.errorMessage),
    termsAndCondition: Yup.boolean().isTrue(
      checkbox?.validators?.[0]?.errorMessage,
    ),
  });

  const submit = async (values: formValues) => {
    setIsLoading(true);

    // set form values
    setFormValues(values);

    const data = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      countryCode: values.country.trim(),
      phoneNumber: values.country.trim() + values.phoneNo.toString().trim(),
      referredByContactId: queryParams,
    };

    try {
      api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
      const response = await api.post(
        `${REFERRAL_SEND_INVITE}`,
        JSON.stringify(data),
      );
      if (response.status === 200) {
        // Tracker Insiders user event
        // Call this after form submission and on success else Hubspot will create contact before
        trackInsidersEvent({ email: values.email });

        updateReferralData({
          firstName: '',
          lastName: '',
          country: '+966',
          phoneNo: '',
          email: '',
          termsAndCondition: false,
        });
        setIsSubmitted(true);
        setIsLoading(false);
        trackFormSubmitEvent({
          label: 'submit',
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      const message = getAPIErrorMessages({
        error,
        defaultMessage: apiErrorMessage,
        validators: apiValidationMessages,
      });
      toast({
        title: `${message}`,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const emailPropsAdded = thankYouMessage.map(
    (blokData: StoryblokComponentProps) => {
      return { ...blokData };
    },
  );

  if (isSubmitted) {
    const buttonProps: ButtonProps[] = [
      {
        onClick: () => {
          setIsSubmitted(false);
        },
      },
    ];
    return (
      <Flex direction="column">
        <ThankYouMessage
          blok={emailPropsAdded}
          formValues={formValues}
          buttonProps={buttonProps}
          queryParams={queryParams}
        />
      </Flex>
    );
  }

  const REFERRAL_FORM_INITIAL_VALUES = {
    firstName: referralData?.firstName || '',
    lastName: referralData?.lastName || '',
    country: referralData?.country || '+966',
    phoneNo: referralData?.phoneNo || '',
    email: referralData?.email || '',
    termsAndCondition: referralData?.termsAndCondition || false,
  };
  return (
    <Box>
      <Formik
        initialValues={REFERRAL_FORM_INITIAL_VALUES}
        onSubmit={submit}
        validationSchema={FORM_VALIDATION_SCHEMA}
        validate={(values: formValues) => {
          updateReferralData(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form style={{ width: '100%' }}>
            <Flex gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
              <Box w={{ base: 'full', md: '50%' }}>
                {firstName.label && (
                  <Box
                    as="label"
                    color={theme.colors.gray[500]}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    htmlFor="firstName"
                  >
                    {firstName.label}
                  </Box>
                )}
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
                {lastName.label && (
                  <Box
                    as="label"
                    color={theme.colors.gray[500]}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    htmlFor="lastName"
                  >
                    {lastName.label}
                  </Box>
                )}
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
              {phoneNo.label && (
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
              )}
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
                          isSearchable={true}
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
                    type="number"
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
            <Box my={6}>
              {email.label && (
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
              )}
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
              <HStack>
                <Checkbox
                  name="termsAndCondition"
                  checkboxItems={[
                    {
                      label: '',
                      value: '',
                    },
                  ]}
                  colorScheme="tfo"
                  size="sm"
                  variant="filled"
                  onChange={(e) => {
                    setFieldValue('termsAndCondition', e?.target?.checked);
                  }}
                  isChecked={referralData?.termsAndCondition || false}
                />
                <Box>
                  <Text as="span">{checkbox.label}</Text>
                  <Text
                    as="span"
                    ms="1"
                    color="tfo.primary.500"
                    cursor="pointer"
                    onClick={() => scrollToSection(checkbox.tooltip)}
                  >
                    {checkbox.placeholder}
                  </Text>
                </Box>
              </HStack>
              {touched.termsAndCondition && errors.termsAndCondition && (
                <Text color="red.500" fontSize="xs" pt="1">
                  {errors.termsAndCondition as string}
                </Text>
              )}
            </Box>
            <Box>
              <Buttons {...button} justifyContent={'start'} />
            </Box>
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        customModalBody={
          <Text pt="10">
            {renderRichText({ content: sectionTitle[0].description })}
          </Text>
        }
        closeButtonProps={{
          borderRadius: '50%',
          top: '34px',
          right: isEnglishLanguage(locale) ? '24px' : 'unset',
          left: isEnglishLanguage(locale) ? 'unset' : '24px',
          margin: 0,
        }}
        size={{ base: 'sm', md: '2xl' }}
        overlayProps={{ bg: 'rgba(34, 34, 34, 0.5)' }}
        contentProps={{ pb: 10 }}
      />
    </Box>
  );
}
