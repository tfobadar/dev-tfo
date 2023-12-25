import { ContainerProps } from '@chakra-ui/react';
import { ISbStoryData, SbBlokData } from '@storyblok/react';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

export interface StoryblokComponentProps {
  blok: SbBlokData & {
    body?: [];
    [key: string]: any;
    _uid?: string;
  };
  globalData?: SbBlokData & {
    body?: [];
    _uid?: string;
  };
  containerCustomStyleProps?: ContainerProps;
  [key: string]: unknown;
}

export type SBImage = {
  alt: string;
  copyright: string;
  fieldtype: string;
  filename: string;
  focus: string;
  id: number;
  is_external_url: boolean;
  meta_data: any;
  name: string;
  source: string;
  title: string;
  icon?: SBImage;
};

export type SBLink = {
  cached_url: string;
  fieldtype: string;
  id: string;
  linktype: string;
  url: string;
  target: string;
};

export type SBButton = ISbStoryData & {
  link: SBLink;
  text: StoryblokRichtext;
  alternateText: StoryblokRichtext;
  type: string;
  variant: string;
  scrollToSection: string;
  scrollOffset: string;
  icon: SBImage;
  customButtonWidth?: string;
};

export type SBIconWithContent = ISbStoryData & {
  ctas: any;
  description: StoryblokRichtext;
  heading: StoryblokRichtext;
  icon: SBImage;
  bgColor?: string;
  hoverBgColor?: string;
  modal?: any;
  showAnimation?: boolean;
  jsonURL?: string;
};

export type SBStoryData = ISbStoryData & { [key: string]: any };
