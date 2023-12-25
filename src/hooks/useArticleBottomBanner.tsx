import {
  BANNER_BUTTON_TEXT_AR,
  BANNER_BUTTON_TEXT_EN,
  BANNER_DESCRIPTION_AR,
  BANNER_DESCRIPTION_EN,
  BANNER_LINK_AR_PROPS,
  BANNER_LINK_EN_PROPS,
  BANNER_TEXT_AR,
  BANNER_TEXT_EN,
  BANNER_TEXT_PROPS,
  BANNER_WRAPPER_PROPS,
} from '@/constants/article';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { SBLink } from '@/types/component';
import { FlexProps, TextProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type BannerContent = {
  text?: string;
  description?: string;
  buttonText?: string;
  textProps?: TextProps;
  wrapperProps?: FlexProps;
  link?: { cached_url: string; target: string };
};
export function useArticleBottomBanner() {
  const { locale } = useRouter();
  const [bannerContent, setBannerContent] = useState<BannerContent>({
    textProps: BANNER_TEXT_PROPS,
    wrapperProps: BANNER_WRAPPER_PROPS,
  });

  useEffect(() => {
    if (isEnglishLanguage(locale)) {
      setBannerContent((prevState) => ({
        ...prevState,
        text: BANNER_TEXT_EN,
        description: BANNER_DESCRIPTION_EN,
        buttonText: BANNER_BUTTON_TEXT_EN,
        link: BANNER_LINK_EN_PROPS,
      }));
    } else {
      setBannerContent((prevState) => ({
        ...prevState,
        text: BANNER_TEXT_AR,
        description: BANNER_DESCRIPTION_AR,
        buttonText: BANNER_BUTTON_TEXT_AR,
        buttonLink: BANNER_LINK_EN_PROPS,
        link: BANNER_LINK_AR_PROPS,
      }));
    }
  }, [locale]);

  return bannerContent;
}
