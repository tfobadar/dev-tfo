import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex, Heading } from '@chakra-ui/react';
import { ISbStoryData } from '@storyblok/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { Button } from '@tfo/mytfo-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackTabClickEvent } from '@/helpers/trackClickEvents';

export default function InsightsCategories({ blok }: StoryblokComponentProps) {
  const router = useRouter();

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      {blok.title && (
        <Heading fontWeight="normal" fontSize={['2xl', '2xl', '3xl']}>
          {blok.title}
        </Heading>
      )}

      {blok.categories?.length ? (
        <Flex gap={4} mt={8} wrap="wrap">
          {blok.categories?.map((category: ISbStoryData) => (
            <Button
              variant="outline"
              key={category?.content?.name}
              as={Link}
              // @ts-ignore
              href={`${router.asPath}/${category.slug}`}
              textTransform="capitalize"
              onClick={() => {
                trackTabClickEvent({
                  label: category?.content?.name,
                  placement: 'middlePage',
                });
              }}
            >
              {category?.content?.name}
            </Button>
          ))}
        </Flex>
      ) : null}
    </Container>
  );
}
