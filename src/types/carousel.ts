import {
  BoxProps,
  HeadingProps,
  ImageProps,
  TextProps,
} from '@chakra-ui/react';
import { Settings } from 'react-slick';

export type Slide = {
  /**
   * title of the carousel to be rendered as heading
   * */
  title?: string;
  /**
   * description of the carousel to be rendered as para
   * */
  description: string;
  /**
   * Props for image
   * */
  imageProps?: ImageProps;
};

export type CarouselProps = Settings & {
  /**
   * List of slide to render
   * */
  slides?: Slide[];
  /**
   * Props to customize slide
   * */
  slideProps?: BoxProps;
  /**
   * Wrapper Props
   * */
  wrapperProps?: BoxProps;
  /**
   * Heading Props
   * */
  headingProps?: HeadingProps;
  /**
   * description Props
   * */
  descriptionProps?: TextProps;
  /**
   * Brand color scheme to be used
   * */
  colorScheme?: string;
  /**
   * Placement of the arrows. Either 'in' or 'out'
   * */
  arrowPlacement?: 'in' | 'out' | 'bottom-center';
  /**
   * Should slide take full width in mobile
   */
  fullWidthInMobile?: boolean;
};
