import { SBImage } from '@/types/component';
import {
  CardBodyProps,
  CardProps,
  HeadingProps,
  ImageProps,
  TextProps,
} from '@chakra-ui/react';
import { WithText } from '@tfo/mytfo-components/lib/types/common';
import { ARABIC_FONT_FAMILY, ENGLISH_FONT_FAMILY } from '../globals';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';

export const personaTopCardStyleProps = (
  image: SBImage,
  text: string,
  subHeading: string,
  locale: string = 'en',
) => ({
  imageProps: {
    src: image.filename,
    alt: image.alt,
    height: ['350px', '328px', '380px'],
    width: ['247px', '282px', '268px'],
    objectFit: 'cover',
    borderRadius: '4px',
  } as ImageProps,
  cardProps: {
    maxW: ['247px', '268px'],
    padding: '0',
  } as CardProps,
  heading: {
    text,
    fontSize: 'lg',
    fontWeight: 'medium',
    color: 'white',
    textAlign: 'start',
  } as WithText & TextProps,
  subHeading: {
    text: subHeading,
    noOfLines: 3,
    fontSize: 'sm',
    fontWeight: '100',
    color: 'gray.300',
    textAlign: 'start',
    pb: 1,
  } as WithText & HeadingProps,
  cardBodyProps: {
    // to avoid flickerig when subHeading is 2 or more lines
    h: '110px',
    paddingBottom: 0,
  } as CardBodyProps,
});
