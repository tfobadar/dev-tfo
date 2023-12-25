export const GRID_LIST_PROPS = {
  '& li': {
    width: { base: '30%', sm: '30%', md: '43%', lg: '45%' },
  },
  '& li:last-child': {
    width: { base: '65%', sm: '65%', md: '95%', lg: '45%' },
  },
  '& li ': {
    '& .vertical-divider': {
      display: 'none !important',
    },
    '& .horizontal-divider': {
      display: 'none !important',
    },
  },
};
