import { useRouter } from 'next/router';

export default function appendUtmParams(url: string) {
  if (!url) {
    return '';
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query, isReady } = useRouter();

  if (typeof window !== 'undefined' && isReady) {
    const utmParams = [
      'utm_campaign',
      'utm_source',
      'utm_medium',
      'utm_term',
      'utm_content',
    ];

    const params = new URLSearchParams();

    utmParams.forEach((param) => {
      const queryParam = query[param] || window?.sessionStorage?.getItem(param);
      if (queryParam) {
        params.append(param, queryParam as string);
      }
    });

    if (params.toString()) {
      return `${url}?${params.toString()}`;
    }
  }

  return url;
}
