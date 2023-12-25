import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import { Heading, Text } from '@chakra-ui/react';
import { SbBlokData, StoryblokComponent } from '@storyblok/react';
import React from 'react';

export default function ThankYouMessage({
  blok,
  formValues,
  ...rest
}: StoryblokComponentProps) {
  const { thankYouTitle, thankYouDescription } = blok?.[0];
  const email = blok[0].email;
  const thankYouDesc = thankYouDescription
    ? renderRichText({ content: thankYouDescription, email: email, formValues })
    : '';

  return (
    <>
      {thankYouTitle && thankYouTitle.length > 0 ? (
        <Heading
          id={blok[0].id}
          as="h2"
          fontSize={'2xl'}
          fontWeight={'normal'}
          color="white"
          textTransform={blok[0].id ? 'unset' : 'capitalize'}
        >
          {thankYouTitle}
        </Heading>
      ) : null}

      {thankYouDesc?.[0]?.props?.children !== null ? (
        <Text color={'gray.400'} fontSize={'md'} fontWeight={'normal'} mt={4}>
          {thankYouDesc}
        </Text>
      ) : null}

      {blok?.[0]?.components
        ? blok?.[0]?.components.map((blok: SbBlokData) => (
            <StoryblokComponent blok={blok} key={blok._uid} {...rest} />
          ))
        : null}
    </>
  );
}
