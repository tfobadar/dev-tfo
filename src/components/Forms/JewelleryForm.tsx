import { Box, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import renderRichText from '@/helpers/renderRichText';
import {
  FormControl,
  Input,
  Select,
  StepperWithChild,
  theme,
} from '@tfo/mytfo-components';
import { StoryblokComponentProps } from '@/types/component';
import { AnimatePresence, motion } from 'framer-motion';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  JEWELLERY_FORM_INITIAL_VALUES,
  JEWELLERY_SELECT_CUSTOM_STYLES,
} from './constants';
import CustomButtonGroup from '../CustomButtonGroup/CustomButtonGroup';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import Title from '../Title/Title';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
import { trackFeedbackFormSubmitEvent } from '@/helpers/trackClickEvents';
import api from '@/helpers/getAxiosInstance';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';

type FormValues = {
  investmentAmount: string[];
  investmentGoal: string[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  country: string;
};

export default function JewelleryForm({ blok }: StoryblokComponentProps) {
  const toast = useToast();
  const { fields, thankYouMessage, sectionTitle } = blok;
  const { thankYouTitle, thankYouDescription } = thankYouMessage?.[0];

  const [prevStep, setPrevStep] = React.useState(1);
  const [activeStep, setActiveStep] = React.useState(1);
  const [isIncrement, setIsIncrement] = React.useState(true);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { locale } = useRouter();
  const selectOptions = COUNTRY_CODES;

  React.useEffect(() => {
    setPrevStep(activeStep);
    if (prevStep < activeStep) {
      setIsIncrement(true);
    } else {
      setIsIncrement(false);
    }
  }, [activeStep]);

  const investmentGoal = {
    heading: fields?.[0]?.text,
    subHeading: fields?.[1]?.text,
    selectOption: fields?.[2]?.options,
  };
  const investmentAmount = {
    heading: fields?.[3]?.text,
    subHeading: fields?.[4]?.text,
    selectOption: fields?.[5]?.options,
  };
  const firstName = {
    label: fields?.[6]?.label,
    placeholder: fields?.[6]?.placeholder,
    validators: fields?.[6]?.validators,
  };
  const lastName = {
    label: fields?.[7]?.label,
    placeholder: fields?.[7]?.placeholder,
    validators: fields?.[7]?.validators,
  };
  const phoneNo = {
    label: fields?.[8]?.label,
    placeholder: fields?.[8]?.placeholder,
    validators: fields?.[8]?.validators,
  };
  const email = {
    label: fields?.[9]?.label,
    placeholder: fields?.[9]?.placeholder,
    validators: fields?.[9]?.validators,
  };
  const btnText = {
    submitBtnText: fields?.[10]?.text,
    nextBtnText: fields?.[11]?.text,
    prevBtnText: fields?.[12]?.text,
  };

  const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    investmentGoal: Yup.array().of(Yup.string()).defined().required(),
    investmentAmount: Yup.array().of(Yup.string()).defined().required(),
    firstName: Yup.string().required(firstName?.validators?.[0]?.errorMessage),
    lastName: Yup.string().required(lastName?.validators?.[0]?.errorMessage),
    country: Yup.string().required(''),
    phoneNo: Yup.string()
      .required(phoneNo?.validators?.[0]?.errorMessage)
      .matches(/^[0-9]*$/, phoneNo?.validators?.[1]?.errorMessage),
    email: Yup.string()
      .email(email?.validators?.[1]?.message)
      .required(email?.validators?.[0]?.errorMessage),
  });

  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };

  const submitHandler = async (values: FormValues) => {
    trackInsidersEvent({ email: values.email });

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'which_of_the_following_investment_goals_resonate_with_you_',
          value: values.investmentGoal.toString(),
        },
        {
          name: 'how_much_are_you_willing_to_invest__',
          value: values.investmentAmount[0],
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
          value: values.country + values.phoneNo,
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
      let formSubmissionID = isEnglishLanguage(locale)
        ? process.env.NEXT_PUBLIC_JEWELRY_LP_FORM_ID_EN
        : process.env.NEXT_PUBLIC_JEWELRY_LP_FORM_ID_AR;
      api.defaults.baseURL = `${process.env.HB_FORM_API}/${process.env.NEXT_PUBLIC_HUBSPOT_ID}`;
      const response = await api.post(
        `${formSubmissionID}`,
        JSON.stringify(data),
      );
      if (response.status == 200) {
        setIsSubmitted(true);
        setActiveStep(activeStep + 1);
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

  const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          x: isIncrement ? '100%' : '-100%',
        }}
        animate={{
          opacity: 1,
          x: '0%',
          transition: { duration: 0.5 },
          position: 'relative',
          zIndex: 1,
        }}
        exit={{
          opacity: 0,
          x: isIncrement ? '-100%' : '100%',
          transition: { duration: 0.5 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );

  /**
   * Determines the disabled state of a button based on the current form values and active step.
   *
   * @param {FormValues} values - The form values.
   * @returns {boolean} - True if the button should be disabled, false otherwise.
   */
  const getButtonDisabledStat = (values: FormValues) => {
    switch (activeStep) {
      case 1:
        return !values?.investmentGoal?.length;
      case 2:
        return values?.investmentAmount?.length !== 1;
      case 3:
        return false;
      default:
        return true;
    }
  };

  return (
    <Box
      py={{ base: 9, md: 20 }}
      px={{
        base: 0,
        md: 20,
      }}
    >
      <Title
        blok={sectionTitle[0]}
        containerProps={{ p: '0 !important' }}
        headingProps={{
          color: 'gray.700',
        }}
        textProps={{
          color: 'gray.700',
          mb: '6',
        }}
      />

      <Text color="gray.600" fontSize="xs" mb="4">
        {isSubmitted && thankYouTitle ? activeStep - 1 : activeStep}{' '}
        {isEnglishLanguage(locale) ? 'of' : 'من'} 3
      </Text>

      <Formik
        initialValues={JEWELLERY_FORM_INITIAL_VALUES}
        onSubmit={submitHandler}
        validationSchema={FORM_VALIDATION_SCHEMA}
      >
        {({
          values,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
          submitCount,
        }) => (
          <Form>
            <StepperWithChild
              steps={[
                {
                  children: (
                    <AnimationWrapper>
                      <Text fontSize="xl" color="gray.700" mb="4">
                        {renderRichText({
                          content: investmentGoal.heading,
                        })}
                      </Text>
                      <Text color="gray.600" fontSize="xs" mb="7">
                        {renderRichText({
                          content: investmentGoal.subHeading,
                        })}
                      </Text>
                      <CustomButtonGroup
                        listOfButtons={investmentGoal.selectOption}
                        onClickCallBack={(callBack: string[]) => {
                          setFieldValue('investmentGoal', callBack);
                        }}
                        selectedOption={values.investmentGoal}
                        isMultiSelect
                      />
                    </AnimationWrapper>
                  ),
                },
                {
                  children: (
                    <AnimationWrapper>
                      <Text fontSize="xl" color="gray.700" mb="4">
                        {renderRichText({
                          content: investmentAmount.heading,
                        })}
                      </Text>
                      <Text color="gray.600" fontSize="xs" mb="7">
                        {renderRichText({
                          content: investmentAmount.subHeading,
                        })}
                      </Text>
                      <CustomButtonGroup
                        listOfButtons={investmentAmount.selectOption}
                        onClickCallBack={(callBack: string[]) => {
                          setFieldValue('investmentAmount', callBack);
                        }}
                        selectedOption={values.investmentAmount}
                      />
                    </AnimationWrapper>
                  ),
                },
                {
                  children: (
                    <AnimationWrapper>
                      <Flex gap={4}>
                        <Box w="50%">
                          <Box
                            as="label"
                            color={theme.colors.gray[900]}
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
                            bg={theme.colors['tfo'].contrast[200]}
                            color="gray.850"
                            borderColor={'darkLava.400'}
                            _focus={{ borderColor: 'darkLava.400' }}
                            _hover={{ borderColor: 'darkLava.400' }}
                            _placeholder={{ color: 'gray.700' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            formControlProps={{
                              errorProps: { color: 'red.500', fontSize: 'xs' },
                              isInvalid:
                                touched.firstName &&
                                errors.firstName &&
                                submitCount >= 2,
                              error: errors.firstName,
                            }}
                            errorBorderColor="gray.800"
                          />
                        </Box>
                        <Box w="50%">
                          <Box
                            as="label"
                            color={theme.colors.gray[900]}
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
                            bg={theme.colors['tfo'].contrast[200]}
                            color="gray.850"
                            borderColor={'darkLava.400'}
                            _focus={{ borderColor: 'darkLava.400' }}
                            _hover={{ borderColor: 'darkLava.400' }}
                            _placeholder={{ color: 'gray.700' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            formControlProps={{
                              errorProps: { color: 'red.500', fontSize: 'xs' },
                              isInvalid:
                                touched.lastName &&
                                errors.lastName &&
                                submitCount >= 2,
                              error: errors.lastName,
                            }}
                            errorBorderColor="gray.800"
                          />
                        </Box>
                      </Flex>
                      <Box my={6}>
                        <Box
                          as="label"
                          color={theme.colors.gray[900]}
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
                                    id="country"
                                    instanceId="country"
                                    name={field.name}
                                    options={selectOptions}
                                    value={
                                      selectOptions
                                        ? selectOptions.find(
                                            (option) =>
                                              option.value === field.value,
                                          )
                                        : ''
                                    }
                                    onChange={(option: { value: string }) =>
                                      form.setFieldValue(
                                        field.name,
                                        option.value,
                                      )
                                    }
                                    onBlur={field.onBlur}
                                    isSearchable={false}
                                    variant="basic"
                                    customStyles={
                                      JEWELLERY_SELECT_CUSTOM_STYLES
                                    }
                                    colorScheme="pam"
                                  />
                                  {errors.country &&
                                  touched.country &&
                                  submitCount >= 2 ? (
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
                              bg={theme.colors['tfo'].contrast[200]}
                              color="gray.850"
                              borderColor={'darkLava.400'}
                              _focus={{ borderColor: 'darkLava.400' }}
                              _hover={{ borderColor: 'darkLava.400' }}
                              _placeholder={{ color: 'gray.700' }}
                              _focusVisible={{ boxShadow: 'none' }}
                              formControlProps={{
                                errorProps: {
                                  color: 'red.500',
                                  fontSize: 'xs',
                                },
                                isInvalid:
                                  touched.phoneNo &&
                                  errors.phoneNo &&
                                  submitCount >= 2,
                                error: errors.phoneNo,
                              }}
                              errorBorderColor="gray.800"
                            />
                          </Box>
                        </Flex>
                      </Box>
                      <Stack direction={['column', 'row']} spacing={4}>
                        <Box flex="1">
                          <Box
                            as="label"
                            color={theme.colors.gray[900]}
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
                            mt={2}
                            id="email"
                            name="email"
                            placeholder={email.placeholder}
                            bg={theme.colors['tfo'].contrast[200]}
                            color="gray.850"
                            borderColor={'darkLava.400'}
                            _focus={{ borderColor: 'darkLava.400' }}
                            _hover={{ borderColor: 'darkLava.400' }}
                            _placeholder={{ color: 'gray.700' }}
                            _focusVisible={{ boxShadow: 'none' }}
                            formControlProps={{
                              errorProps: { color: 'red.500', fontSize: 'xs' },
                              isInvalid:
                                touched.email &&
                                errors.email &&
                                submitCount >= 2,
                              error: errors.email,
                            }}
                            errorBorderColor="gray.800"
                          />
                        </Box>
                      </Stack>
                    </AnimationWrapper>
                  ),
                },
                {
                  children: (
                    <AnimationWrapper>
                      {thankYouTitle && thankYouTitle?.length > 0 ? (
                        <Heading
                          id={thankYouMessage[0]?.id}
                          as="h2"
                          fontSize={'xl'}
                          fontWeight={'normal'}
                          color="gray.900"
                          textTransform={'capitalize'}
                        >
                          {thankYouTitle}
                        </Heading>
                      ) : null}

                      {thankYouDescription !== null ? (
                        <Text
                          color={'gray.850'}
                          fontSize={'md'}
                          fontWeight={'normal'}
                          mt={4}
                        >
                          {renderRichText({ content: thankYouDescription })}
                        </Text>
                      ) : null}
                    </AnimationWrapper>
                  ),
                },
              ]}
              activeStep={activeStep}
              buttons={
                activeStep === 4
                  ? undefined
                  : {
                      limit: 2,
                      mt: '12',
                      list: [
                        {
                          text: renderRichText({
                            content: btnText?.prevBtnText,
                          }),
                          variant: 'outline',
                          leftIcon: isEnglishLanguage(locale) ? (
                            <ArrowBackIcon />
                          ) : (
                            <ArrowForwardIcon />
                          ),
                          display: activeStep === 1 ? 'none' : 'flex',
                          position: 'static',
                          _hover: {
                            bgColor: 'tfo.primary.100',
                            color: theme.colors['tfo'].contrast[200],
                          },
                          _focus: {
                            bgColor: 'transparent',
                            color: 'tfo.primary.400',
                          },
                          _disabled: {
                            bgColor: 'tfo.primary.100',
                            cursor: 'not-allowed',
                            color: theme.colors['tfo'].contrast[200],
                            opacity: 0.5,
                          },
                          onClick: () => {
                            setActiveStep(activeStep - 1);
                          },
                        },
                        {
                          text:
                            activeStep === 3
                              ? renderRichText({
                                  content: btnText?.submitBtnText,
                                })
                              : renderRichText({
                                  content: btnText?.nextBtnText,
                                }),
                          isLoading: isSubmitting,
                          ...(activeStep != 3 && {
                            rightIcon: isEnglishLanguage(locale) ? (
                              <ArrowForwardIcon />
                            ) : (
                              <ArrowBackIcon />
                            ),
                          }),
                          type: activeStep === 3 ? 'submit' : 'button',
                          variant: activeStep === 1 ? 'outline' : 'solid',
                          position: 'static',
                          bgColor: '#DCCCAA80',
                          color: 'tfo.primary.400',
                          _hover: {
                            bgColor: 'tfo.primary.100',
                            color: theme.colors['tfo'].contrast[200],
                          },
                          _disabled: {
                            bgColor: 'tfo.primary.100',
                            cursor: 'not-allowed',
                            color: theme.colors['tfo'].contrast[200],
                            opacity: 0.5,
                          },
                          isDisabled: getButtonDisabledStat(values),
                          onClick:
                            activeStep !== 3
                              ? () => {
                                  setActiveStep(activeStep + 1);
                                }
                              : undefined,
                        },
                      ],
                    }
              }
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
