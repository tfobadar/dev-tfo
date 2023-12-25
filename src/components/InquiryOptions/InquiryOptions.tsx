import React from 'react';
import { InquiryList } from '@tfo/mytfo-components';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Container } from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';

export default function InquiryOptions({ blok }: StoryblokComponentProps) {
  const { heading, feedBackTextCard } = blok;
  const inquiryProps = {
    heading: { text: heading },
    inquiryList: {
      options: feedBackTextCard.map((item: any) => {
        return {
          cardTitle: { text: item.title, lineHeight: '120%' },
          subtitleList: item.options.map((subItem: any) => {
            return {
              subtitle: {
                text: subItem.phoneNumber,
                mb: 0,
                direction:
                  subItem?.countryImage?.filename !== '' ? 'ltr' : 'unset',
              },
              image:
                subItem?.countryImage?.filename !== ''
                  ? {
                      ...getImageFromStoryblok(subItem?.countryImage),
                      width: '30px',
                      height: '20px',
                      mr: 0,
                      marginEnd: 2,
                    }
                  : undefined,
              mb: 2,
            };
          }),
        };
      }),
      gridTemplateColumns: { base: 'repeat(1,1fr)', md: 'repeat(3,1fr)' },
      gap: 8,
      mb: { base: 6, md: 10 },
    },
  };
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <InquiryList {...inquiryProps} />
    </Container>
  );
}
