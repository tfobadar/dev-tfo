import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Button, Input, theme } from '@tfo/mytfo-components';
import { MAX_CONTAINER_WIDTH, PAGE_BANNER_TYPES } from '@/constants/globals';
import renderRichText from '@/helpers/renderRichText';
import { SBButton, StoryblokComponentProps } from '@/types/component';
import api from '@/helpers/getAxiosInstance';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
  trackLinkEvent,
} from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function CreateAccountBanner({
  blok,
  queryParams,
}: StoryblokComponentProps) {
  const router = useRouter();
  const formInitialValues: { email: string } = { email: '' };
  /**
   * @name getCTAButton
   * @param buttonsList<SBButtonList>
   * @param bannerType
   * @returns buttonProps:<Object{any}>
   * @description used for generating button with different props
   */
  const toast = useToast();
  const getCTAButton = (
    buttonsList: SBButton[],
    bannerType: string = 'createAccount',
  ) => {
    let buttonProps: any = {
      size: { base: 'md', md: 'lg' },
      fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
      height: '40px',
      justifyContent: 'start',
    };
    // if banner type is `emailSubscription` change button type as submit else default
    if (bannerType === PAGE_BANNER_TYPES.EMAIL_SUBSCRIPTION) {
      buttonsList.map((button: SBButton) => {
        buttonProps = {
          ...buttonProps,
          children: renderRichText({ content: button.text }),
          variant: button.variant,
          type: 'submit',
          flex: '0 0 auto',
          paddingX: 4,
          paddingY: 2.5,
          onClick: () => {
            trackFormErrorSubmitEvent({
              label: renderAsString({ content: button.text }),
              placement: 'middlePage',
            });
          },
        };
      });
    } else {
      buttonsList.map((button: SBButton) => {
        buttonProps = {
          ...buttonProps,
          children: renderRichText({ content: button.text }),
          variant: button.variant,
          as: NextLink,
          href: `${getLinkFromStoryblok(button?.link)}${
            queryParams ? '/' + queryParams : ''
          }`,
          target: button?.link?.target || '_self',
          onClick: () => {
            trackLinkEvent({
              label: renderAsString({ content: button.text }),
              placement: 'middlePage',
            });
          },
        };
      });
    }
    return buttonProps;
  };
  /**
   * Submit function for subscription
   */
  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };
  const handleSubmit = async (values: { email: string }) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'email',
          value: values.email,
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
        `${process.env.HB_NEWSLETTER_API}`,
        JSON.stringify(data),
      );
      if (response.status == 200) {
        toast({
          title: blok?.thankYouMessage,
          status: 'success',
          duration: 5000,
        });
        trackFormSubmitEvent({ label: 'Subscribe' });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };

  /**
   * Email form validation schema
   */
  const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string()
      .email(blok?.inputDetails?.[0]?.validators?.[1]?.errorMessage)
      .required(blok?.inputDetails?.[0]?.validators?.[0]?.errorMessage),
  });
  const isReferralType = blok?.bannerType == PAGE_BANNER_TYPES.REFERRAL;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex
          bg={theme.colors.gray[800]}
          px={{ base: '8', md: '10' }}
          py={{ base: '10', md: '50px' }}
          border="1px"
          borderColor={blok?.showImage ? 'tfo.primary.900' : '#3A3B2B'}
          justifyContent={{ base: 'center', md: 'space-between' }}
          alignItems="center"
          flexDir={{ base: 'column', md: isReferralType ? 'column' : 'row' }}
          gap={{ base: '10', md: isReferralType ? 10 : '5' }}
          textAlign={{ base: 'center', md: 'start' }}
          background={
            blok?.showImage
              ? isMobile
                ? 'linear-gradient(107deg, rgba(185, 152, 85, 0.11) 8.26%, rgba(185, 152, 85, 0.00) 90.84%)'
                : 'linear-gradient(93deg, rgba(185, 152, 85, 0.10) 0.24%, rgba(185, 152, 85, 0.00) 99.7%)'
              : '#171811'
          }
          lineHeight={{ base: '29px', md: '42px' }}
          borderRadius={'4px'}
          flexWrap="wrap"
          sx={{ ...(blok.wrapperProps ? blok.wrapperProps : {}) }}
        >
          <Flex
            direction="column"
            alignItems={
              isReferralType || (blok?.showImage && isMobile)
                ? 'center'
                : 'start'
            }
            {...(blok?.showImage && { order: { base: 1, md: 0 }, flex: 1 })}
          >
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              sx={{ ...(blok?.textProps ? blok.textProps : {}) }}
            >
              {renderRichText({ content: blok.text })}
            </Text>

            {blok.description && (
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                w={{ base: '100%', md: '58%' }}
                textAlign={isReferralType ? 'center' : 'start'}
                mt={isReferralType ? 6 : 2}
                lineHeight="25px"
                sx={{
                  ...(blok?.descriptionProps ? blok.descriptionProps : {}),
                }}
              >
                {renderRichText({ content: blok.description })}
              </Text>
            )}
            {blok?.showImage && (
              <Button
                mt="8"
                key={...getCTAButton(blok.buttons, blok.bannerType)?.text}
                {...getCTAButton(blok.buttons, blok.bannerType)}
              />
            )}
          </Flex>

          {blok?.bannerType === PAGE_BANNER_TYPES.EMAIL_SUBSCRIPTION ? (
            <Formik
              initialValues={formInitialValues}
              validationSchema={FORM_VALIDATION_SCHEMA}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Flex
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                    justifyContent={['center', 'start']}
                    gap={[10, 5, 0]}
                  >
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      placeholder={blok?.inputDetails?.[0]?.placeholder}
                      bg={theme.colors.gray[800]}
                      me={[0, '14px']}
                      _focus={{ borderColor: theme.colors.gray[700] }}
                      _focusVisible={{ boxShadow: 'none' }}
                      formControlProps={{
                        errorProps: { color: 'red.500', fontSize: 'xs' },
                        isInvalid: touched.email && errors.email,
                        error: errors.email,
                      }}
                      errorBorderColor="red.500"
                    />
                    <Button
                      key={...getCTAButton(blok.buttons, blok?.bannerType)
                        ?.text}
                      {...getCTAButton(blok.buttons, blok.bannerType)}
                    />
                  </Flex>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              {blok?.showImage ? (
                <Box
                  flex="1"
                  display="flex"
                  justifyContent="flex-end"
                  order={{ base: 0, md: 1 }}
                >
                  <Image
                    src={
                      isMobile
                        ? blok?.mobileImage?.filename
                        : blok?.desktopImage?.filename
                    }
                    alt={blok?.desktopImage?.alt}
                    width={513}
                    height={198}
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      ...(isDesktop && { minWidth: '380px' }),
                    }}
                  />
                </Box>
              ) : (
                <Button
                  key={...getCTAButton(blok.buttons, blok.bannerType)?.text}
                  {...getCTAButton(blok.buttons, blok.bannerType)}
                />
              )}
            </>
          )}
        </Flex>
      </Reveal>
    </Container>
  );
}
