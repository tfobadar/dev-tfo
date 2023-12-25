import md5 from 'md5';
import { trackHubSpotEvent } from './trackHubSpotEvent';

type WindowWithDataLayer = Window & {
  insider_object: {
    [key: string]: any;
  };
};

declare const window: WindowWithDataLayer;

type Params = {
  email: string;
};

/**
 * Insiders + HubSpot event to tracker user's email address
 * @param {Params} email Email address of the user
 * @returns void
 * */
export function trackInsidersEvent({ email }: Params): void {
  // Track hubspot event

  trackHubSpotEvent({ email });

  if (
    typeof window !== 'undefined' &&
    // @ts-ignore
    window?.Insider &&
    process.env.NEXT_PUBLIC_INSIDER_ID
  ) {
    window.insider_object = window.insider_object || {};
    window.insider_object.user = { uuid: md5(email) };
    // @ts-ignore
    window?.Insider?.eventManager?.dispatch('init-manager:re-initialize');
  }
}
