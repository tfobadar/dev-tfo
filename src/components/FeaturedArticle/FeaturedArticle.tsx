import {
  ARTICLE_PAGE_CATEGORY,
  MAX_CONTAINER_WIDTH,
} from '@/constants/globals';
import formatDate from '@/helpers/formatDate';
import getFieldsByComponent from '@/helpers/getFieldsByComponent';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';
import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import { Container, ImageProps, chakra } from '@chakra-ui/react';
import {
  ISbStoryData,
  getStoryblokApi,
  storyblokEditable,
} from '@storyblok/react';
import { Features } from '@tfo/mytfo-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FeatureWithSideHugSkeleton } from '../Skeletons';
import renderAsString from '@/helpers/renderRichTextAsString';
import { trackContentSelectionEvent } from '@/helpers/trackClickEvents';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);

const { WithSideHug } = Features;
const FeaturedArticle = (props: StoryblokComponentProps) => {
  const { blok } = props;
  const { locale = 'en' } = useRouter();

  let image = {};

  const [featuredArticle, setFeaturedArticle] = useState<ISbStoryData[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      let isEnglishVersion = {};
      let isArabicVersion = {};

      // filter out articles that are marked as Arabic
      if (isEnglishLanguage(locale)) {
        isEnglishVersion = {
          __or: [
            { noEnglishVersion: { is: 'empty' } },
            { noEnglishVersion: { is: false } },
          ],
        };
      }
      // filter out articles that are marked as English
      if (!isEnglishLanguage(locale)) {
        isArabicVersion = {
          __or: [
            { noArabicVersion: { is: 'empty' } },
            { noArabicVersion: { is: false } },
          ],
        };
      }

      const { data } = await getStoryblokApi().get(`cdn/stories`, {
        version: getStoryblokVersion(),
        starts_with: `insights/${blok?.source?.slug}/`,
        is_startpage: 0,
        filter_query: {
          component: { in: 'articlePage' },
          category: { any_in_array: blok.articleByCategory },
          ...isEnglishVersion,
          ...isArabicVersion,
        },
        language: locale,
        resolve_relations: [ARTICLE_PAGE_CATEGORY],
        per_page: 1,
        sort_by: 'first_published_at:desc',
      });
      setFeaturedArticle(data.stories);
      setIsLoading(false);
    };

    if (blok.articleByCategory) {
      setIsLoading(true);
      getArticles();
    }
  }, [blok.articleByCategory]);

  const slug = featuredArticle?.[0]?.full_slug || blok.article?.[0]?.full_slug;
  const content = featuredArticle
    ? featuredArticle?.[0]?.content
    : blok.article?.[0]?.content;

  const { title: sectionTitle, description: sectionDescription } =
    getFieldsByComponent({
      list: content?.topSection,
      component: 'sectionTitle',
    });
  const title = renderRichText({
    content: sectionTitle,
  });
  const description = renderRichText({
    content: sectionDescription,
  });

  if (content?.image) {
    image = {
      ...getImageFromStoryblok(content?.image),
      width: ['100%', '100%', '558px'],
      height: ['218px', '218px', '315px'],
      borderRadius: '4px',
      objectFit: 'cover',
    } as ImageProps;
  }

  const publishedDate = formatDate({
    date: content?.publishDate,
    options: { year: 'numeric', month: 'short', day: 'numeric' },
  });

  const Title = (
    <>
      <chakra.span fontSize="xs" textTransform={'uppercase'} display="block">
        <chakra.span textTransform={'capitalize'}>
          {content?.category?.[0]?.content?.name}
        </chakra.span>
        <chakra.span textTransform={'lowercase'}>
          - {content?.readTime}
        </chakra.span>
      </chakra.span>
      <chakra.span fontSize="md" display={'block'} my={6} color={'white'}>
        {title}
      </chakra.span>
    </>
  );

  const Description = (
    <>
      <chakra.span fontSize="md" display={'block'}>
        {description}
      </chakra.span>
      <chakra.span fontSize="xs" display={'block'} mt={10}>
        {publishedDate}
      </chakra.span>
    </>
  );

  const contentOrder = {
    order: content?.imagePosition == 'right' ? { base: 2, md: 1 } : 2,
    mt: { base: '32px', md: 'unset' },
    width: ['100%', '100%', '50%'],
  };
  const imageOrder = {
    order: content?.imagePosition == 'right' ? { base: 1, md: 2 } : 1,
    justifyContent: content?.imagePosition == 'right' ? 'end' : 'start',
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} {...storyblokEditable(blok)}>
      <Reveal>
        <Link
          href={slug || ''}
          onClick={() => {
            trackContentSelectionEvent({
              label: renderAsString({ content: sectionTitle }),
            });
          }}
        >
          <WithSideHug
            variant="basic"
            imageProps={{ ...image }}
            heading={{ children: Title }}
            description={{ children: Description }}
            imageWrapper={imageOrder}
            contentWrapper={contentOrder}
            contentInnerWrapper={{ mb: 0 }}
            mainContainer={{
              gap: ['20px', '20px', '40px'],
            }}
          />
        </Link>
        {isLoading && <FeatureWithSideHugSkeleton />}
      </Reveal>
    </Container>
  );
};

export default FeaturedArticle;
