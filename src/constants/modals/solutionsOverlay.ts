import { theme } from '@tfo/mytfo-components';

export const contentStyleProps = {
  '& ul': {
    listStyle: 'none',
    display: 'flex',
    gap: 6,
  },
  '& p': {
    marginBottom: 4,
    color: theme.colors.gray['400'],
    '& b': {
      color: theme.colors.gray['300'],
    },
  },
};
