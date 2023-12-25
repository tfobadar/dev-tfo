import { FOOTER_GLOBAL } from '@/constants/globals';
import { HEADER_GLOBAL } from '@/constants/globals';
import { ISbStoryData } from '@storyblok/react';

/**
 * Returns a global data defined in storyblok based on its slug
 * Example: Header, Footer data ... etc
 * */
export function getGlobalBySlug(globals: ISbStoryData[], slug: string) {
  if (slug === HEADER_GLOBAL || slug === FOOTER_GLOBAL) {
    return globals?.filter((global) => global?.content?.type === slug)[0];
  }
  return globals?.filter((global) => global.slug === slug)[0];
}
