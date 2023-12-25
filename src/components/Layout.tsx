import React from 'react';
import Footer from './Footer/Footer';
import { LayoutProps } from '@/types/layout';
import { FOOTER_GLOBAL, HEADER_GLOBAL } from '@/constants/globals';
import { getGlobalBySlug } from '@/helpers/getGlobalBySlug';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import MegaMenu from './MegaMenu/MegaMenu';
import Header from './Header/Header';

const Layout = ({ children, globals, metaTags, ...rest }: LayoutProps) => {
  const { asPath, locale } = useRouter();
  const pageURL = (asPath === '/' ? '' : asPath).split('?')[0];
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${pageURL}`;
  const header = getGlobalBySlug(globals, HEADER_GLOBAL);
  const AppHeader = header?.content?.legacy ? Header : MegaMenu;

  return (
    <React.Fragment>
      <Head>
        <title>{metaTags?.title}</title>
        <meta name="description" content={metaTags?.description} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={metaTags?.og_title || metaTags?.title} />
        <meta
          name="og:description"
          content={metaTags?.og_description || metaTags?.description}
        />
        <meta
          name="og:image"
          content={
            metaTags?.og_image ||
            'https://tfoco.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F234231%2F2078x1576%2Fccccc9de27%2Fhome-hero.png%2Fm%2F&w=640&q=75'
          }
        />
        <meta name="og:url" content={canonicalUrl} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta
          property="twitter:domain"
          content={process.env.NEXT_PUBLIC_SITE_DOMAIN}
        />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={
            metaTags?.twitter_image ||
            'https://tfoco.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F234231%2F2078x1576%2Fccccc9de27%2Fhome-hero.png%2Fm%2F&w=640&q=75'
          }
        />
        <meta
          name="twitter:title"
          content={metaTags?.twitter_title || metaTags?.title}
        />
        <meta
          name="twitter:description"
          content={metaTags?.twitter_description || metaTags?.description}
        />
        <link rel="canonical" href={`${canonicalUrl}`} key="canonical" />
        {
          // @ts-ignore
          children?.props?.blok?.hideInsiderPopup === true && (
            <style>{`
              body .ins-custom-style-c550 {
                display: none;
              }
            `}</style>
          )
        }
        {
          // @ts-ignore
          children?.props?.blok?.disableChat === true && (
            <style>{`
              body .verloop-button {
                display: none;
              }
            `}</style>
          )
        }
      </Head>
      <AppHeader
        content={getGlobalBySlug(globals, HEADER_GLOBAL)}
        {...rest}
        // @ts-ignore
        showTransparentHeader={children?.props?.blok?.showTransparentHeader}
      />

      <Box
        padding={[5, 5, 0]}
        // @ts-ignore
        bgColor={children?.props?.blok?.bgColor}
      >
        {children}
      </Box>

      <Footer content={getGlobalBySlug(globals, FOOTER_GLOBAL)} />
    </React.Fragment>
  );
};

export default Layout;
