import React, { useEffect, useState, useContext } from 'react';
import { MegaMenu as TFOMegaMenu } from '@tfo/mytfo-components';
import { ISbStoryData } from '@storyblok/react';
import { ButtonProps, Icon, chakra, useMediaQuery } from '@chakra-ui/react';
import NextLink from 'next/link';
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
  MAX_CONTAINER_WIDTH,
} from '@/constants/globals';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import getActiveLink from '@/helpers/getActiveLink';
import {
  trackButtonEvent,
  trackLanguageSelection,
  trackLogoEvent,
  trackNavigationEvent,
} from '@/helpers/trackClickEvents';
import HeaderContext from '@/utils/HeaderContext';
import { scrollToSection } from '@/helpers/scrollToSection';
import Image from 'next/image';
import renderRichText from '@/helpers/renderRichText';
import { DesktopLoginAccordianType } from '@tfo/mytfo-components/lib/types/megaMenu';
import SlideDown from '@/animations/SlideDown';
import { getHeaderIcon } from '@/helpers/getHeaderIcon';
import MobileCollapse from '@/animations/MobileCollapse';
import appendUtmParams from '@/helpers/appendUtmParams';
type HeaderButton = Partial<ButtonProps> &
  SBButton & {
    isLanguageSwitch: boolean;
    link: SBLink;
    direction: string;
  };

