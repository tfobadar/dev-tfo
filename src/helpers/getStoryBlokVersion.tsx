/**
 * Based on env and loaded .env file, returns storyblok's stories version
 * value is either `draft` or `published`
 * */
export default function getStoryblokVersion() {
  return process.env.STORYBLOK_STORIES_VERSION as 'draft' | 'published';
}
