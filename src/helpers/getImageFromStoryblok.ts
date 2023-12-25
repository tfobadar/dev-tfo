import { SBImage } from '@/types/component';
import { ImageProps } from 'next/image';

/**
 * Returns a image object/string compatible with `mytfo-components`
 * */
export function getImageFromStoryblok(image: SBImage): ImageProps {
  return {
    // Suffix the image with /m/ to optimize images to use webp
    // check if filename is svg to not add /m/ suffix
    src: image?.filename?.match(/^.+\.(svg|webp)$/)
      ? image?.filename
      : `${image?.filename}/m/`,
    alt: image?.alt,
    title: image?.title,
  };
}
