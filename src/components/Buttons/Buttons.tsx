import { StoryblokComponentProps } from '@/types/component';
import { Buttons } from '@tfo/mytfo-components';
import useStyles from './useStyles';
import { ButtonProps, useBreakpointValue } from '@chakra-ui/react';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';

export default function TFOButtons({
  blok,
  buttonProps = [],
  customProps = {},
  ...rest
}: StoryblokComponentProps & {
  buttonProps?: ButtonProps[];
  customProps?: ButtonsByLimit;
}) {
  const { flexProps, buttons } = useStyles(blok, buttonProps, rest);
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  if ((blok?.hideInDesktop && isDesktop) || (blok?.hideInMobile && isMobile)) {
    return <></>;
  }

  return <Buttons {...buttons} {...flexProps} {...customProps} />;
}
