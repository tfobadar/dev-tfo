import { storyblokInit, apiPlugin } from '@storyblok/react';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'flatpickr/dist/flatpickr.css';
import '@/styles/global.css';
import { Provider as ThemeProvider } from '@tfo/mytfo-components';
import Fonts from '@/components/Fonts';
import theme from '@/styles/theme';
import components from '@/components';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { ARABIC_FONT_FAMILY, ENGLISH_FONT_FAMILY } from '@/constants/globals';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import HeaderContext from '@/utils/HeaderContext';

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, query, isReady } = useRouter();
  const fontFamily = isEnglishLanguage(locale)
    ? ENGLISH_FONT_FAMILY
    : ARABIC_FONT_FAMILY;
  const extendedTheme = extendTheme(theme, {
    direction: isEnglishLanguage(locale) ? 'ltr' : 'rtl',
    fonts: { heading: fontFamily, body: fontFamily },
  });
  const [showLanguageSwitch, setShowLanguageSwitch] = useState<boolean>(true);

  const toggleLanguageSwitch = (newValue: boolean) => {
    setShowLanguageSwitch(newValue);
  };

  const siteId = process.env.NEXT_PUBLIC_HOTJAR_SITE_ID;
  const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_VERSION;

  useEffect(() => {
    if (window && window?.sessionStorage) {
      window?.sessionStorage?.setItem('locale', locale as string);
    }
  }, [locale]);

  useEffect(() => {
    if (window && window?.sessionStorage && isReady) {
      const { utm_campaign, utm_source, utm_medium, utm_term, utm_content } =
        query;
      if (utm_campaign) {
        window?.sessionStorage?.setItem('utm_campaign', utm_campaign as string);
      }
      if (utm_source) {
        window?.sessionStorage?.setItem('utm_source', utm_source as string);
      }
      if (utm_medium) {
        window?.sessionStorage?.setItem('utm_medium', utm_medium as string);
      }
      if (utm_term) {
        window?.sessionStorage?.setItem('utm_term', utm_term as string);
      }
      if (utm_content) {
        window?.sessionStorage?.setItem('utm_content', utm_content as string);
      }
    }
  }, [isReady, query]);

  return (
    <>
      <Script
        id="datadog"
        defer
        dangerouslySetInnerHTML={{
          __html: `
              (function(h,o,u,n,d) {
                 h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
                 d=o.createElement(u);d.async=1;d.src=n
                 n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
              })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
              window.DD_RUM.onReady(function() {
              window.DD_RUM.init({
                applicationId: '${
                  process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || ''
                }',
                clientToken: '${
                  process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || ''
                }',
                site: 'datadoghq.eu',
                service: 'tfo-website-2.0',
                env: '${process.env.NEXT_PUBLIC_DATADOG_ENV}',
                //  version: '1.0.0',
                sessionSampleRate: 100,
                sessionReplaySampleRate: 20,
                trackResources: true,
                trackLongTasks: true,
                trackUserInteractions: true,
               });
              window.DD_RUM.startSessionReplayRecording();
         })`,
        }}
      />
      <Script
        id="gtm-script"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />

      <script
        id="gtm-tag"
        dangerouslySetInnerHTML={{
          __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`,
        }}
      />

      <Script
        id="gtm"
        defer
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer=window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${process.env.NEXT_PUBLIC_GA_TRACKING_ID}',{
            page_path:window.location.pathname,
            });`,
        }}
      />

      <Script
        id="gtagConsent"
        defer
        dangerouslySetInnerHTML={{
          __html: `
            function gtag(){
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push(arguments);
            }
              // Default ad_storage to 'denied'.
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'functionality_storage': 'granted',
                'analytics_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted'
              });`,
        }}
      />

      <Script
        id="verloop"
        defer
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, u) {
             w.Verloop = function (c) { w.Verloop._.push(c) }; w.Verloop._ = []; w.Verloop.url = u;
             var h = d.getElementsByTagName(s)[0], j = d.createElement(s); j.async = true;
             j.src = 'https://thefamilyoffice.mena.verloop.io/livechat/script.min.js';
             h.parentNode.insertBefore(j, h);
          })(window, document, 'script', 'https://thefamilyoffice.mena.verloop.io/livechat');
          Verloop(function() {
              this.setRecipe("${process.env.NEXT_PUBLIC_VERLOOP_ID}");
           });`,
        }}
      />
      {/* <!-- Start of HubSpot Embed Code --> */}
      <Script
        id="hs-script-loader"
        src={`https://js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_ID}.js`}
        strategy="lazyOnload"
      />
      {/* <!-- End of HubSpot Embed Code --> */}
      <Script
        id="gtag-hsq-consentGrant"
        defer
        dangerouslySetInnerHTML={{
          __html: `
                function consentGranted() {
                  gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'functionality_storage': 'granted',
                    'analytics_storage': 'granted',
                    'personalization_storage': 'granted',
                    'security_storage': 'granted'
                  });
                }
                var _hsq = window._hsq = window._hsq || [];
                _hsq.push(['setContentType', 'standard-page']);
                    _hsq.push(['addPrivacyConsentListener', function (consent) {
                    if (consent.allowed) {
                      consentGranted();
                      window.dataLayer.push({
                        event: "consent_allowed", 
                        consent_allowed: true
                      })
                    }
              }]);`,
        }}
      />
      <Script
        id="insider"
        defer
        src={`https://thefamilyoffice.api.useinsider.com/ins.js?id=${process.env.NEXT_PUBLIC_INSIDER_ID}`}
        strategy="lazyOnload"
      />
      <Script id="watermark" defer>
        {`let domain = document.domain;
          let m = new Image();
          m.src = "https://ciwss.com/index.php?94a08da1fecbb6e8b46990538c7b50b2=" + domain +"&ad5f82e879a9c5d6b5b442eb37e50551=8d46feef1ac348c550912354b4518e38";`}
      </Script>

      {/* <!-- Hotjar Tracking Code for https://tfoco.com --> */}
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${siteId},hjsv:${hotjarVersion}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      <ThemeProvider>
        <ChakraProvider theme={extendedTheme}>
          <HeaderContext.Provider
            value={{ showLanguageSwitch, toggleLanguageSwitch }}
          >
            <Fonts />
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </HeaderContext.Provider>
          <Analytics />
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
