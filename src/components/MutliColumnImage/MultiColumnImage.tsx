import { StoryblokComponentProps } from '@/types/component';
import {
  Divider,
  DividerProps,
  Flex,
  FlexProps,
  StyleProps,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image, { ImageProps } from 'next/image';
import { Fragment } from 'react';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);

interface MultiColumnImageProps extends StoryblokComponentProps {
  containerProps?: FlexProps;
  imageProps?: ImageProps;
  seperatorProps?: DividerProps;
}

export default function MultiColumnImage({
  blok,
  containerProps = {},
  imageStyleProps = {},
  seperatorProps = {},
}: MultiColumnImageProps) {
  const getImagesProps = (
    images: (Omit<ImageProps, 'src'> & { filename: string })[],
  ) => {
    if (!images || !Array.isArray(images)) return [];

    return images.map(({ filename, alt, ...rest }) => ({
      src: filename,
      alt: alt,
      ...rest,
    }));
  };
  return (
    <Reveal>
      <Flex
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: ['column', 'row'],
          alignItems: 'center',
          bg: 'gray.850',
          width: '100%',
          py: { base: 8, lg: 10 },
          px: 5,
          gap: { base: 4, lg: 8 },
          ...containerProps,
        }}
      >
        {getImagesProps(blok?.images).map(
          ({ src, alt, ...rest }: ImageProps, index: number) => (
            <Fragment key={index.toString()}>
              <Image
                src={src || ''}
                alt={alt || ''}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
                {...rest}
              />
              <Divider
                role="presentation"
                orientation={seperatorProps?.orientation || 'vertical'}
                height={seperatorProps?.height || '40px'}
                sx={{
                  py: 'auto',
                  display: ['none', 'block'],
                  _last: {
                    display: 'none',
                  },
                  ...seperatorProps,
                }}
              />
            </Fragment>
          ),
        )}
      </Flex>
    </Reveal>
  );
}
