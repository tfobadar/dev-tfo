/** @type {import('next').NextConfig} */

const cspUrls = {
  hubspot:
    'https://js.hs-banner.com/ https://js.hs-analytics.net/ https://js.hs-scripts.com/ https://*.hsforms.com/ https://js.hsadspixel.net/ https://*.hubapi.com/ https://*.hubspot.com/ https://*.hs-sites.com/',
  hubspotImgSrc: 'https://*.hubspot.com https://*.hsforms.com/',
  insiders:
    'https://*.api.useinsider.com/ https://*.useinsider.com/ https://snap.licdn.com/ https://*.static.useinsider.com',
  insidersStyle: 'https://assets.api.useinsider.com/',
  insidersFont: 'https://font.static.useinsider.com/',
  storyblok: 'https://*.storyblok.com/',
  hotjar: 'https://*.hotjar.com/',
  hotjarConnectSrc:
    'https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com',
  twitter: 'https://static.ads-twitter.com/',
  twitterImgSrc: 'https://*.twitter.com/ https://t.co',
  facebook: 'https://connect.facebook.net/',
  facebookImgSrc: 'https://*.facebook.com/',
  linkedIn: 'https://*.ads.linkedin.com/',
  verloop:
    'https://thefamilyoffice.mena.verloop.io https://cdn-ops.verloop.io/',
  dataDog:
    'https://rum.browser-intake-datadoghq.eu/ https://www.datadoghq-browser-agent.com/ https://session-replay.browser-intake-datadoghq.eu/',
  googleSrciptSrc:
    'https://*.googletagmanager.com/ https://*.google-analytics.com https://*.doubleclick.net/',
  googleConnectSrc:
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://*.google.com.sa https://*.google.com.ae https://*.google.com.kw https://*.google.com.bh https://*.googlesyndication.com',
  googleFont: 'https://fonts.gstatic.com/',
  googleFrameSrc: 'https://*.doubleclick.net/',
  googleImgSrc:
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.co.in https://*.google.com.sa https://*.google.com.ae https://*.google.com.kw https://*.google.com.bh',
  googleStyleSheet: 'https://fonts.googleapis.com/',
  vercel: 'https://va.vercel-scripts.com/ https://vitals.vercel-insights.com/',
  forms:
    'https://prod-02.westeurope.logic.azure.com https://*.azurewebsites.net/ https://scheduler.tfoco.io/',
  cloudFlare: 'https://static.cloudflareinsights.com/',
  vimeo: 'https://player.vimeo.com/ https://a.storyblok.com/',
  vimeoImgSrc: 'https://i.vimeocdn.com/',
  ciwss: 'https://ciwss.com/',
  tfoco: 'https://my.tfoco.com/api/user',
  default: `'self' blob: data: gap: 'unsafe-inline' 'unsafe-eval'`,
};

