import React from 'react';
import { Box } from '@chakra-ui/react';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';

export default function Badge({ blok }: StoryblokComponentProps) {
  let defaultType = {};
  if (blok.type === 'default') {
    defaultType = {
      px: 2,
      py: 0.5,
      bg: 'gray.750',
      fontSize: 'xs',
      color: 'gray.500',
      borderRadius: 'md',
      fontWeight: 'medium',
      display: 'inline-block',
    };
  }
  return <Box {...defaultType}>{renderRichText({ content: blok?.text })}</Box>;
}
