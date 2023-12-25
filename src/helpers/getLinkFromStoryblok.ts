import { SBLink } from '@/types/component';
import appendUtmParams from './appendUtmParams';

/**
 * Returns a link object/string compatible with `mytfo-components`
 * */
export function getLinkFromStoryblok(link: SBLink) {
  if (link.url && link.url.trim() !== '') {
    return appendUtmParams(link.url);
  }
  if (link.cached_url) {
    return appendUtmParams(link.cached_url);
  }
  return '/';
}