const cspHeader = `
  default-src ${cspUrls.default};
  object-src ${cspUrls.default};
  script-src ${cspUrls.default} ${cspUrls.hotjar} ${cspUrls.twitter} ${cspUrls.facebook} ${cspUrls.insiders} ${cspUrls.storyblok} ${cspUrls.hubspot} ${cspUrls.forms} ${cspUrls.googleSrciptSrc} ${cspUrls.verloop} ${cspUrls.vercel} ${cspUrls.cloudFlare} ${cspUrls.dataDog};
  connect-src ${cspUrls.default} ${cspUrls.tfoco} ${cspUrls.insiders} ${cspUrls.storyblok} ${cspUrls.linkedIn} ${cspUrls.hubspot} ${cspUrls.forms} ${cspUrls.dataDog} ${cspUrls.googleConnectSrc} ${cspUrls.verloop} ${cspUrls.vercel} ${cspUrls.hotjarConnectSrc};
  style-src ${cspUrls.default} ${cspUrls.insidersStyle} ${cspUrls.hotjar} ${cspUrls.googleStyleSheet};
  img-src ${cspUrls.default} ${cspUrls.storyblok} ${cspUrls.hubspotImgSrc} ${cspUrls.hotjar} ${cspUrls.insiders} ${cspUrls.ciwss} ${cspUrls.linkedIn} ${cspUrls.googleImgSrc} ${cspUrls.vimeoImgSrc} ${cspUrls.twitterImgSrc} ${cspUrls.facebookImgSrc};
  frame-src ${cspUrls.default} ${cspUrls.hubspot} ${cspUrls.insiders} ${cspUrls.googleFrameSrc} ${cspUrls.vimeo} ${cspUrls.verloop};
  media-src ${cspUrls.default} ${cspUrls.verloop} ${cspUrls.vimeo};
  font-src ${cspUrls.default} ${cspUrls.hotjar} ${cspUrls.googleFont} ${cspUrls.insidersFont};
  frame-ancestors 'self' ${cspUrls.storyblok};
`;

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ar'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/scheduler',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/investment-philosophy',
        destination: '/about-us/investment-philosophy',
        permanent: true,
      },
      {
        source: '/wealth-management/family-wealth',
        destination: '/financial-tools',
        permanent: true,
      },
      {
        source: '/pioneer-member',
        destination: '/',
        permanent: true,
      },
      {
        source: '/financial-planning-services',
        destination: '/financial-tools',
        permanent: true,
      },
      {
        source: '/wealth-management',
        destination: '/financial-tools',
        permanent: true,
      },
      {
        source: '/digital-wealth-management',
        destination: '/what-we-offer/digital-platform',
        permanent: true,
      },
      {
        source: '/insights/articles/2023-global-banks-outlook',
        destination: '/insights/articles/2023-banks-outlook',
        permanent: true,
      },
      {
        source: '/insights/private-equity-firm-advantage-europe-crisis',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/wealth-management/investment-planner',
        destination: '/financial-tools/portfolio-builder',
        permanent: true,
      },
      {
        source: '/invite/:slug',
        destination: `${process.env.NEXT_PUBLIC_INVITE_REDIRECT_URL}/register?utm=:slug`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['a.storyblok.com'],
  },
  async headers() {
    const headers = [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/(.*)\\.(woff|woff2|ttf|eot|otf|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
    /* we need to remove x-frame-option header from staging because it blocks the website to render inside
     ** storyblok iframe.
     ** Since process.env.NODE_ENV is set to production, we will be using NEXT_PUBLIC_DATADOG_ENV env as it
     ** set to staging in staging env to identify desired env. It can be altered with any other env variable
     ** that can differntiate staging env.
     */
    if (process.env.NEXT_PUBLIC_DATADOG_ENV !== 'staging') {
      headers?.[0]?.headers?.push({
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      });
    }
    return headers;
  },
  env: {
    HB_FORM_API: process.env.HB_FORM_API,
    HB_SUBSCRIPTION_ID: process.env.HB_SUBSCRIPTION_ID,
    AXIOS_TIMEOUT: process.env.AXIOS_TIMEOUT,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    SCHEDULER_BASE_API: process.env.SCHEDULER_BASE_API,
    STORYBLOK_STORIES_VERSION: process.env.STORYBLOK_STORIES_VERSION,
    HB_ENQUIRY_FORM_ID_EN: process.env.HB_ENQUIRY_FORM_ID_EN,
    HB_ENQUIRY_FORM_ID_AR: process.env.HB_ENQUIRY_FORM_ID_AR,
    HB_FEEDBACK_FORM_ID_EN: process.env.HB_FEEDBACK_FORM_ID_EN,
    HB_FEEDBACK_FORM_ID_AR: process.env.HB_FEEDBACK_FORM_ID_AR,
    HB_NEWSLETTER_API: process.env.HB_NEWSLETTER_API,
    HB_INPL_FORM_ID_EN: process.env.HB_INPL_FORM_ID_EN,
    HB_INPL_FORM_ID_AR: process.env.HB_INPL_FORM_ID_AR,
    NEXT_PUBLIC_INPL_API_KEY: process.env.NEXT_PUBLIC_INPL_API_KEY,
    CAREER_FORM_API: process.env.CAREER_FORM_API,
    CONTACT_OUR_EXPERT_FORM_ID_EN: process.env.CONTACT_OUR_EXPERT_FORM_ID_EN,
    CONTACT_OUR_EXPERT_FORM_ID_AR: process.env.CONTACT_OUR_EXPERT_FORM_ID_AR,
    NEXT_PUBLIC_INPL_GRAPH_URL: process.env.NEXT_PUBLIC_INPL_GRAPH_URL,
    GET_REFERRAL_REWARDS_ENDPOINT: process.env.GET_REFERRAL_REWARDS_ENDPOINT,
    NEXT_PUBLIC_JEWELRY_LP_FORM_ID_EN:
      process.env.NEXT_PUBLIC_JEWELRY_LP_FORM_ID_EN,
    NEXT_PUBLIC_JEWELRY_LP_FORM_ID_AR:
      process.env.NEXT_PUBLIC_JEWELRY_LP_FORM_ID_AR,
  },
};

module.exports = nextConfig;
