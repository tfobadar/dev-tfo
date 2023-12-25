import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { SBImage } from '@/types/component';
import { useBreakpointValue } from '@chakra-ui/react';

export const useResponsiveImage = (image: SBImage, imageMobile?: SBImage) => {
  if (!imageMobile) {
    getImageFromStoryblok(image);
  }

  const isMobile = useBreakpointValue({ base: true, md: false });
  return isMobile && imageMobile
    ? getImageFromStoryblok(imageMobile)
    : getImageFromStoryblok(image);
};
