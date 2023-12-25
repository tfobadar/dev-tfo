import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { ButtonProps, FlexProps } from '@chakra-ui/react';
import { SbBlokData } from '@storyblok/react';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { useRouter } from 'next/router';

export default function useStyles(
  blok: SbBlokData,
  buttonProps: ButtonProps[],
  rest: Record<string, any>,
) {
  const router = useRouter();
  const flexProps: FlexProps = {
    gap: [
      `${blok?.gapMobile}px`,
      `${blok?.gapMobile}px`,
      `${blok?.gapDesktop}px`,
    ],
    justifyContent: [
      `${blok?.alignmentMobile ?? 'center'}`,
      `${blok?.alignmentMobile ?? 'center'}`,
      `${blok?.alignmentDesktop ?? 'center'}`,
    ],
  };

  const buttons = {
    ...getButtonsListFromStoryblok({
      ...rest,
      // @ts-ignore
      ctas: [blok],
      buttonsProps: [
        ...buttonProps,
        {
          ms: {
            base: 'unset',
            md: blok?.type === 'referral' ? '5' : 'unset',
            xl: 'unset',
          },
          fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
          fontSize: { base: 'md', md: 'lg' },
        },
        {
          fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
          fontSize: { base: 'md', md: 'lg' },
        },
      ],
    }),
  } as ButtonsByLimit;

  return { flexProps, buttons };
}
