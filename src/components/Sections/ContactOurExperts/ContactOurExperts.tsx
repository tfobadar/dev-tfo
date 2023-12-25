import { StoryblokComponentProps } from '@/types/component';
import React, { useState } from 'react';
import ContactUs from '../../ContactUs/ContactUs';
import { ContactUsProps, formValues } from '@/types/contactUs';
import renderRichText from '@/helpers/renderRichText';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { Container, ImageProps, useToast } from '@chakra-ui/react';
import api from '@/helpers/getAxiosInstance';
import { COUNTRY_CODES } from './constants';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import {
  trackFormErrorSubmitEvent,
  trackFormSubmitEvent,
} from '@/helpers/trackClickEvents';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';
import { trackInsidersEvent } from '@/helpers/trackInsidersEvent';
import getFieldByComponent from '@/helpers/getFieldsByComponent';
export default function ContactOurExperts({ blok }: StoryblokComponentProps) {
  const {
    heading,
    description,
    form,
    ctas,
    imagePosition,
    thankYouDescription,
    thankYouTitle,
    thankYouCTAs,
    showResume,
  } = blok;

  const router = useRouter();
  const { locale } = router;
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const getCookie_new = function (name: string) {
    document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  };

  const submit = async (values: formValues) => {
    // Tracker Insiders user event
    trackInsidersEvent({ email: values.email });

    const { hubspotId = null } = getFieldByComponent({
      list: form,
      component: 'contactUsForm',
    });
    let formSubmissionID = null;

    if (hubspotId) {
      formSubmissionID = hubspotId;
    } else {
      formSubmissionID = isEnglishLanguage(locale)
        ? process.env.CONTACT_OUR_EXPERT_FORM_ID_EN
        : process.env.CONTACT_OUR_EXPERT_FORM_ID_AR;
    }
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
          name: 'preferred_language',
          value: isEnglishLanguage(locale) ? 'English' : 'Arabic',
        },
        {
          name: 'ga_client_id',
          value: values.ga_client_id,
        },
        {
          name: 'first_source',
          value: values.first_source,
        },
        {
          name: 'last_source',
          value: values.last_source,
        },
        {
          name: 'page_form',
          value: values.page_form,
        },
        {
          name: 'submit_id',
          value: values.submit_id,
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
        `${formSubmissionID}`,
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
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const submitWithResume = async (values: formValues) => {
    const data = new FormData();
    data.append('firstName', values.firstName);
    data.append('lastName', values.lastName);
    data.append('emailId', values.email);
    data.append('phoneNumber', values.country + ' ' + values.phoneNo);
    data.append('resume', values.resume as Blob);
    data.append('fileName', `${values.resume?.name}`);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    try {
      const response = await api.post(
        `${process.env.CAREER_FORM_API}`,
        data,
        config,
      );
      if (response.status == 200 || response.status == 202) {
        setIsSubmitted(true);
      }
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 5000,
      });
    }
  };
  const getResponsiveImage = useResponsiveImage(blok.image, blok?.imageMobile);
  const props: ContactUsProps = {
    title: heading,
    description,
    showImage: blok.image?.filename?.length > 0 ? true : false,
    selectOptions: COUNTRY_CODES,
    footerText: renderRichText({ content: form?.[0]?.fields?.[6]?.text }),
    formTitle: form?.[0]?.fields?.[0]?.title,
    formDescription: form?.[0]?.fields?.[0]?.description,
    firstName: {
      label: form?.[0]?.fields?.[1]?.label,
      placeholder: form?.[0]?.fields?.[1]?.placeholder,
      validators: form?.[0]?.fields?.[1]?.validators,
    },
    lastName: {
      label: form?.[0]?.fields?.[2]?.label,
      placeholder: form?.[0]?.fields?.[2]?.placeholder,
      validators: form?.[0]?.fields?.[2]?.validators,
    },
    phoneNo: {
      label: form?.[0]?.fields?.[3]?.label,
      placeholder: form?.[0]?.fields?.[4]?.placeholder,
      validators: form?.[0]?.fields?.[4]?.validators,
    },
    email: {
      label: form?.[0]?.fields?.[5]?.label,
      placeholder: form?.[0]?.fields?.[5]?.placeholder,
      validators: form?.[0]?.fields?.[5]?.validators,
    },
    resume: {
      label: form?.[0]?.fields?.[6]?.label,
      placeholder: form?.[0]?.fields?.[6]?.placeholder,
      validators: form?.[0]?.fields?.[6]?.validators,
    },
    button: {
      ...getButtonsListFromStoryblok({
        ctas,
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
    } as ButtonsByLimit,
    imageProps: {
      ...getResponsiveImage,
    } as ImageProps,
    handleSubmit: showResume ? submitWithResume : submit,
    thankYouTitle: thankYouTitle,
    thankYouDescription: thankYouDescription,
    thankYouCTAs: thankYouCTAs,
    showThankYouMessage: isSubmitted,
    showResume,
  };
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} id="contactUs">
      <ContactUs
        {...props}
        flexDir={{
          base: 'column',
          md: imagePosition == 'right' ? 'row-reverse' : 'row',
        }}
      />
    </Container>
  );
}
