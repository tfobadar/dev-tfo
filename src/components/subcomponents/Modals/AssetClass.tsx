import { contentStyleProps } from '@/constants/modals/assetClass';
import getButtonFromStoryBlok from '@/helpers/getButtonFromStoryBlok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import { SBButton } from '@/types/component';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { Buttons, theme } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import Image from 'next/image';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';

export default function AssetClassModal({ content }: any) {
  const { title, icon, heading, content: body, footer } = content ?? {};
  const { locale } = useRouter();

  const buttons: ButtonsByLimit = {
    list: footer[0].buttons.map((button: SBButton) => ({
      ...getButtonFromStoryBlok({ button }),
      fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
      fontSize: 'lg',
      width: ['full', 'auto', 'auto'],
    })),
  };

  return (
    <Flex direction={'column'}>
      {title && (
        <Heading
          fontWeight={'normal'}
          fontSize={'xs'}
          textTransform={'uppercase'}
          letterSpacing={'wider'}
          textAlign={'start'}
          mb={14}
          color={'white'}
        >
          {title}
        </Heading>
      )}

      <Flex alignItems={'center'} gap={4}>
        <Image {...getImageFromStoryblok(icon)} width={40} height={40} />
        <Heading fontSize={'2xl'} fontWeight={'normal'}>
          {heading}
        </Heading>
      </Flex>

      <Box mt={10} textAlign={'start'} __css={contentStyleProps}>
        {renderRichText({ content: body, removeParagraphTag: false })}
      </Box>

      {footer.length ? (
        <>
          <Divider my={10} />

          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text color={theme.colors.gray['300']} textAlign={['left']}>
              {renderRichText({ content: footer[0].text })}
            </Text>
            <Buttons {...buttons} />
          </Flex>
        </>
      ) : null}
    </Flex>
  );
}
