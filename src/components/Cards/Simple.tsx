import React from 'react';
import { Cards } from '@tfo/mytfo-components';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { Container } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);

export default function Simple({ blok }: StoryblokComponentProps) {
  const { Simple } = Cards;
  const commonStyle =
    (blok.imageSize == 'small' && '18px') ||
    (blok.imageSize == 'medium' && '100px') ||
    (blok.imageSize == 'medium' && '150px');
  const imageProps: any = {
    style: {
      width: commonStyle,
      height: commonStyle,
      borderRadius: '100%',
    },
  };
  const cardProps: any = {
    padding: 0,
    paddingBottom: 2,
  };
  const headingProps = {
    fontSize: { base: 'md', md: blok.imageSize == 'medium' ? 'md' : 'lg' },
    fontWeight: 'normal',
    pe: '0px',
  };
  const descriptionProps = {
    color: 'gray.400',
  };
  const cardBodyProps = {
    ps: { base: 2, md: 3 },
    pe: 0,
  };
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Simple
          title={''}
          imageUrl={blok.image.filename}
          description={renderRichText({ content: blok.content[0].description })}
          heading={renderRichText({ content: blok.content[0].title })}
          imageAltText=""
          alignItems="center"
          imageProps={imageProps}
          cardBodyProps={cardBodyProps}
          cardProps={cardProps}
          headingProps={headingProps}
          descriptionProps={descriptionProps}
        />
      </Reveal>
    </Container>
  );
}