export default function MegaMenu({
  content,
  showTransparentHeader,
}: {
  content: ISbStoryData;
  showTransparentHeader: boolean;
}) {
  const { content: headerContent } = content ?? {};
  const {
    logo,
    MegaMenuTopLinkItems,
    MegaMenuTopRightCTAs,
    MegaMenuTopRightMenuItems,
    MegaMenuTopMenuList,
    MegaMenuMobileCTAs,
    language_switch: headerLanguageSwitch = false,
  } = headerContent ?? {};
  const router = useRouter();
  const { locale } = router;
  const { showLanguageSwitch } = useContext(HeaderContext);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const headerLogo = {
    link: {
      href: getLinkFromStoryblok(logo[0].link),
      as: NextLink,
      onClick: () => trackLogoEvent({}),
    },
    image: (
      <NextLink href={getLinkFromStoryblok(logo[0].link)}>
        <Image
          height={40}
          width={91}
          {...getImageFromStoryblok(logo[0].image)}
        />
      </NextLink>
    ),
  };
  const headerTopLinks = MegaMenuTopLinkItems?.map((link: any) => {
    const menuLink = getLinkFromStoryblok(link.href);

    return {
      children: link.children,
      fontSize: 'md',
      _hover: {
        color: 'inherit',
      },
      onClick: (e: any) => {
        const urlHash = /#(\S)/g;
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
          icon: (
            <Icon w={6} h={6} alignSelf={'flex-start'} fill={'none'}>
              {getHeaderIcon(childRoute.iconText)}
            </Icon>
          ),
          description: {
            children: renderRichText({ content: childRoute.shortDescription }),
          },
        };
      }),
      me: [0, 1, 1, 1, 1],
    };
  });
  const languageSwitch = {
    children: isEnglishLanguage(locale) ? (
      <chakra.span fontFamily={ARABIC_FONT_FAMILY}>
        {ARABIC_LANGUAGE}
      </chakra.span>
    ) : (
      ENGLISH_LANGUAGE
    ),
    href: `${
      isEnglishLanguage(locale) ? ARABIC_ROUTE : ENGLISH_ROUTE
    }${appendUtmParams(router.asPath.split('?')[0])}`,
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
  const headerTopRightCTA = MegaMenuTopRightCTAs?.map(
    (button: HeaderButton) => {
      const { link, children, isLanguageSwitch, type, ...buttonProps } =
        button ?? {};
      let href = getLinkFromStoryblok(link);
      let display = isLargerThan1280 ? 'flex' : 'none';
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
        fontWeight,
        display,
        dir,
      };
    },
  );

  const headerMobileCTAs: ButtonsByLimit = {
    limit: 3,
    list: MegaMenuMobileCTAs?.map((button: HeaderButton) => {
      const { link, children, isLanguageSwitch, type, ...buttonProps } =
        button ?? {};
      let href = getLinkFromStoryblok(link);
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
        children: children,
        ...linkParams,
        text: children,
        display: ['flex'],
        fontWeight: 'medium',
        width: 'auto',
        flex:
          button.children !== MegaMenuMobileCTAs?.[2]?.children ? 1 : '0 1 50%',
        minW: {
          base: 'full',
          lg:
            button.children === MegaMenuMobileCTAs?.[0]?.children ? 'full' : 0,
        },
        justifyContent: button.justifyContent ?? 'center',
        dir,
      };
    }),
    display: 'flex',
    flexWrap: 'wrap',
    mt: '20px !important',
    gap: 6,
  };

  const desktopAccordianLinks: DesktopLoginAccordianType = {
    label: { children: MegaMenuTopRightMenuItems?.[0]?.children },
    ctaList: MegaMenuTopRightMenuItems?.[0]?.ChildRoutes?.map(
      (childRoute: any) => {
        return {
          children: childRoute.children,
          href: getLinkFromStoryblok(childRoute.href),
          target: childRoute?.href?.target || '_self',
        };
      },
    ),
    accordianLinkProps: {
      display: MegaMenuTopRightMenuItems?.length
        ? isLargerThan1280
          ? 'block'
          : 'none'
        : 'none',
      sx: { textWrap: 'nowrap' },
    },
  };
  const topMenuList = MegaMenuTopMenuList?.map((menuListItem: any) => {
    return {
      children: menuListItem.children,
      href: getLinkFromStoryblok(menuListItem.link),
    };
  });
  const [isScrollDownMoreThan200, setIsScrollDownMoreThan200] = useState(false);
  const [isBgColorTransparent, setIsBgColorTransparent] = useState(true);

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window?.scrollY;
    setIsScrollDownMoreThan200(position > 200);
  };
  const handleExpand = (isExpanded: boolean) => {
    setIsBgColorTransparent(!isExpanded);
  };
  const isMobileMenuOpen = (isOpen: boolean) => {
    setIsBgColorTransparent(!isOpen);
  };

  return (
    <TFOMegaMenu
      logo={headerLogo}
      topLinkItems={headerTopLinks}
      accordianGridProps={{
        maxW: { base: 'full', '2xl': `${MAX_CONTAINER_WIDTH}px` },
        w: 'full',
        gridGap: 0,
        gridRowGap: isLargerThan1280 ? 4 : 0,
        gridColumnGap: 9,
        templateColumns: isLargerThan1280
          ? 'repeat(3, 230px)'
          : 'repeat(1,1fr)',
        margin: { base: '0', '2xl': 'auto' },
        sx: { direction: isEnglishLanguage(locale) ? 'ltr' : 'rtl' },
      }}
      languageSwitch={headerLanguageSwitch ? languageSwitch : {}}
      topRightCTAs={{ list: headerTopRightCTA }}
      mobileCTAs={headerMobileCTAs}
      desktopAccordianLink={desktopAccordianLinks}
      animationWrapper={SlideDown}
      topMenuList={topMenuList}
      desktopWrapperProps={{
        display: isLargerThan1280 ? 'flex' : 'none',
      }}
      mobileWrapperProps={{
        display: isLargerThan1280 ? 'none' : 'flex',
      }}
      iconProps={{
        color: 'white',
        height: 6,
        width: 6,
      }}
      navProps={{
        bg:
          showTransparentHeader &&
          !isScrollDownMoreThan200 &&
          isBgColorTransparent
            ? 'transparent'
            : 'gray.850',
        paddingX: [5, 5, 14],
        position: 'fixed',
        w: 'full',
        zIndex: 10,
        right: isEnglishLanguage(locale) ? 'unset' : 0,
        left: isEnglishLanguage(locale) ? 0 : 'unset',
        gap: 6,
        display: isLoaded ? 'flex' : 'none',
      }}
      mobileNavProps={{
        pt: 0,
        overflow: 'auto',
        pb: 5,
        display: isLargerThan1280 ? 'none' : 'block',
        maxH: isLargerThan1280 ? 'auto' : '80vh',
        paddingX: [5, 5, 14],
      }}
      accordianProps={{
        gap: isLargerThan1280 ? 6 : 0,
        flexDirection: isLargerThan1280 ? 'row' : 'column',
      }}
      accordianPanelProps={{
        pos: isLargerThan1280 ? 'absolute' : 'static',
        paddingX: isLargerThan1280 ? [5, 5, 14] : 0,
      }}
      desktopFlexWrapperProps={{
        justifyContent: isLargerThan1280 ? 'space-between' : 'flex-end',
      }}
      accordianButtonProps={{
        _expanded: {
          borderColor: isLargerThan1280 ? 'tfo.primary.500' : 'transparent',
        },
      }}
      mobileAnimationWrapper={MobileCollapse}
      dir={isEnglishLanguage(locale) ? 'ltr' : 'rtl'}
      locale={locale as 'ar' | 'en'}
      handleExpand={handleExpand}
      isMobileMenuOpen={isMobileMenuOpen}
    />
  );
}
