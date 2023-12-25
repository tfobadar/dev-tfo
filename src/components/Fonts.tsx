import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Gotham';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('/fonts/Gotham-Light.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Gotham';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Gotham-Book.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Gotham';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Gotham-Medium.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Gotham';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Gotham-Bold.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Almarai';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('/fonts/Almarai-Light.woff2') format('woff2');
        unicode-range: U+0600-064A, U+0660-0669, U+06F0-06F9, U+0020, U+002E, U+0640, U+061F;
      }
      @font-face {
        font-family: 'Almarai';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Almarai-Regular.woff2') format('woff2');
        unicode-range: U+0600-064A, U+0660-0669, U+06F0-06F9, U+0020, U+002E, U+0640, U+061F; 
      }
      @font-face {
        font-family: 'Almarai';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Almarai-Bold.woff2') format('woff2');
        unicode-range: U+0600-064A, U+0660-0669, U+06F0-06F9,U+0640, U+061F, U+0020, U+002E; 
      }
      `}
  />
);

export default Fonts;
