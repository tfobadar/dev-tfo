import { ParsedUrlQuery } from 'querystring';

type ReturnType = {
  slug: string;
  queryParams: string | null | undefined;
};
type IParams = {
  params: ParsedUrlQuery | undefined;
};

/**
 * Returns slug and query parameters based on URL
 * @param {ParsedUrlQuery} params from next js
 * @returns {object} slug and queryParams
 * */
export default function getSlugDetails({ params }: IParams): ReturnType {
  const paramSlug = params?.slug as [];
  let slug = params?.slug ? paramSlug?.join('/') : 'home';
  let queryParams = null;
  let dynamicURLs = process.env.NEXT_PUBLIC_URL_WITH_PARAMS?.split(',') ?? [];

  if (params?.slug?.[0] && dynamicURLs.includes(params?.slug?.[0])) {
    let validSlug = dynamicURLs.find((url) => url === slug);

    if (!validSlug) {
      queryParams = paramSlug.pop();
      validSlug = paramSlug.join('/');
    }

    slug = validSlug;
  }

  return { slug, queryParams };
}
