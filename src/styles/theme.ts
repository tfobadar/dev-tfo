import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { theme as mytfoTheme } from '@tfo/mytfo-components';
import Link from '@/components/Link/Link.theme';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.1000 !important',
      },
      ':root': {
        '--components-fonts-heading': 'var(--chakra-fonts-heading)',
        '--components-fonts-body': 'var(--chakra-fonts-body)',
      },
    },
  },
  fontSizes: {
    '2md': '2rem',
  },
  breakPoints: {
    sm: '30em',
    md: '48em',
    lg: '65em',
    xl: '80em',
    '2xl': '96em',
  },
  components: {
    Link,
    SelectControl: {
      ...mytfoTheme.components.SelectControl,
    },
    Container: {
      baseStyle: {
        paddingX: ['0', '0', 5, 5, 0],
      },
    },
  },
  colors: {
    ...mytfoTheme.colors,
    ...colors,
  },
});

export default theme;
