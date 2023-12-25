import {
  ARABIC_FONT_FAMILY,
  ENGLISH_FONT_FAMILY,
  MAX_CONTAINER_WIDTH,
} from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, chakra } from '@chakra-ui/react';
import { Features } from '@tfo/mytfo-components';
import type { Features as Feature } from '@tfo/mytfo-components/lib/types/features/withStatistics';
import { FeatureWithStatistics } from '@tfo/mytfo-components/lib/types/features/withStatistics';
import { NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import { render } from 'storyblok-rich-text-react-renderer';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import Counter from '@/animations/Counter';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const { WithStatistics } = Features;
export default function FeatureWithStatistics({
  blok,
}: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  let titleProps = {};
  let headingProps = {};
  if (blok?.type === 'default') {
    titleProps = {
      fontSize: ['16px', '16px', '18px'],
      color: 'gray.400',
    };
    headingProps = {
      fontSize: ['18px', '18px', '24px'],
      color: 'tfo.primary.500',
    };
  }

  const withStatisticsProps: FeatureWithStatistics = {
    features: blok.features?.map(
      (feature: any): Feature & { [key: string]: any } => {
        let title = feature?.title;

        // wrap with Counter animation component if its `statistics`
        if (!isNaN(parseFloat(feature?.title)) && blok.type === 'statistics') {
          title = (
            <Counter
              value={parseFloat(`${feature?.title}`)}
              decimal={Number.isInteger(parseFloat(feature?.title)) ? 0 : 1}
            />
          );
        }
        return {
          title: {
            // @ts-ignore
            text: (
              <chakra.span
                fontFamily={
                  isEnglishLanguage(locale)
                    ? ENGLISH_FONT_FAMILY
                    : ARABIC_FONT_FAMILY
                }
              >
                {feature?.prefix}
                {title}
                {feature?.suffix}
              </chakra.span>
            ),
            ...titleProps,
          },
          heading: {
            text: feature.heading,
            fontSize: ['md', 'md', 'lg'],
            ...headingProps,
          },
          paddingY: 12,
          paddingX: 10,
          justifyContent: blok?.type === 'default' ? 'center' : 'start',
        };
      },
    ),
    wrapperProps: {
      // @ts-ignore
      '& ul': {
        '& li:nth-of-type(1)': {
          '& .vertical-divider': {
            height: ['65%', '65%', '60%'],
          },
        },
        '& li': {
          '& .vertical-divider': {
            left: isEnglishLanguage(locale) ? 'unset' : 0,
            right: isEnglishLanguage(locale) ? 0 : 'unset',
          },
        },
        '& li:nth-of-type(3)': {
          '& .vertical-divider': {
            height: ['65%', '65%', '60%'],
          },
        },
      },
    },
    heading: {
      text: blok.heading,
      fontSize: ['2xl', '2xl', '4xl'],
      fontFamily: isEnglishLanguage(locale)
        ? ENGLISH_FONT_FAMILY
        : ARABIC_FONT_FAMILY,
    },
    footer: {
      title: {
        text: render(blok.footer[0]?.text, {
          nodeResolvers: {
            [NODE_PARAGRAPH]: (children) => <>{children}</>,
          },
        }),
        fontSize: ['xs', 'xs', 'sm'],
      },
    },
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <WithStatistics {...withStatisticsProps} />
      </Reveal>
    </Container>
  );
}
