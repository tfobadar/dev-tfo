import { StoryblokComponentProps } from './component';

export type Gaps = {
  row: {
    desktop: string;
    mobile: string;
  };
  column: {
    desktop: string;
    mobile: string;
  };
};

export type Card = StoryblokComponentProps & {
  cardsPerRow?: {
    desktop?: string;
    mobile?: string;
  };
  gaps?: Gaps;
  wrapperWidth?: number;
};
