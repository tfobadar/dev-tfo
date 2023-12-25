export type WindowWithGtag = Window & {
  gtag: {
    [key: string]: any;
  };
  dataLayer?: any;
};
