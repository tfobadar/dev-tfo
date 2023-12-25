import { getLinkFromStoryblok } from './getLinkFromStoryblok';
import renderRichText from './renderRichText';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { SBButton } from '@/types/component';
import { ButtonProps } from '@tfo/mytfo-components/lib/components/Button/Button';
import renderAsString from './renderRichTextAsString';
import { trackButtonEvent, trackLinkEvent } from './trackClickEvents';
import { scrollToSection } from './scrollToSection';
import { getImageFromStoryblok } from './getImageFromStoryblok';
import Image from 'next/image';
import { replacePlaceholder } from './renderRichText';

type IParams = {
  button: SBButton;
  isNextLink?: boolean;
  isAlternateText?: boolean;
  buttonProps?: ButtonProps;
  shouldTrackEvent?: boolean;
  [key: string]: any;
};

type ButtonCTA = ButtonProps & { text: string };

/**
 * Returns button/link object compatible with `mytfo-components` library
 * */
export default function getButtonFromStoryBlok({
  button,
  isNextLink = true,
  isAlternateText = false,
  buttonProps,
  shouldTrackEvent = true,
  ...rest
}: IParams) {
  let icon: ButtonProps = {};

  const {
    onClick = () => {},
    title = '',
    ...restButtonProps
  } = buttonProps ?? {};

  const buttonTitle = title !== '' ? `${title}-` : '';

  let link: LinkProps | ButtonProps = {
    ...restButtonProps,
    onClick: (e: any) => {
      if (shouldTrackEvent) {
        trackButtonEvent({
          label: `${buttonTitle}${renderAsString({ content: button?.text })}`,
          placement: 'middlePage',
        });
      }
      onClick(e);
    },
  };

  let text = renderRichText({ content: button?.text });

  // append button icon if exists
  if (button?.position && button?.icon?.filename) {
    icon = {
      [`${button.position}Icon`]: (
        <Image
          {...getImageFromStoryblok(button?.icon)}
          height={18}
          width={18}
        />
      ),
    };
  }

  // Alternate text is mainly used on alternate state of the button.
  // Eg: Unexpanded card will show `Read More` and expanded card would show `Read Less`
  if (isAlternateText) {
    text = renderRichText({ content: button?.alternateText });
  }

  if (button?.type === 'link') {
    const { queryParams = null } = rest;
    let hrefParams = '';
    if (queryParams) {
      hrefParams = `/${queryParams}`;
    }

    link = {
      ...link,
      href: `${getLinkFromStoryblok(button?.link)}${hrefParams}`,
      as: isNextLink ? NextLink : Link,
      target: button?.link?.target || '_self',
    };
  }

  if (button?.variant === 'link') {
    link = {
      ...link,
      onClick: (e: any) => {
        if (shouldTrackEvent) {
          trackLinkEvent({
            label: `${buttonTitle}${renderAsString({ content: button?.text })}`,
            placement: 'middlePage',
          });
        }
        onClick(e);
      },
      textDecoration: 'none',
      _hover: {
        textDecoration: 'underline',
      },
    };
  }

  if (button?.variant === 'whatsapp') {
    const url = getLinkFromStoryblok(button.link);
    const { queryParams = null } = rest;
    const replacer = {
      domain: `${window.location.protocol}//${window.location.hostname}/`,
      inviteCode: queryParams,
      refCode: queryParams,
    };
    const updatedURL = replacePlaceholder(url, replacer);

    link = {
      ...link,
      href: updatedURL,
      bg: '#21BE5C',
      color: '#FFFFFF',
    };
  }

  if (button?.type === 'scroll') {
    link = {
      ...link,
      onClick: (e: any) => {
        trackButtonEvent({
          label: `${buttonTitle}${renderAsString({ content: button?.text })}`,
          placement: 'middlePage',
        });
        scrollToSection(
          button?.scrollToSection,
          button?.scrollOffset ? parseInt(button?.scrollOffset) : 216,
        );
        onClick(e);
      },
    };
  }

  return {
    ...link,
    ...icon,
    text: renderAsString({ content: button?.text }),
    children: renderRichText({ content: button?.text }),
    variant: button?.variant || 'solid',
    width: button?.customButtonWidth,
  } as ButtonCTA;
}
