import { Footer as TFOFooter } from '@tfo/mytfo-components';
import { ISbStoryData } from '@storyblok/react';
import {
  FooterAddressItem,
  FooterQRDetails,
} from '@tfo/mytfo-components/lib/types/footer';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { SBImage, SBLink } from '@/types/component';
import {
  trackDownloadAndroidEvent,
  trackDownloadIOSEvent,
  trackIconEvent,
  trackPhoneEvent,
  trackSitemapEvent,
} from '@/helpers/trackClickEvents';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import renderRichText from '@/helpers/renderRichText';
import { useBreakpointValue } from '@chakra-ui/react';

type SbFooterAddressItem = FooterAddressItem & {
  countryImage: SBImage;
};

const getCountryFlagUrl = (alt: string) => {
  switch (alt) {
    case 'uae flag':
      return '/images/uae-flag.svg';
    case 'ksa flag':
      return '/images/ksa-flag.svg';
    case 'bahrain flag':
      return '/images/bahrain-flag.svg';
    default:
      return '';
  }
};

export default function Footer({ content }: { content: ISbStoryData }) {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const { content: footerContent } = content ?? {};
  const {
    footerResourceList,
    footerAddressList,
    footerCTADetails,
    footerCopyRightDetails,
    qrCodeDetails,
    showQRCode,
  } = footerContent ?? {};
  const footerQrCodeDetails = qrCodeDetails?.[0];
  const router = useRouter();
  const addressList = footerAddressList.map((address: SbFooterAddressItem) => {
    return {
      ...address,
      countryImage: getCountryFlagUrl(
        getImageFromStoryblok(address.countryImage).alt,
      ),
      alt: getImageFromStoryblok(address.countryImage).alt,
      onClick: () =>
        trackPhoneEvent({
          label: address.phoneNumber,
        }),
    };
  });

  const resourceList = footerResourceList.map((resource: any) => {
    const footerResourceSubList = resource.footerResourceSubList.map(
      (subResource: any) => {
        const isIcon = subResource?.icon?.filename;
        return {
          ...subResource,
          link: {
            href: getLinkFromStoryblok(subResource.link),
            target: subResource.link.target || '_self',
            onClick: () => {
              if (isIcon) {
                trackIconEvent({
                  label: subResource.title,
                });
              } else {
                trackSitemapEvent({
                  label: subResource.title,
                });
              }
            },
          },
          iconUrl:
            subResource?.icon && subResource?.icon.filename
              ? subResource?.icon?.filename
              : '',
          alt: subResource?.icon?.alt || '',
        };
      },
    );
    return {
      ...resource,
      title: resource.title,
      link: {
        href: getLinkFromStoryblok(resource.link),
        onClick: () =>
          trackSitemapEvent({
            label: resource.title,
          }),
        fontWeight: isEnglishLanguage(router.locale) ? 'medium' : 'bold',
      },
      footerResourceSubList,
    };
  });
  const CTADetails = {
    ...footerCTADetails[0],
    googlePlayStoreLinkProps: {
      href: getLinkFromStoryblok(footerCTADetails[0].googlePlayStoreLink),
      onClick: () =>
        trackDownloadAndroidEvent({
          label: getImageFromStoryblok(
            footerCTADetails[0]?.googlePlayStoreImage,
          ).alt,
        }),
      target: footerCTADetails[0]?.googlePlayStoreLink?.target || '_self',
    },
    appStoreLinkProps: {
      href: getLinkFromStoryblok(footerCTADetails[0]?.appStoreLink),
      onClick: () =>
        trackDownloadIOSEvent({
          label: getImageFromStoryblok(footerCTADetails[0]?.appStoreImage).alt,
        }),
      target: footerCTADetails[0]?.appStoreLink?.target || '_self',
    },
    appStoreImage: '/images/app_store.svg',
    googlePlayStoreImage: '/images/google_play.svg',
    appStoreAlt: getImageFromStoryblok(footerCTADetails[0]?.appStoreImage).alt,
    googlePlayStoreAlt: getImageFromStoryblok(
      footerCTADetails[0]?.googlePlayStoreImage,
    ).alt,
  };

  const copyRightLinks = footerCopyRightDetails[0].links.map(
    (link: ISbStoryData & { link: SBLink; text: string; target: string }) => ({
      link: {
        href: getLinkFromStoryblok(link.link),
        onClick: () =>
          trackSitemapEvent({
            label: link.text,
          }),
        target: link.link?.target || '_self',
        display: 'inline-block',
      },
      title: link.text,
    }),
  );
  const copyRightDetails = {
    ...footerCopyRightDetails[0],
    description: renderRichText({
      content: footerCopyRightDetails[0].description,
    }),
    links: copyRightLinks,
  };
  const footerQRDetails = {
    heading: {
      text: renderRichText({
        content: isMobileScreen
          ? footerQrCodeDetails?.mobileHeading
          : footerQrCodeDetails?.heading,
      }),
    },
    subHeading: {
      text: renderRichText({
        content: isMobileScreen
          ? footerQrCodeDetails?.mobileDescription
          : footerQrCodeDetails?.description,
      }),
    },
    qrImage: {
      ...getImageFromStoryblok(footerQrCodeDetails?.icon),
      display: { base: 'none', md: 'block' },
    },
    wrapperProps: {
      maxW: 'full',
    },
  } as FooterQRDetails;
  return (
    <TFOFooter
      resourceWrapperProps={{ flexWrap: 'wrap', rowGap: '41px' }}
      footerResourcesList={resourceList}
      footerAddressList={addressList}
      footerCTADetails={CTADetails}
      footerCopyRightDetails={copyRightDetails}
      containerProps={{
        py: { base: '62px', md: '8' },
        px: { base: '5', lg: '140px' },
      }}
      showQRCode={showQRCode}
      footerQRDetails={footerQRDetails}
    />
  );
}
