import { StoryblokComponentProps } from '@/types/component';
import { Box } from '@chakra-ui/react';
import getFieldsByComponent from '@/helpers/getFieldsByComponent';
import { StoryblokComponent } from '@storyblok/react';

export default function FeatureWithImageAccordion({
  blok,
}: StoryblokComponentProps) {
  const accordion = getFieldsByComponent({
    list: blok.components,
    component: 'accordion',
  });

  return (
    <Box
      bgGradient={['none', 'none', 'linear(to-r, gray.1000, gray.850)']}
      py={[0, 0, '105px']}
    >
      <StoryblokComponent blok={accordion} featureWithImageAccordion />
    </Box>
  );
}
