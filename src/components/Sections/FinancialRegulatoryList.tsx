import { StoryblokComponentProps } from '@/types/component';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import MultiColumnImage from '../MutliColumnImage/MultiColumnImage';
const FinancialRegulatoryList = ({ blok }: StoryblokComponentProps) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' },
  );

  return (
    <MultiColumnImage
      blok={{
        images: [
          {
            filename: '/images/cbb-logo.svg',
            alt: 'CBB Logo',
            width: 200,
            height: 32,
          },
          {
            filename: '/images/cma-logo.svg',
            alt: 'CMA Logo',
            width: 187,
            height: 32,
          },
          {
            filename: '/images/dfsa-image.svg',
            alt: 'DFSA Logo',
            width: 251,
            height: 32,
          },
        ],
      }}
      containerProps={{
        flexDirection: 'row',
        // @ts-ignore
      }}
      seperatorProps={{
        height: ['30px', '40px'],
        display: 'block',
        _even: {
          display: isMobile ? 'none' : 'block',
        },
      }}
    />
  );
};

export default FinancialRegulatoryList;
