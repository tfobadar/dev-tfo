import { Box, Flex, useClipboard } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Input, theme, Buttons, Button } from '@tfo/mytfo-components';
import { StoryblokComponentProps } from '@/types/component';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { WHATSAPP_INVITE_FORM_INITIAL_VALUES } from './constants';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';

type ICopyParams = {
  handleOnCopy: () => void;
  hasCopied: boolean;
  locale?: string;
};

const CopyButton = ({ handleOnCopy, hasCopied, locale }: ICopyParams) => (
  <Button
    onClick={handleOnCopy}
    variant="link"
    textDecoration="none"
    me={[14, 14, 20]}
    fontSize={'sm'}
    minW="auto"
  >
    {hasCopied
      ? isEnglishLanguage(locale)
        ? 'Copied!'
        : 'تمّ النسخ'
      : isEnglishLanguage(locale)
      ? 'Copy Link'
      : 'نسخ الرابط'}
  </Button>
);

export default function WhatsAppInviteForm({
  blok,
  queryParams = null,
}: StoryblokComponentProps) {
  const { fields } = blok ?? {};
  const { onCopy, value = 'taaaa', setValue, hasCopied } = useClipboard('');
  const { locale } = useRouter();

  const inviteLink = {
    label: fields?.[0]?.label,
    placeholder: fields?.[0]?.placeholder,
    validators: fields?.[0]?.validators,
  };
  const ctas = fields?.[1];
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
            setValue('SOMETHING');
          },
        },
      ],
    }),
  } as ButtonsByLimit;

  useEffect(() => {
    setValue(
      `${WHATSAPP_INVITE_FORM_INITIAL_VALUES.inviteLink}${queryParams ?? ''}${
        WHATSAPP_INVITE_FORM_INITIAL_VALUES.utmParams
      }${queryParams ?? ''}`,
    );
  }, [setValue, queryParams]);

  return (
    <Box>
      <Flex gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }} mb={6}>
        {inviteLink.label && (
          <Box
            as="label"
            color={theme.colors.gray[500]}
            fontSize={'sm'}
            fontWeight={'medium'}
            htmlFor="inviteLink"
          >
            {inviteLink.label}
          </Box>
        )}
        <Input
          dir="ltr"
          value={value}
          id="inviteLink"
          name="inviteLink"
          placeholder={inviteLink.placeholder}
          bg={theme.colors.gray[800]}
          _focus={{ borderColor: theme.colors.gray[700] }}
          _focusVisible={{ boxShadow: 'none' }}
          fontSize={'sm'}
          inputRightElement={
            isEnglishLanguage(locale) ? (
              <CopyButton
                handleOnCopy={onCopy}
                hasCopied={hasCopied}
                locale={locale}
              />
            ) : null
          }
          inputLeftElement={
            !isEnglishLanguage(locale) ? (
              <CopyButton
                handleOnCopy={onCopy}
                hasCopied={hasCopied}
                locale={locale}
              />
            ) : null
          }
          isReadOnly
          textOverflow="ellipsis"
          pr={isEnglishLanguage(locale) ? 28 : 4}
          pl={isEnglishLanguage(locale) ? 4 : 28}
        />
      </Flex>

      <Box>
        <Buttons {...button} justifyContent={'start'} />
      </Box>
    </Box>
  );
}
