import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { Gaps } from '@/types/card';
import { useBreakpointValue } from '@chakra-ui/react';

/**
 * Returns cards with equal widths on desktop and mobile based on
 * cards per row
 * */
export const useCardWithEqualWidth = ({
  mobile = '1',
  desktop = '4',
  gaps,
  wrapperWidth = MAX_CONTAINER_WIDTH,
}: {
  mobile: string;
  desktop: string;
  gaps?: Gaps;
  wrapperWidth?: number;
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const itemCount = isMobile ? mobile : desktop;
  const gap = isMobile ? gaps?.column?.mobile : gaps?.column?.desktop;

  const width: any = Math.floor(
    (wrapperWidth - (parseInt(itemCount) - 1) * parseInt(gap as string)) /
      parseInt(itemCount),
  );
  return {
    width: `${Math.floor((width * 100) / wrapperWidth)}%`,
  };
};
