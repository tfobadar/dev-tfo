import { SBButton } from '@/types/component';
import getButtonFromStoryBlok from './getButtonFromStoryBlok';
import { ButtonProps } from '@chakra-ui/react';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import { ISbStoryData } from '@storyblok/react';

type IParams = {
  ctas: ISbStoryData & { [key: string]: any };
  buttonsProps?: ButtonProps[];
  isAlternateText?: boolean;
  shouldTrackEvent?: boolean;
};
export default function getButtonsListFromStoryblok({
  ctas,
  buttonsProps,
  isAlternateText,
  shouldTrackEvent = true,
  ...rest
}: IParams) {
  return {
    list: ctas?.[0]?.buttons.map(
      (button: SBButton, index: number) =>
        ({
          ...getButtonFromStoryBlok({
            button,
            isAlternateText,
            buttonProps: buttonsProps?.[index],
            shouldTrackEvent,
            ...rest,
          }),
        } as ButtonProps),
    ),
  } as ButtonsByLimit;
}
