import { ComponentStyleConfig } from '@chakra-ui/react';
import { theme } from '@tfo/mytfo-components';

const LinkTheme: ComponentStyleConfig = {
  defaultProps: {
    variant: 'basic',
  },
  variants: {
    basic: () => {
      return {
        fontSize: 'md',
        color: theme.colors.tfo.primary[500],
        textDecoration: 'underline',
        _hover: {
          color: theme.colors.tfo.primary[500],
          textDecoration: 'none',
        },
      };
    },
  },
};
export default LinkTheme;
