import React, { useState } from 'react';
import { Input, Select, theme, Buttons } from '@tfo/mytfo-components';
import {
  Box,
  Flex,
  FormControl,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps } from 'formik';
import {
  TIME_ZONES,
  INTENDED_AMOUNTS,
  SCHEDULE_INITIAL_VALUES,
  NATIONALITY,
  SELECT_CUSTOM_STYLES,
} from './constants';
import * as Yup from 'yup';
import { StoryblokComponentProps } from '@/types/component';
import Flatpickr from 'react-flatpickr';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import api from '@/helpers/getAxiosInstance';
import {
  callFormValues,
  getScheduleResponse,
  timeSlotsType,
} from '@/types/scheduleCall';
import { COUNTRY_CODES } from '../Sections/ContactOurExperts/constants';
import renderRichText from '@/helpers/renderRichText';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { formatDateToParts } from '@/helpers/formatDate';
import { CalendarIcon } from '@chakra-ui/icons';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import Loader from '../subcomponents/Spinner/Loader';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
export default function ScheduleCallForm({ blok }: StoryblokComponentProps) {
  const { fields, sectionTitle, thankYouMessage } = blok;
  const { thankYouTitle, thankYouDescription } = thankYouMessage?.[0];
  const [isLoading, setIsLoading] = useState(false);
  const thankYouDesc = thankYouDescription
    ? renderRichText({ content: thankYouDescription })
    : '';
  const title = sectionTitle?.[0]?.title
    ? renderRichText({ content: sectionTitle?.[0]?.title })
    : '';
  const date = {
    label: fields?.[1]?.label,
    placeholder: fields?.[1]?.placeholder,
    validators: fields?.[1]?.validators,
  };
  const time = {
    label: fields?.[2]?.label,
    placeholder: fields?.[2]?.placeholder,
    validators: fields?.[2]?.validators,
  };
  const timeZoneInp = {
    label: fields?.[3]?.label,
    placeholder: fields?.[3]?.placeholder,
    validators: fields?.[3]?.validators,
  };
  const nationality = {
    label: fields?.[4]?.label,
    placeholder: fields?.[4]?.placeholder,
    validators: fields?.[4]?.validators,
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
  const intendedAmount = {
    label: fields?.[8]?.label,
    placeholder: fields?.[8]?.placeholder,
    validators: fields?.[8]?.validators,
  };
  const phoneNo = {
    label: fields?.[9]?.label,
    placeholder: fields?.[10]?.placeholder,
    validators: fields?.[10]?.validators,
  };
  const email = {
    label: fields?.[11]?.label,
    placeholder: fields?.[11]?.placeholder,
    validators: fields?.[11]?.validators,
  };
  const ctas = fields?.[12];
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
  const router = useRouter();
  const toast = useToast();
  const { locale } = router;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeZone, setTimeZone] = useState('Asia/Riyadh');
  const [timeSlots, setTimeSlots] = useState<timeSlotsType>([]);
  const submit = async (values: callFormValues) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });

    let data = new FormData();
    let pageName = 'Contact Us';
    let pageUrl = window.location.href;
    const parts = formatDateToParts({
      date: values.date,
      options: { year: 'numeric', month: '2-digit', day: '2-digit' },
    });
    const formattedDate = `${parts[4].value}-${parts[0].value}-${parts[2].value}`;
    data.append('timeZone', timeZone);
    data.append('date', formattedDate);
    data.append('time', values.time);
    data.append('firstName', values.firstName);
    data.append('lastName', values.lastName);
    data.append('email', values.email);
    data.append('phone', values.country + values.phoneNo);
    data.append('lang', isEnglishLanguage(locale) ? 'en' : 'ar');
    data.append('nationality', values.nationality);
    data.append('schedular_intended_investment_amount', values.intendedAmount);
    data.append('pageName', pageName);
    data.append('pageUrl', pageUrl);
    try {
      const response = await api.post(
        `${process.env.SCHEDULER_BASE_API}/MakeAppointment`,
        data,
      );
      if (response.status == 200) {
        setIsSubmitted(true);
        trackFormSubmitEvent({
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
    date: Yup.string().required(date?.validators?.[0]?.errorMessage),
    time: Yup.string().required(time?.validators?.[0]?.errorMessage),
    nationality: Yup.string().required(
      nationality?.validators?.[0]?.errorMessage,
    ),
    intendedAmount: Yup.string().required(
      intendedAmount?.validators?.[0]?.errorMessage,
    ),
  });
  const disableWeekends = (date: { getDay: () => number }) => {
    return date.getDay() === 5 || date.getDay() === 6;
  };

  const handleDateChange = async (date: Date[]) => {
    setIsLoading(true);
    try {
      const parts = formatDateToParts({
        date: date[0],
        options: { year: 'numeric', month: '2-digit', day: '2-digit' },
      });
      const formattedDate = `${parts[4].value}-${parts[0].value}-${parts[2].value}`;
      const payload = {
        timeZone: timeZone,
        date: formattedDate,
        lang: isEnglishLanguage(locale) ? 'en' : 'ar',
      };
      const response = await api.post<getScheduleResponse>(
        `${process.env.SCHEDULER_BASE_API}/GetSchedule`,
        JSON.stringify(payload),
      );
      if (response) {
        setIsLoading(false);
        const availiabilitySlots =
          response?.data?.AvailabilityView?.Availability;
        const tempSlotsArr = [];
        for (let index = 0; index < availiabilitySlots.length; index++) {
          const element = availiabilitySlots[index];
          let obj = {
            label: element.Option,
            value: element.Value,
          };
          tempSlotsArr.push(obj);
        }
        setTimeSlots(tempSlotsArr);
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };
  return (
    <>
      <Loader
        isLoading={isLoading}
        top={0}
        left={0}
        overflow={'hidden'}
        height={'100vh'}
        bg={'#00000069'}
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
            initialValues={SCHEDULE_INITIAL_VALUES}
            onSubmit={submit}
            validationSchema={FORM_VALIDATION_SCHEMA}
          >
            {({ errors, touched }) => (
              <Form>
                <Flex gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <Box position="relative" w={{ base: 'full', md: '50%' }}>
                    <Box
                      as="label"
                      color={theme.colors.gray[500]}
                      fontSize={'sm'}
                      fontWeight={'medium'}
                      htmlFor="country"
                      display={'inline-block'}
                      mb={2}
                    >
                      {date.label}
                    </Box>
                    <Field name="date">
                      {({ field, form, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={!!meta.touched && !!meta.error}
                          isRequired
                        >
                          <Flatpickr
                            options={{
                              minDate: 'today',
                              disable: [disableWeekends],
                              onChange: (date: Date[]) => {
                                form.setFieldValue(field.name, date[0]);
                                handleDateChange(date);
                              },
                            }}
                            placeholder={date.placeholder}
                          />
                          {errors.date && touched.date ? (
                            <Box
                              display={'inline-block'}
                              color={'red.500'}
                              mt={2}
                              fontSize={'xs'}
                            >
                              {errors.date}
                            </Box>
                          ) : null}
                          <CalendarIcon
                            w="5"
                            h="5"
                            top="12px"
                            position="absolute"
                            color="tfo.primary.500"
                            left={isEnglishLanguage(locale) ? 'unset' : 4}
                            right={isEnglishLanguage(locale) ? 4 : 'unset'}
                          />
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
                      {time.label}
                    </Box>
                    <Field name="time">
                      {({ field, form, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={!!meta.touched && !!meta.error}
                          isRequired
                        >
                          <Select
                            name={field.name}
                            placeholder={time.placeholder}
                            options={timeSlots}
                            value={
                              timeSlots
                                ? timeSlots.find(
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
                          {errors.time && touched.time ? (
                            <Box
                              display={'inline-block'}
                              color={'red.500'}
                              mt={2}
                              fontSize={'xs'}
                            >
                              {errors.time}
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
                    htmlFor="country"
                    display={'inline-block'}
                    mb={2}
                  >
                    {timeZoneInp.label}
                  </Box>
                  <Select
                    name={'timeZone'}
                    placeholder={timeZoneInp.placeholder}
                    options={TIME_ZONES}
                    value={
                      TIME_ZONES
                        ? TIME_ZONES.find(
                            (option: { value: any }) =>
                              option.value === timeZone,
                          )
                        : ''
                    }
                    onChange={(option: { value: string }) =>
                      setTimeZone(option.value)
                    }
                    isSearchable={false}
                    variant="basic"
                    customStyles={SELECT_CUSTOM_STYLES}
                  />
                </Box>
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
                <Flex gap={4} mt={6} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <Box w={{ base: 'full', md: '50%' }}>
                    <Box
                      as="label"
                      color={theme.colors.gray[500]}
                      fontSize={'sm'}
                      fontWeight={'medium'}
                      htmlFor="nationality"
                    >
                      {nationality.label}
                    </Box>
                    <Field name="nationality">
                      {({ field, form, meta }: FieldProps) => (
                        <FormControl
                          mt={2}
                          isInvalid={!!meta.touched && !!meta.error}
                          isRequired
                        >
                          <Select
                            id="nationality"
                            placeholder={nationality.placeholder}
                            options={NATIONALITY}
                            value={
                              NATIONALITY
                                ? NATIONALITY.find(
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
                          {errors.nationality && touched.nationality ? (
                            <Box
                              display={'inline-block'}
                              color={'red.500'}
                              mt={2}
                              fontSize={'xs'}
                            >
                              {errors.nationality}
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
                    htmlFor="intendedAmount"
                    display={'inline-block'}
                    mb={2}
                  >
                    {intendedAmount.label}
                  </Box>

                  <Field name="intendedAmount">
                    {({ field, form, meta }: FieldProps) => (
                      <FormControl
                        isInvalid={!!meta.touched && !!meta.error}
                        isRequired
                      >
                        <Select
                          name={field.name}
                          placeholder={intendedAmount.placeholder}
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
                        {errors.intendedAmount && touched.intendedAmount ? (
                          <Box
                            display={'inline-block'}
                            color={'red.500'}
                            mt={2}
                            fontSize={'xs'}
                          >
                            {errors.intendedAmount}
                          </Box>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
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
