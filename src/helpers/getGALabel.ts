import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import renderAsString from './renderRichTextAsString';

export function getGALabel(
  location: string,
  content: string | StoryblokRichtext,
) {
  let CTAText = content;

  if (typeof content === 'object') {
    CTAText = renderAsString({ content });
  }

  return `${location}-${CTAText}`;
}
