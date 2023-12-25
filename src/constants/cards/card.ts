const cardWithBorder = {
  wrapperProps: {
    bg: 'gray.850',
    paddingY: 10,
    paddingX: 8,
    border: '1px solid',
    borderColor: 'gray.750',
    borderRadius: 4,
  },
};

type CardWithEqualWidth = {
  mobile: string;
  desktop: string;
  gap?: {
    mobile: string;
    desktop: string;
  };
};

/**
 * Returns cards with equal widths on desktop and mobile based on
 * cards per row
 * */
export const cardWithEqualWidth = ({
  mobile = '1',
  desktop = '4',
}: CardWithEqualWidth) => ({
  '--flex-items': [mobile, mobile, desktop],
  '--flex-gap': [
    'var(--chakra-space-5)',
    'var(--chakra-space-5)',
    'var(--chakra-space-10)',
  ],
  width:
    'calc((100% / var(--flex-items)) - (((var(--flex-items) - 1) / var(--flex-items)) * var(--flex-gap)))',
});

export default cardWithBorder;
