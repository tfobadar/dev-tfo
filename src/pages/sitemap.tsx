import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import Layout from '../components/Layout';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  ISbStoryParams,
  ISbStoryData,
} from '@storyblok/react';
import { SlugProps } from '@/types/slug';
import {
  ARTICLE_PAGE_CATEGORY,
  FEATURED_ARTICLE,
  FEATURED_ARTICLE_SOURCE,
  FOOTER_GLOBAL,
  HEADER_GLOBAL,
  INSIGHTS_CATEGORIES,
  LINKS_PER_PAGE,
  MAX_CONTAINER_WIDTH,
  META_GLOBAL,
  POPULAR_ARTICLES,
  POST_LIST_SOURCE,
} from '@/constants/globals';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';
import { Container, Heading, List, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getFieldsByComponent from '@/helpers/getFieldsByComponent';
import renderRichText from '@/helpers/renderRichText';
import ContentSpacer from '@/components/Spacer/Spacer';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { CATEGORIES } from '@/constants/article';
import renderAsString from '@/helpers/renderRichTextAsString';

export default function Page({
  story,
  global,
  locale,
  locales,
  defaultLocale,
  paths,
  stories,
}: SlugProps & { paths: any; stories: any }) {
  const { locale: routerLocale } = useRouter();
  const storyData = useStoryblokState(story, {
    language: locale,
  });

  const globalData = useStoryblokState(global, {
    resolveRelations: [
      FOOTER_GLOBAL,
      HEADER_GLOBAL,
      FEATURED_ARTICLE,
      FEATURED_ARTICLE_SOURCE,
      POPULAR_ARTICLES,
      ARTICLE_PAGE_CATEGORY,
      POST_LIST_SOURCE,
      INSIGHTS_CATEGORIES,
    ],
    language: locale,
  });
  const mainPages = stories.filter(
    (story: ISbStoryData) => !story.full_slug.includes('insights'),
  );
  const insightsPages = stories.filter((story: ISbStoryData) =>
    story.full_slug.includes('insights'),
  );
  const getAllPages = (pages: ISbStoryData[]) => {
    return pages?.map((path: any, indx: number) => {
      let title = path.name;
      if (path?.content?.topSection) {
        const sectionTitle = getFieldsByComponent({
          list: path?.content?.topSection,
          component: 'sectionTitle',
        });
        title = renderAsString({ content: sectionTitle.title });
      }
      let link = path.name;

      if (!title) return null;
      return (
        <ListItem key={title + indx} textTransform="capitalize">
          <Link href={path.full_slug}>{title}</Link>
        </ListItem>
      );
    });
  };

  return (
    <Layout
      locale={locale}
      locales={locales}
      defaultLocale={defaultLocale}
      // @ts-ignore
      globals={globalData}
      metaTags={storyData?.content?.metatags || {}}
    >
      <ContentSpacer
        blok={{
          heightMobile: 38,
          height: 60,
          showHorizontalLine: false,
        }}
      />
      <Container maxW={MAX_CONTAINER_WIDTH}>
        <Heading>Main Pages</Heading>
        <List
          display="flex"
          flexWrap={'wrap'}
          gap={'36px'}
          py={'32px'}
          rowGap={'20px'}
        >
          {getAllPages(mainPages)}
        </List>
        <Heading>
          {isEnglishLanguage(routerLocale)
            ? CATEGORIES.insights.en
            : CATEGORIES.insights.ar}
        </Heading>
        <List listStyleType={'disc'} ps={'36px'} pt={'8px'}>
          {getAllPages(insightsPages)}
        </List>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({
  locales = [],
  locale,
}: GetStaticPropsContext) {
  let slug = 'home';

  let sbParams: ISbStoryParams = {
    version: getStoryblokVersion(),
    resolve_relations: [
      FOOTER_GLOBAL,
      HEADER_GLOBAL,
      FEATURED_ARTICLE,
      FEATURED_ARTICLE_SOURCE,
      POPULAR_ARTICLES,
      ARTICLE_PAGE_CATEGORY,
      META_GLOBAL,
      POST_LIST_SOURCE,
      INSIGHTS_CATEGORIES,
    ],
    language: locale,
  };

  let { data: storyData } = await getStoryblokApi().get(
    `cdn/stories/${slug}`,
    sbParams,
  );
  const stories = await getStoryblokApi().getAll('cdn/stories', {
    starts_with: locale === 'en' ? '' : `${locale}/`,
    excluding_slugs:
      'header/*,footer/*,global/*,insights/categories/*,sitemap,home',
    version: 'published',
  });

  return {
    props: {
      stories,
      story: storyData ? storyData.story : false,
      global: storyData.rels,
      key: storyData ? storyData.story.id : false,
      locales,
    },
    revalidate: 60,
  };
}
