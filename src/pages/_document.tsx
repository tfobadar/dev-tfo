import { ColorMode, ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document({ locale }: DocumentProps) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <Html dir={dir} lang={locale}>
      <Head>
        <link rel="preconnect" href="https://thefamilyoffice.mena.verloop.io" />
        <link rel="preconnect" href="https://cdn-ops.verloop.io" />
        <link rel="preconnect" href="https://api.storyblok.com" />
        <link
          rel="preconnect"
          href="https://thefamilyoffice.api.useinsider.com"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://rum.browser-intake-datadoghq.eu" />
      </Head>
      <body>
        <ColorModeScript
          initialColorMode={
            (process.env.NEXT_PUBLIC_DEFAULT_COLOR_MODE as ColorMode) || 'dark'
          }
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
