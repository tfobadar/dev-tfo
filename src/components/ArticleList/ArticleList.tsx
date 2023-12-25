import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import getStoryblokVersion from '@/helpers/getStoryBlokVersion';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Container, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ISbStoryData, getStoryblokApi } from '@storyblok/react';
import { useCallback, useEffect, useState } from 'react';
import PopularArticlesList from '../PopularArticles/PopularArticlesList';
import { CardWithTopImageSkeleton } from '../Skeletons';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import { SmallAddIcon } from '@chakra-ui/icons';
import { Button } from '@tfo/mytfo-components';
import Pagination from '../Pagination';
import dynamic from 'next/dynamic';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function ArticleList({ blok }: StoryblokComponentProps) {
  const {
    postsPerPage: per_page,
    postsPerPageMobile: per_page_mobile,
    showLoadMore = false,
    loadMoreText,
    pagination,
    sortOrder = 'desc',
  } = blok ?? {};

  const { locale, query } = useRouter();
  const [posts, setPostList] = useState<ISbStoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<any>(pagination ? query.page : 1);
  const [loadMorePage, setLoadMorePage] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLoadMore, setIsLoadMore] = useState<boolean>(showLoadMore);

  const getArticles = useCallback(
    async (category: string[]) => {
      if (pagination) {
        setPostList([]);
      }
      let isEnglishVersion = {};
      let isArabicVersion = {};
      let excludePosts = {};

      // filter out articles that are marked as Arabic
      if (isEnglishLanguage(locale)) {
        isEnglishVersion = {
          __or: [
            { noEnglishVersion: { is: 'empty' } },
            { noEnglishVersion: { is: false } },
          ],
        };
      }
      // filter out articles that are marked as English
      if (!isEnglishLanguage(locale)) {
        isArabicVersion = {
          __or: [
            { noArabicVersion: { is: 'empty' } },
            { noArabicVersion: { is: false } },
          ],
        };
      }

      if (blok.currentPostUUID) {
        excludePosts = {
          _uid: { not_in: blok.currentPostUUID },
        };
      }

      const { data, total } = await getStoryblokApi().get(`cdn/stories`, {
        version: getStoryblokVersion(),
        is_startpage: 0,
        starts_with: `insights/${blok?.source?.slug}/`,
        filter_query: {
          component: { in: 'articlePage' },
          category: { any_in_array: category.join(',') },
          ...excludePosts,
          ...isEnglishVersion,
          ...isArabicVersion,
        },
        language: locale,
        resolve_relations: ['articlePage.category'],
        page: loadMorePage || page,
        per_page,
        sort_by: `content.publishDate:${sortOrder}`,
      });

      setTotalPages(total);
      if (pagination) {
        setPostList(data.stories);
      } else {
        setPostList((prevState) => {
          // remove duplicates
          return [...prevState, ...data.stories].reduce((acc, current) => {
            const x = acc.find(
              (item: ISbStoryData) => item?.id === current?.id,
            );
            if (!x && current) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
        });
      }
      setIsLoading(false);
      setIsLoadMore(showLoadMore && !(total / per_page <= page));
    },
    [page, per_page, showLoadMore, loadMorePage],
  );

  useEffect(() => {
    if (pagination) {
      setPostList([]);
    }
    setPage(query.page || 1);
    setIsLoading(true);
    getArticles(blok.articlesByCategory);
  }, [blok.articlesByCategory, page, query.page, loadMorePage]);

  const getAllPosts = () => {
    if (isMobile && per_page_mobile) {
      return posts
        .slice(0, per_page_mobile)
        .map((articleItem: ISbStoryData) => (
          <PopularArticlesList
            key={articleItem.full_slug}
            articleItem={articleItem}
            blok={blok}
          />
        ));
    }

    return posts.map((articleItem: ISbStoryData) => (
      <PopularArticlesList
        key={articleItem.full_slug}
        articleItem={articleItem}
        blok={blok}
      />
    ));
  };
  const handleLoadMore = () => {
    trackButtonEvent({ label: loadMoreText, placement: 'middlePage' });
    setLoadMorePage((prevState: any) => {
      if (prevState != null) {
        return prevState + 1;
      }
      return 2;
    });
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex
          gap={[12, 12, 8]}
          direction={['column', 'column', 'row']}
          wrap={'wrap'}
          justifyContent={['space-between', 'space-between', 'start']}
        >
          {getAllPosts()}
          {isLoading && (
            <CardWithTopImageSkeleton name="articleList" count={per_page} />
          )}
        </Flex>

        {totalPages > per_page && pagination ? (
          <Box
            __css={{
              '& .next-pagination': {
                display: 'flex',
                userSelect: 'none',
                justifyContent: 'center',
                marginTop: 24,
              },
              '& @media screen and (min-width: 37.5em)': {
                '& .next-pagination__item': {
                  display: 'block',
                },
              },
              '& .next-pagination__list': {
                display: 'flex',
                listStyleType: 'none',
                margin: 0,
                padding: 0,
              },
              '& .next-pagination__form': {
                display: 'none',
              },
              '&         .next-pagination__link': {
                display: 'block',
                minWidth: '2.5em',
                outline: '1px solid transparent',
                padding: '0.5em 0.5em',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'outline-color 0.2s ease-in-out',
              },
              '& .next-pagination__link--disabled': {
                color: '#666',
                pointerEvents: 'none',
              },
              '& .next-pagination__link--current': {
                color: '#b99855',
                pointerEvents: 'none',
              },
              '& .next-pagination__link svg': {
                display: 'block',
                transform: `rotate(${
                  isEnglishLanguage(locale) ? '0deg' : '180deg'
                })`,
              },
            }}
          >
            <Pagination
              total={totalPages}
              sizes={[parseInt(per_page)]}
              theme={{
                'next-pagination': 'next-pagination',
                'next-pagination__form': 'next-pagination__form',
                'next-pagination__item': 'next-pagination__item',
                'next-pagination__link': 'next-pagination__link',
                'next-pagination__link--current':
                  'next-pagination__link--current',
                'next-pagination__link--disabled':
                  'next-pagination__link--disabled',
                'next-pagination__list': 'next-pagination__list',
              }}
            />
          </Box>
        ) : (
          isLoadMore && (
            <Flex justifyContent={'center'} mt={120}>
              <Button leftIcon={<SmallAddIcon />} onClick={handleLoadMore}>
                {loadMoreText}
              </Button>
            </Flex>
          )
        )}
      </Reveal>
    </Container>
  );
}
