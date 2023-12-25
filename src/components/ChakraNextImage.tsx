import { Box, ImageProps } from '@chakra-ui/react';
import * as React from 'react';
import NextImage from 'next/image';

export const ChakraNextImage = (props: ImageProps) => {
  const { src, alt, style, ...rest } = props;

  return (
    <Box position="relative" overflow="hidden" {...rest}>
      <NextImage
        fill
        src={src || ''}
        alt={alt || ''}
        style={{
          objectFit: 'cover',
          ...style,
        }}
      />
    </Box>
  );
};
