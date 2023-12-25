import { Spinner, Box, BoxProps } from '@chakra-ui/react';
import { theme } from '@tfo/mytfo-components';
import React from 'react';

type IParams = BoxProps & {
  isLoading: boolean;
};
export default function Loader({ isLoading, ...rest }: IParams) {
  return (
    <Box
      position={'absolute'}
      bg={'black'}
      height={'full'}
      width={'full'}
      zIndex={2}
      display={isLoading ? 'flex' : 'none'}
      transition="display 500ms linear"
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor={theme.colors['tfo'].secondary[300]}
        color={theme.colors['tfo'].primary[500]}
        size="xl"
      />
    </Box>
  );
}
