import { ImageProps } from 'next/image';
import { SBLink } from './component';

export type VideoProps = ImageProps & {
  videoUrl: string;
  showPlayButton?: boolean;
  heroBannerLink?: SBLink;
};
