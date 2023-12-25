import React, { useState } from 'react';
import { StoryblokComponentProps } from '@/types/component';
import { Box, Container, Flex } from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import TabsComponent from '@/components/Tabs/Tabs';
import Title from '@/components/Title/Title';
import TabsContext from '@/utils/TabsContext';
import { SbBlokData, StoryblokComponent } from '@storyblok/react';
export default function ContactUsTabs({ blok }: StoryblokComponentProps) {
  const { sectionTitle } = blok;
  const [data, setData] = useState<number>(0);

  const updateData = (newValue: number) => {
    setData(newValue);
  };

  return (
    <TabsContext.Provider value={{ data, updateData }}>
      <Container maxWidth={MAX_CONTAINER_WIDTH}>
        <Flex gap={{ base: 8, lg: 14 }} flexDir={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'full', md: '40%' }}>
            <Title
              blok={sectionTitle?.[0]}
              headingProps={{ textAlign: 'start' }}
              textProps={{ textAlign: 'start' }}
            />
          </Box>
          <Box w={{ base: 'full', md: '60%' }}>
            <TabsComponent
              blok={blok.components[0]}
              tabListProps={{
                justifyContent: 'start',
                flexWrap: { base: 'wrap', md: 'nowrap' },
              }}
              tabListWrapperProps={{ overflowX: 'clip', display: 'flex' }}
            />
          </Box>
        </Flex>
        {blok.components?.[0]?.tabItem?.[data]?.bottomSection?.map(
          (bottomSection: SbBlokData) => (
            <StoryblokComponent
              key={bottomSection?._uid}
              blok={bottomSection}
            />
          ),
        )}
      </Container>
    </TabsContext.Provider>
  );
}
