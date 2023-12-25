import InplContactForm from '@/components/Forms/InplContactForm';
import Title from '@/components/Title/Title';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Flex, Box } from '@chakra-ui/react';
import React from 'react';

export default function Inpl({ blok }: StoryblokComponentProps) {
  const { sectionTitle, form } = blok;
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Flex gap={{ base: 8, lg: 14 }} flexDir={{ base: 'column', md: 'row' }}>
        <Box w={{ base: 'full', md: '40%' }}>
          <Title
            blok={sectionTitle?.[0]}
            headingProps={{ textAlign: 'start' }}
            textProps={{ textAlign: 'start' }}
          />
        </Box>
        <Box>
          <InplContactForm blok={form?.[0]} />
        </Box>
      </Flex>
    </Container>
  );
}
