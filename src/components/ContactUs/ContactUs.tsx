import React, { useEffect, useState } from 'react';
import { Input, Select, theme, Buttons } from '@tfo/mytfo-components';
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  Image,
  Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps } from 'formik';
import { ContactUsProps } from '@/types/contactUs';
import { INITIAL_VALUES, MAX_FILE_SIZE } from './constants';
import * as Yup from 'yup';
import renderRichText from '@/helpers/renderRichText';
import FileInput from '@/components/subcomponents/FileInput';
import { SELECT_CUSTOM_STYLES } from '../Forms/constants';
import dynamic from 'next/dynamic';
import { getIPad } from '@/helpers/getIpad';
import TFOButtons from '../Buttons/Buttons';
import GAHiddenFields from '../Forms/GAHiddenFields';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function ContactUs(props: ContactUsProps) {
  const {
    title,
    description,
    formTitle,
    formDescription,
    handleSubmit,
    showImage,
    imageProps,
    selectOptions,
    footerText,
    firstName,
    lastName,
    email,
    resume,
    phoneNo,
    button,
    thankYouTitle,
    thankYouDescription,
    thankYouCTAs,
    showThankYouMessage,
    showResume = false,
    ...rest
  } = props;

  const { src, alt, as, srcSet, sizes, ...imageRest } = imageProps ?? {};
  const desc = description ? renderRichText({ content: description }) : '';
  const formDesc = formDescription
    ? renderRichText({ content: formDescription })
    : '';
  const formRichTitle = formTitle ? renderRichText({ content: formTitle }) : '';
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
    resume: showResume
      ? Yup.mixed()
          .required(resume?.validators?.[0]?.errorMessage)
          .test(
            'is-valid-size',
            resume?.validators?.[1]?.errorMessage || '',
            (value: Yup.AnyObject) => value && value?.size <= MAX_FILE_SIZE,
          )
      : Yup.mixed(),
  });

  const [isIPad, setIsIPad] = useState<boolean | 0>(false);

  useEffect(() => {
    setIsIPad(getIPad());
  }, []);

  return (
    <Reveal>
      <Flex gap={{ base: 8, lg: 14 }} {...rest}>
        <Box w={{ base: 'full', md: '50%' }}>
          {title && title.length > 0 ? (
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight={'normal'}
              color="white"
              textTransform={'capitalize'}
            >
              {title}
            </Heading>
          ) : null}
          {desc?.[0]?.props?.children !== null && !showThankYouMessage ? (
            <Text
              color={'gray.400'}
              fontSize={'md'}
              fontWeight={'normal'}
              mt={6}
            >
              {desc}
            </Text>
          ) : null}
          {formRichTitle?.[0]?.props?.children !== null ? (
            <Heading
              as="h2"
              display={{ base: 'block', md: 'none' }}
              fontSize={'2xl'}
              fontWeight={'normal'}
              color="white"
              textTransform={'capitalize'}
              mb={6}
            >
              {formRichTitle}
            </Heading>
          ) : null}
          {showImage && (
            <Image
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              as={as}
              sx={{
                width: 'full',
                height: { base: 235, md: isIPad ? 'full' : '610px' },
                objectFit: 'cover',
                ...imageRest,
              }}
            />
          )}
        </Box>
        <Box w={{ base: 'full', md: '50%' }}>
          {formRichTitle?.[0]?.props?.children !== null ? (
            <Heading
              as="h2"
              display={{ base: 'none', md: 'block' }}
              fontSize={'4xl'}
              fontWeight={'normal'}
              color="white"
              textTransform={'capitalize'}
              mb={showImage ? 6 : 0}
            >
              {formRichTitle}
            </Heading>
          ) : null}
          {showThankYouMessage ? (
            <>
              {thankYouTitle && thankYouTitle.length > 0 ? (
                <Heading
                  as="h2"
                  fontSize={'lg'}
                  fontWeight={'normal'}
                  color="white"
                  textTransform={'capitalize'}
                >
                  {thankYouTitle}
                </Heading>
              ) : null}

              {thankYouDescription && thankYouDescription.length > 0 ? (
                <Text
                  color={'gray.400'}
                  fontSize={'md'}
                  fontWeight={'normal'}
                  mt={6}
                >
                  {thankYouDescription}
                </Text>
              ) : null}

              {thankYouCTAs && (
                <Box mt={6} display="flex">
                  <TFOButtons blok={thankYouCTAs[0]} />
                </Box>
              )}
            </>
          ) : (
            <>
              {formDesc?.[0]?.props?.children !== null ? (
                <Text
                  color={'gray.400'}
                  fontSize={'md'}
                  mb={8}
                  fontWeight={'normal'}
                >
                  {formDesc}
                </Text>
              ) : null}
              <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={handleSubmit}
                validationSchema={FORM_VALIDATION_SCHEMA}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Flex gap={4}>
                      <Box w="50%">
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
                      <Box w="50%">
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
                    <Stack direction={['column', 'row']} spacing={4}>
                      <Box flex="1">
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
                          mt={2}
                          id="email"
                          name="email"
                          placeholder={email.placeholder}
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
                      {showResume ? (
                        <Box flex="1">
                          <Box
                            as="label"
                            color={theme.colors.gray[500]}
                            fontSize={'sm'}
                            fontWeight={'medium'}
                            htmlFor="resume"
                            display={'inline-block'}
                          >
                            {resume?.label}
                          </Box>
                          <Field
                            as={FileInput}
                            type="input"
                            id="resume"
                            name="resume"
                            mt={2}
                            placeholder={resume?.placeholder}
                            bg={theme.colors.gray[800]}
                            handleChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              const target = e.target as HTMLInputElement;
                              setFieldValue('resume', target?.files?.[0], true);
                            }}
                            borderRadius="sm"
                            _focus={{ borderColor: theme.colors.gray[800] }}
                            _focusVisible={{ boxShadow: 'none' }}
                            formControlProps={{
                              errorProps: { color: 'red.500', fontSize: 'xs' },
                              isInvalid: touched.resume && errors.resume,
                              error: errors.resume,
                            }}
                            errorBorderColor="gray.800"
                          />
                        </Box>
                      ) : null}
                    </Stack>
                    <Heading
                      as="h3"
                      fontWeight={'normal'}
                      fontSize={'sm'}
                      color={theme.colors.gray[400]}
                      mt={8}
                    >
                      {footerText}
                    </Heading>
                    <Box mt={16}>
                      <Buttons {...button} justifyContent={'start'} />
                    </Box>
                    <GAHiddenFields />
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Flex>
    </Reveal>
  );
}
