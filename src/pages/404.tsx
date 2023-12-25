import {
  ISbStoryParams,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import Layout from '../components/Layout';
import { FOOTER_GLOBAL, HEADER_GLOBAL } from '@/constants/globals';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';

export default function Page404({
  global,
  locale,
  locales,
  defaultLocale,
}: any) {
  const globalData = useStoryblokState(global, {
    resolveRelations: [FOOTER_GLOBAL, HEADER_GLOBAL],
    language: locale,
  });

  return (
    <Layout
      locale={locale}
      locales={locales}
      defaultLocale={defaultLocale}
      // @ts-ignore
      globals={globalData}
    >
      <h1>Not found</h1>
    </Layout>
  );
}

export async function getStaticProps({ locale, locales, defaultLocale }: any) {
  let slug = 'home';

  let sbParams: ISbStoryParams = {
    version: getStoryblokVersion(),
    resolve_relations: [FOOTER_GLOBAL, HEADER_GLOBAL],
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
    },
  };
}
