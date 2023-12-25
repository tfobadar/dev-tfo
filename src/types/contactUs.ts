import { FlexProps, ImageProps } from '@chakra-ui/react';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { SbBlokData } from '@storyblok/react';
/**
 * An object that contains field values.
 * */
export type formValues = {
  firstName: string;
  lastName: string;
  country: string;
  phoneNo: string;
  email: string;
  resume?: File;
  [key: string]: any;
  termsAndCondition?: boolean;
};
/**
 * An object that contains label and value for select box.
 * */
type selectOptions = {
  label: string;
  value: string;
};
/**
 * An object that contains label and placeholder for input.
 * */
type inputProps = {
  label: string;
  placeholder: string;
  validators: { [key: string]: string }[];
};
export type ContactUsProps = FlexProps & {
  /**
   * The Title to be displayed.
   * */
  title?: string;
  /**
   * The Description to be displayed.
   * */
  description?: StoryblokRichtext;
  /**
   * The Title to be displayed along with form.
   * */
  formTitle?: StoryblokRichtext;
  /**
   * The Description to be displayed along with form.
   * */
  formDescription?: any;
  /**
   * The function that will trigger on submit.
   * */
  handleSubmit: (values: formValues) => void;
  /**
   * If true the image will be displayed on the section.
   * */
  showImage: boolean;
  /**
   * If true the title and description will be displayed along with form.
   * */
  imageProps?: ImageProps;
  /**
   * The options on the select field.
   * */
  selectOptions: selectOptions[];
  /**
   * The label and placeholder for firstname field.
   * */
  firstName: inputProps;
  /**
   * The label and placeholder for firstname field.
   * */
  lastName: inputProps;
  /**
   * The label and placeholder for firstname field.
   * */
  phoneNo: inputProps;
  /**
   * The label and placeholder for firstname field.
   * */
  email: inputProps;
  /**
   * The footer text to be displayed.
   * */
  footerText: string;
  /**
   * The text and button props of submit.
   * */
  button: ButtonsByLimit;
  /**
   * The Thankyou Title to be displayed after submit.
   * */
  thankYouTitle: string;
  /**
   * The Thankyou Description to be displayed after submit.
   * */
  thankYouDescription: string;
  /**
   * CTAs for thank you screen
   * */
  thankYouCTAs?: SbBlokData[];
  /**
   * The Thankyou Description to be displayed after submit.
   * */
  showThankYouMessage: boolean;
  /**
   * The boolen Value to hide or show Resume field. Default to false.
   */
  showResume?: boolean;
  /**
   * The label and placeholder for resume field.
   * */
  resume?: inputProps;
};
