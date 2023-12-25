type WindowWithDataLayer = Window & {
  _hsq: {
    [key: string]: any;
  };
};

declare const window: WindowWithDataLayer;

type Params = {
  email: string;
};

/**
 * Insiders event to tracker user's email address
 * @param {Params} email Email address of the user
 * @returns void
 * */
export function trackHubSpotEvent({ email }: Params): void {
  var _hsq = (window._hsq = window._hsq || []);
  _hsq.push([
    'identify',
    {
      email,
    },
  ]);
  _hsq.push(['setPath', window?.location?.pathname]);
  _hsq.push(['trackPageView']);
}
