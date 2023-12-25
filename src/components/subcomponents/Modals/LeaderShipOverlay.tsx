import { Divider, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
export default function LeaderShipOverlay({ content }: any) {
  const { modalTitle, text, subHeading, image, description } = content ?? {};
  const imageProps = getImageFromStoryblok(image);
  return (
    <Flex direction={'column'} textAlign={'start'}>
      {modalTitle && (
        <Heading
          fontWeight={'normal'}
          fontSize={'xs'}
          textTransform={'uppercase'}
          letterSpacing={'wider'}
          textAlign={'start'}
          mb={8}
          color={'white'}
        >
          {modalTitle}
        </Heading>
      )}
      <Flex
        direction={['column', 'column', 'row']}
        gap={10}
        alignItems={['start', 'start', 'center']}
      >
        <Image {...imageProps} width={175} height={225} />
        <Flex direction={'column'}>
          <Heading fontSize={'22px'} color={'white'} lineHeight={'120%'} mb={4}>
            {text}
          </Heading>
          <Text fontSize={'md'} lineHeight={'120%'} color={'gray.400'}>
            {subHeading}
          </Text>
        </Flex>
      </Flex>
      <Divider my={8} />
      <Text fontSize={'md'} lineHeight={'120%'} color={'gray.400'}>
        {renderRichText({ content: description })}
      </Text>
    </Flex>
  );
}
