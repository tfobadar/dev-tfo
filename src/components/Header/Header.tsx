import { ButtonProps, ImageProps, chakra } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Header as TFOHeader } from '@tfo/mytfo-components';
import { ISbStoryData } from '@storyblok/react';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { SBButton, SBLink } from '@/types/component';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import {
  ARABIC_LANGUAGE,
  ARABIC_ROUTE,
  ENGLISH_LANGUAGE,
  ENGLISH_ROUTE,
  ARABIC_FONT_FAMILY,
} from '@/constants/globals';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import getActiveLink from '@/helpers/getActiveLink';
import {
  trackButtonEvent,
  trackLanguageSelection,
  trackLogoEvent,
  trackNavigationEvent,
} from '@/helpers/trackClickEvents';
import { useEffect, useState, useContext } from 'react';
import { getIPad } from '@/helpers/getIpad';
import HeaderContext from '@/utils/HeaderContext';
import { scrollToSection } from '@/helpers/scrollToSection';

type HeaderButton = Partial<ButtonProps> &
  SBButton & {
    isLanguageSwitch: boolean;
    link: SBLink;
    direction: string;
  };

export default function Header({
  content,
  queryParams,
}: {
  content: ISbStoryData;
  [key: string]: any;
}) {
  const router = useRouter();
  const [isIPad, setIsIPad] = useState<boolean | 0>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showLanguageSwitch } = useContext(HeaderContext);
  const [showClaimRewards, setShowClaimRewards] = useState(false);
  useEffect(() => {
    setIsIPad(getIPad());
    const isIpadCheck =
      (navigator.maxTouchPoints > 2 && /Macintosh/.test(navigator.userAgent)) ||
      /iPad/.test(navigator.userAgent);
    setIsIPad(isIpadCheck);
    const checkClaimRewards = localStorage.getItem('showClaimRewards');
    if (checkClaimRewards == 'true') {
      setShowClaimRewards(true);
    } else {
      setShowClaimRewards(false);
    }
    setIsLoaded(true);
  }, []);

  const { locale } = router;
  const { content: headerContent } = content ?? {};

  const {
    logo,
    topLinkItems,
    topRightCTAs,
    language_switch: headerLanguageSwitch = false,
  } = headerContent ?? {};

  const headerLogo = {
    link: {
      href: getLinkFromStoryblok(logo[0].link),
      as: NextLink,
      onClick: () => trackLogoEvent({}),
    },
    image: {
      ...(getImageFromStoryblok(logo[0].image) as ImageProps),
      height: '40px',
      width: '91px',
    },
  };

  const getLinkWithQuery = (menuLink: string) => {
    const splitLinkByHash = menuLink.split('#');
    return `${splitLinkByHash[0]}${queryParams ? '/' + queryParams : ''}${
      splitLinkByHash[1] ? '#' + splitLinkByHash[1] : ''
    }`;
  };

  const headerTopLinks = topLinkItems.map((link: any) => {
    const menuLink = getLinkFromStoryblok(link.href);

    return {
      ...link,
      href: getLinkWithQuery(menuLink),
      as: NextLink,
      prefetch: false,
      linkIconProps: {
        color: getActiveLink(router.asPath, menuLink),
      },
      color: getActiveLink(router.asPath, menuLink),
      _hover: {
        color: 'tfo.primary.500',
        '& svg': {
          color: 'tfo.primary.500',
        },
      },
      onClick: (e: any) => {
        const urlHash = /^#(\S)/g;
        if (menuLink.match(urlHash)) {
          e.preventDefault();
          const sectionId = menuLink.replace(urlHash, '$1');
          scrollToSection(sectionId, 0);
        }
        trackNavigationEvent({
          label: link.children as string,
        });
      },

      childRoutes: link?.childRoutes?.map((childRoute: any) => {
        const menuChildLink = getLinkFromStoryblok(childRoute.href);
        return {
          ...childRoute,
          href: menuChildLink,
          color: getActiveLink(router.asPath, menuChildLink),
          as: NextLink,
          onClick: () =>
            trackNavigationEvent({
              label: childRoute.children as string,
            }),
        };
      }),
      me: [0, 2, 2, 2, 4],
    };
  });

  const headerTopRightCTA = topRightCTAs.map((button: HeaderButton) => {
    const { link, children, isLanguageSwitch, type, ...buttonProps } =
      button ?? {};
    const claimRewardCheck = showClaimRewards ? 'flex' : 'none';
    const lgDisplayCheck = isIPad
      ? 'none'
      : children === 'Claim Rewards'
      ? claimRewardCheck
      : 'flex';
    let href = getLinkWithQuery(getLinkFromStoryblok(link));
    let display = {
      base: 'none',
      lg: lgDisplayCheck,
    };
    let fontWeight: string = '500';
    let dir = button?.direction;
    const onClick = () =>
      trackButtonEvent({
        label: children as string,
      });

    let linkParams: any = {
      href,
      as: NextLink,
      prefetch: false,
      target: link?.target || '_self',
      onClick,
    };
    // @ts-ignore
    if (type === 'scroll') {
      linkParams = {
        onClick: () => {
          onClick();
          scrollToSection(
            button?.scrollToSection,
            parseInt(button?.scrollOffset),
          );
        },
      };
    }

    return {
      ...buttonProps,
      ...linkParams,
      text: children,
      display,
      fontWeight,
      dir,
    };
  });

  const headerMobileCTAs: ButtonsByLimit = {
    list: headerTopRightCTA.map((button: ButtonProps) => ({
      ...button,
      display: ['flex'],
      width: 'auto',
      mt: 4,
    })),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const languageSwitch = {
    children: isEnglishLanguage(locale) ? (
      <chakra.span fontFamily={ARABIC_FONT_FAMILY}>
        {ARABIC_LANGUAGE}
      </chakra.span>
    ) : (
      ENGLISH_LANGUAGE
    ),
    href: `${isEnglishLanguage(locale) ? ARABIC_ROUTE : ENGLISH_ROUTE}${
      router.asPath
    }`,
    display: showLanguageSwitch ? 'flex' : 'none',
    onClick: () => {
      // update the `locale` in session storage
      if (window?.sessionStorage) {
        window.sessionStorage.setItem(
          'locale',
          isEnglishLanguage(locale) ? 'ar' : 'en',
        );
      }
      trackLanguageSelection({
        label: (isEnglishLanguage(locale) ? 'English' : 'Arabic') as string,
      });
    },
  };

  return (
    <TFOHeader
      logo={headerLogo}
      topLinkItems={headerTopLinks}
      topRightCTAs={{ list: headerTopRightCTA }}
      mobileCTAs={headerMobileCTAs}
      languageSwitch={headerLanguageSwitch ? languageSwitch : {}}
      dir={isEnglishLanguage(locale) ? 'ltr' : 'rtl'}
      iconProps={{
        color: 'white',
        height: 6,
        width: 6,
      }}
      navProps={{
        bg: 'gray.850',
        px: [2, 2, 14],
        paddingStart: [5, 5, 14],
        position: 'fixed',
        w: 'full',
        zIndex: 10,
        right: isEnglishLanguage(locale) ? 'unset' : 0,
        left: isEnglishLanguage(locale) ? 0 : 'unset',
        display: isLoaded ? 'flex' : 'none',
      }}
      mobileNavProps={{
        bg: 'gray.850',
        position: 'fixed',
        w: 'full',
        zIndex: 10,
        top: 24,
        pt: 0,
        // display: isLargerThanIpad ? 'none' : 'flex',
        display: { base: 'flex', lg: isIPad ? 'flex' : 'none' },
      }}
      desktopFlexWrapperProps={{
        justifyContent: {
          base: 'flex-end',
          lg: isIPad ? 'flex-end' : 'space-between',
        },
      }}
      desktopWrapperProps={{
        display: { base: 'none', lg: isIPad ? 'none' : 'flex' },
      }}
      mobileWrapperProps={{
        display: { base: 'flex', lg: isIPad ? 'flex' : 'none' },
      }}
    />
  );
}
