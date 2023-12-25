import {
  ABOUT_FAMILY_OFFICE_DESC_AR,
  ABOUT_FAMILY_OFFICE_DESC_EN,
  ABOUT_FAMILY_OFFICE_TEXT_AR,
  ABOUT_FAMILY_OFFICE_TEXT_EN,
} from '@/constants/article';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type AboutTFOContent = {
  title?: string;
  description?: string;
};
export function useAboutTFOContent() {
  const { locale } = useRouter();
  const [aboutTFOContent, setAboutTFOContent] = useState<AboutTFOContent>({
    title: ABOUT_FAMILY_OFFICE_TEXT_EN,
    description: ABOUT_FAMILY_OFFICE_DESC_EN,
  });

  useEffect(() => {
    if (isEnglishLanguage(locale)) {
      setAboutTFOContent((prevState) => ({
        ...prevState,
        title: ABOUT_FAMILY_OFFICE_TEXT_EN,
        description: ABOUT_FAMILY_OFFICE_DESC_EN,
      }));
    } else {
      setAboutTFOContent((prevState) => ({
        ...prevState,
        title: ABOUT_FAMILY_OFFICE_TEXT_AR,
        description: ABOUT_FAMILY_OFFICE_DESC_AR,
      }));
    }
  }, [locale]);

  return aboutTFOContent;
}
