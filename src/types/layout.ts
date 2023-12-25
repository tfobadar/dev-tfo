import { ReactNode } from 'react';
import { LocaleProps } from './locale';
import { ISbStoryData } from '@storyblok/react';

export type MetaTags = {
  title: string;
  description: string;
  image: string;
  url: string;
  _uid: string;
  og_image: string;
  og_title: string;
  twitter_image: string;
  twitter_title: string;
  og_description: string;
  twitter_description: string;
};

export type LayoutProps = LocaleProps & {
  children: ReactNode;
  globals: ISbStoryData[];
  metaTags: MetaTags;
};
