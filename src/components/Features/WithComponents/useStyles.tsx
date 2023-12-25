import { SbBlokData } from '@storyblok/react';

export default function useStyles(blok: SbBlokData) {
  const gaps = {
    row: {
      desktop: blok.rowGapDesktop || '20',
      mobile: blok.rowGapMobile || '20',
    },
    column: {
      desktop: blok.columnGapDesktop || '80',
      mobile: blok.columnGapMobile || '40',
    },
  };
  const flexProps = {
    columnGap: [
      `${gaps.column.mobile}px`,
      `${gaps.column.mobile}px`,
      `${gaps.column.desktop}px`,
    ],
    rowGap: [
      `${gaps.row.mobile}px`,
      `${gaps.row.mobile}px`,
      `${gaps.row.desktop}px`,
    ],
    alignItems: [
      `${blok.verticalAlignMobile}` || 'start',
      `${blok.verticalAlignMobile}` || 'start',
      `${blok.verticalAlignDesktop}` || 'center',
    ],
  };
  return { flexProps };
}
