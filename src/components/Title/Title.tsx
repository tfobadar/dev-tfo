import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import renderRichText from '@/helpers/renderRichText';
import renderAsString from '@/helpers/renderRichTextAsString';
import { StoryblokComponentProps } from '@/types/component';
import {
  Container,
  ContainerProps,
  Heading,
  HeadingProps,
  Box,
  TextProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);

type IParams = {
  headingProps?: HeadingProps;
  textProps?: TextProps;
  containerProps?: ContainerProps;
};

export default function Title({
  blok,
  headingProps,
  textProps,
  containerProps,
}: IParams & StoryblokComponentProps) {
  const titleString = renderAsString({ content: blok.title });
  const descString = renderAsString({ content: blok.description });
  let title = renderRichText({ content: blok.title });
  let description = renderRichText({ content: blok.description });
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  let textAlignMobile = blok.alignMobile;
  let textAlignDesktop = blok.alignDesktop;
  if (textAlignMobile) {
    textAlignMobile = textAlignMobile
      .replace('left', 'start')
      .replace('right', 'start');
  }
  if (textAlignDesktop) {
    textAlignDesktop = textAlignDesktop
      .replace('left', 'start')
      .replace('right', 'start');
  }
  const textAlign = [
    textAlignMobile || 'start',
    textAlignMobile || 'start',
    textAlignDesktop || 'center',
  ];
  const fontSize = [
    blok.fontSizeMobile || '2xl',
    blok.fontSizeMobile || '2xl',
    blok.fontSize || '4xl',
  ];
  const titleColor =
    blok.sectionTitleColor == 'primary' ? 'tfo.primary.500' : '#fff';

  const fontWeight = [
    blok.fontWeightMobile || 'normal',
    blok.fontWeightMobile || 'normal',
    blok.fontWeight || 'normal',
  ];
  if ((blok?.hideInDesktop && isDesktop) || (blok?.hideInMobile && isMobile)) {
    return <></>;
  }

  return (
    <Container
      maxWidth={MAX_CONTAINER_WIDTH}
      {...containerProps}
      id={blok.id || ''}
    >
      <Reveal>
        {titleString && (
          <Heading
            textAlign={textAlign}
            fontSize={fontSize}
            fontWeight={fontWeight}
            marginBottom={6}
            color={titleColor}
            as={blok.as || 'h2'}
            {...headingProps}
          >
            {title}
          </Heading>
        )}
        {descString && (
          <Box
            mx={{ base: 0, md: blok.applyCustomStyles ? '20' : '0' }}
            textAlign={textAlign}
            lineHeight={6}
            marginBottom={[6, 6, 8]}
            color="gray.400"
            {...textProps}
          >
            {description}
          </Box>
        )}
      </Reveal>
    </Container>
  );
}
