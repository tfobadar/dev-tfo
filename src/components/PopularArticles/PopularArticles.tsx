import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex } from '@chakra-ui/react';
import { ISbStoryData, getStoryblokApi } from '@storyblok/react';
import { useEffect, useState } from 'react';
import PopularArticlesList from './PopularArticlesList';
import { CardWithTopImageSkeleton } from '../Skeletons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const PopularArctiles = (props: StoryblokComponentProps) => {
  const { blok } = props;

  const { locale = 'en' } = useRouter();
  const [featuredArticle, setFeaturedArticle] = useState<ISbStoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getArticles = async (category: string) => {
    const { data } = await getStoryblokApi().get(`cdn/stories`, {
      version: getStoryblokVersion(),
      starts_with: 'insights/',
      is_startpage: 0,
      filter_query: {
        component: { in: 'articlePage' },
        category: { any_in_array: category },
      },
      language: locale,
      resolve_relations: ['articlePage.category'],
      per_page: 1,
      sort_by: 'first_published_at:desc',
    });

    setFeaturedArticle((prevState) => {
      // remove duplicates
      return [...prevState, data.stories[0]].reduce((acc, current) => {
        const x = acc.find((item: ISbStoryData) => item?.id === current?.id);
        if (!x && current) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setFeaturedArticle([]);
    if (blok.articlesByCategory?.length !== 0) {
      setIsLoading(true);
      blok.articlesByCategory?.map((category: string) => getArticles(category));
    }
  }, [blok.articlesByCategory]);

  const article = featuredArticle.length !== 0 ? featuredArticle : blok.article;

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex
          gap={['55px', '55px', '62px']}
          direction={['column', 'column', 'row']}
        >
          {article.map((articleItem: ISbStoryData) => (
            <PopularArticlesList
              key={articleItem.full_slug}
              articleItem={articleItem}
              blok={blok}
            />
          ))}
          {isLoading && <CardWithTopImageSkeleton name="popularArticles" />}
        </Flex>
      </Reveal>
    </Container>
  );
};

export default PopularArctiles;
