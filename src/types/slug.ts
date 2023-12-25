import { LocaleProps } from './locale';
import { ISbStoryData } from '@storyblok/react';

export type SlugProps = LocaleProps & {
  story: ISbStoryData;
  global: ISbStoryData | null;
};
