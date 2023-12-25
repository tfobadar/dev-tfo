import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import { EN_DESCRIPTION, AR_DESCRIPTION } from './constant';
import { Buttons } from '@tfo/mytfo-components';
import { ENGLISH_FONT_FAMILY, ARABIC_FONT_FAMILY } from '@/constants/globals';
export default function CookieBar() {
  const [cookieStatus, setCookieStatus] = useState('Rejected');
  useEffect(() => {
    const getCookieStatus = localStorage.getItem('cookie-status');
    getCookieStatus && setCookieStatus(`${getCookieStatus}`);
  }, []);

  const router = useRouter();
  const description = isEnglishLanguage(router.locale)
    ? EN_DESCRIPTION
    : AR_DESCRIPTION;
  const button = {
    list: [
      {
        text: isEnglishLanguage(router.locale) ? 'Accept' : 'أوافق',
        variant: 'primary',
        width: { base: '200px', md: 'auto' },
        onClick: () => {
          localStorage.setItem('cookie-status', 'Accepted');
          setCookieStatus('Accepted');
        },
      },
    ],
  };
  return cookieStatus == 'Rejected' ? (
    <Box
      bg={'#212121'}
      pos={'fixed'}
      zIndex={10}
      // left={0}
      bottom={0}
      w={'full'}
    >
      <Flex
        px={{ base: 3.5, md: 5 }}
        py={{ base: 2, md: 5 }}
        maxW="1000px"
        m="auto"
        fontFamily={
          isEnglishLanguage(router.locale)
            ? ENGLISH_FONT_FAMILY
            : ARABIC_FONT_FAMILY
        }
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        align={'center'}
        justify={'center'}
      >
        {description}
        <Buttons {...button} mt={{ base: 3, md: 0 }} />
      </Flex>
    </Box>
  ) : null;
}
