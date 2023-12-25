import { chakra, Box, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { StoryblokComponentProps } from '@/types/component';
import formatDate from '@/helpers/formatDate';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';

export default function ArticleVideoPlayer({ blok }: StoryblokComponentProps) {
  const publishedDate = formatDate({
    date: blok?.publishDate,
    options: { year: 'numeric', month: 'short', day: 'numeric' },
  });
  let image = null;

  if (blok?.image?.filename) {
    image = (
      <Image
        {...getImageFromStoryblok(blok.image)}
        height={458}
        width={MAX_CONTAINER_WIDTH}
      />
    );
  }
  const getResponsiveImage = useResponsiveImage(blok.image, blok?.imageMobile);
  return (
    <>
      <Text fontSize="xs" textTransform={'capitalize'} display={'flex'}>
        {publishedDate}
        <chakra.span borderColor={'gray.750'} mx={4}>
          |
        </chakra.span>
        <chakra.span textTransform={'capitalize'}>
          {blok?.category?.[0]?.content?.name}
        </chakra.span>
        <chakra.span px={1} textTransform={'lowercase'}>
          - {blok?.readTime}
        </chakra.span>
      </Text>
      <Box mt={16} mb={10}>
        {blok.videoURL ? (
          <VideoPlayer
            {...getResponsiveImage}
            videoUrl={blok.videoURL}
            showPlayButton
          />
        ) : (
          image
        )}
      </Box>
    </>
  );
}
