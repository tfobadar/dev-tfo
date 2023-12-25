import {
  KEEP_READING_TITLE_AR,
  KEEP_READING_TITLE_EN,
} from '@/constants/article';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type KeepReadingContent = {
  title?: string;
};
export function useKeepReadingContent() {
  const { locale } = useRouter();
  const [keepReadingContent, setKeepReadingContent] =
    useState<KeepReadingContent>({
      title: KEEP_READING_TITLE_EN,
    });

  useEffect(() => {
    if (isEnglishLanguage(locale)) {
      setKeepReadingContent((prevState) => ({
        ...prevState,
        title: KEEP_READING_TITLE_EN,
      }));
    } else {
      setKeepReadingContent((prevState) => ({
        ...prevState,
        title: KEEP_READING_TITLE_AR,
      }));
    }
  }, [locale]);

  return keepReadingContent;
}
