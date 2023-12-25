import { cardWithEqualWidth } from '@/constants/cards/card';
import formatDate from '@/helpers/formatDate';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import {
  Text,
  Card,
  CardBody,
  ImageProps,
  Stack,
  Heading,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import getFieldsByComponent from '@/helpers/getFieldsByComponent';
import { trackContentSelectionEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import { ChakraNextImage } from '../ChakraNextImage';

export default function PopularArticlesList({ articleItem, blok }: any) {
  let image = {};
  const isMobileAndDesktop = useBreakpointValue({
    base: true,
    md: true,
    lg: true,
    xl: false,
  });

  const content = articleItem?.content;
  const { title: sectionTitle, description: sectionDescription } =
    getFieldsByComponent({
      list: content.topSection,
      component: 'sectionTitle',
    });

  const title = renderRichText({
    content: sectionTitle,
  });
  const description = renderRichText({
    content: sectionDescription,
  });
  if (content?.image) {
    image = {
      ...getImageFromStoryblok(content?.image),
      width:
        blok.postsPerRowDesktop <= '2'
          ? ['100%', '100%', '100%', '100%', '559px']
          : ['100%', '100%', '100%', '100%', '350px'],
      sizes: `(max-width: 768px) 100vw, ${
        blok.postsPerRowDesktop <= '2' ? '50vw' : '33vw'
      }`,
      height:
        blok.postsPerRowDesktop <= '2'
          ? ['218px', '218px', '316px']
          : ['218px', '218px', '197px'],
    } as ImageProps;
  }

  const publishedDate = formatDate({
    date: content?.publishDate,
    options: { year: 'numeric', month: 'short', day: 'numeric' },
  });

  return (
    <Card
      key={articleItem?.name}
      display={'flex'}
      height={'full'}
      bg={'none'}
      onClick={() => {
        trackContentSelectionEvent({
          label: renderAsString({ content: sectionTitle }),
        });
      }}
      sx={{
        ...cardWithEqualWidth({
          mobile: blok.postsPerRowMobile,
          desktop: blok.postsPerRowDesktop,
        }),
      }}
    >
      <Link href={articleItem?.full_slug || ''}>
        <CardBody padding={0}>
          <ChakraNextImage
            {...image}
            style={{ borderRadius: '4px', objectFit: 'cover' }}
          />
          <Stack mt="6" spacing="3">
            <Text fontSize="xs">
              <chakra.span textTransform={'capitalize'}>
                {articleItem?.content?.category?.[0]?.content.name} -{' '}
              </chakra.span>
              <chakra.span textTransform={'lowercase'}>
                {articleItem?.content?.readTime}
              </chakra.span>
            </Text>
            <Heading
              fontSize={'md'}
              fontWeight={'normal'}
              color="white"
              noOfLines={3}
            >
              {title}
            </Heading>
            <Text noOfLines={3} color={'gray.400'}>
              {description}
            </Text>
            <Text fontSize="xs">{publishedDate}</Text>
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
}
