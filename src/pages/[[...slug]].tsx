import dynamic from 'next/dynamic';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
const Layout = dynamic(() => import('../components/Layout'));

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  ISbStoryParams,
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
  META_GLOBAL,
  POPULAR_ARTICLES,
  POST_LIST_SOURCE,
} from '@/constants/globals';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';
import getSlugDetails from '@/helpers/getSlugDetails';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page({
  story,
  global,
  locale,
  locales,
  defaultLocale,
  ...rest
}: SlugProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // @ts-ignore
      if (process.env.NEXT_PUBLIC_GA_TRACKING_ID && window.gtag) {
        // @ts-ignore
        window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
          page_path: router.asPath,
        });
      }

      // @ts-ignore
      if (typeof window !== 'undefined' && window?._hsq) {
        // @ts-ignore
        var _hsq = (window._hsq = window._hsq || []);

        _hsq.push(['setPath', router?.asPath]);

        _hsq.push(['trackPageView']);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);

      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);

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

  return (
    <Layout
      locale={locale}
      locales={locales}
      defaultLocale={defaultLocale}
      // @ts-ignore
      globals={globalData}
      metaTags={storyData?.content?.metatags || {}}
      {...rest}
    >
      <StoryblokComponent blok={storyData?.content} {...rest} />
    </Layout>
  );
}

export async function getStaticProps({
  locale,
  locales,
  defaultLocale,
  params,
}: GetStaticPropsContext) {
  const { slug, queryParams } = getSlugDetails({ params });

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

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      global: data.rels,
      key: data ? data.story.id : false,
      locale,
      locales,
      defaultLocale,
      queryParams,
    },
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_DURATION || '60'),
  };
}

export async function getStaticPaths({ locales = [] }: GetStaticPathsContext) {
  let { data } = await getStoryblokApi().get('cdn/links/', {
    per_page: LINKS_PER_PAGE,
    version: getStoryblokVersion(),
  });

  let paths: any = [];

  Object.keys(data.links).forEach((linkKey) => {
    // Don't pre-render if `is_folder` or `global data`
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey]?.slug?.includes('global') ||
      data.links[linkKey]?.slug?.includes('categories')
    ) {
      return;
    }

    // get array for slug because of catch all
    const slug = data.links[linkKey].slug;

    let splittedSlug = slug.split('/');
    if (slug === 'home') splittedSlug = false;

    // create additional languages
    for (const locale of locales) {
      paths.push({ params: { slug: splittedSlug }, locale });
    }
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
