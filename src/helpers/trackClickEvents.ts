import { trackClickEvent } from './dataLayerEvent';
import { getGACategory } from './getGACategory';
import { getGALabel } from './getGALabel';

type TrackEvent = {
  placement?: 'topPage' | 'middlePage' | 'bottomPage';
};

type NavigationEvent = TrackEvent & {
  label: string;
};

export function trackLogoEvent({ placement = 'topPage' }: TrackEvent) {
  trackClickEvent(
    'logo_click',
    getGACategory('logo'),
    'logoClick',
    getGALabel(placement, 'tfo'),
  );
}

export function trackNavigationEvent({
  placement = 'topPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'navigation_click',
    getGACategory('navigation'),
    'navigationClick',
    getGALabel(placement, label as string),
  );
}

export function trackButtonEvent({
  placement = 'topPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'button_click',
    getGACategory('button'),
    'buttonClick',
    getGALabel(placement, label as string),
  );
}

export function trackLinkEvent({
  placement = 'topPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'link_click',
    getGACategory('link'),
    'linkClick',
    getGALabel(placement, label as string),
  );
}

export function trackLanguageSelection({
  placement = 'topPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'language_selection',
    getGACategory('language'),
    'languageSelection',
    getGALabel(placement, label as string),
  );
}

export function trackSitemapEvent({
  placement = 'bottomPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'site_map',
    getGACategory('sitemap'),
    'sitemapSelection',
    getGALabel(placement, label as string),
  );
}

export function trackIconEvent({
  placement = 'bottomPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'icon_click',
    getGACategory('icon'),
    'iconClick',
    getGALabel(placement, label as string),
  );
}

export function trackPhoneEvent({
  placement = 'bottomPage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'phone_click',
    getGACategory('phone'),
    'phoneClick',
    getGALabel(placement, label as string),
  );
}

export function trackDownloadIOSEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'download_ios',
    getGACategory('button'),
    'downloadApp-iOS',
    getGALabel(placement, label as string),
  );
}

export function trackDownloadAndroidEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'download_android',
    getGACategory('button'),
    'downloadApp-android',
    getGALabel(placement, label as string),
  );
}

export function trackFAQEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'faq_expand',
    getGACategory('content'),
    'clickToExpand',
    getGALabel(placement, label as string),
  );
}

export function trackTabClickEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'tab_click',
    getGACategory('tab'),
    'tabClick',
    getGALabel(placement, label as string),
  );
}

export function trackAccordianEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'content_expand',
    getGACategory('content'),
    'clickToExpand',
    getGALabel(placement, label as string),
  );
}

export function trackLocationEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'location_selection',
    getGACategory('location'),
    'locationSelection',
    getGALabel(placement, label as string),
  );
}

export function trackCarouselArrowEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'arrow_click',
    getGACategory('content-active'),
    'click',
    getGALabel(placement, label as string),
  );
}

export function trackFormErrorSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'form_invalid',
    getGACategory('button'),
    'contactFormInvalid',
    getGALabel(placement, label as string),
  );
}

export function trackFormSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'form_submission',
    getGACategory('button'),
    'requestCallBack',
    getGALabel(placement, label as string),
  );
}

export function trackFeedbackFormErrorSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'feedback_form_invalid',
    getGACategory('button'),
    'FeedbackFormSubmitInvalid',
    getGALabel(placement, label as string),
  );
}

export function trackFeedbackFormSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'feedback_form_valid',
    getGACategory('button'),
    'FeedbackFormSubmitvalid',
    getGALabel(placement, label as string),
  );
}

export function trackGeneralEnquiryFormErrorSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'general_enquiry_form_invalid',
    getGACategory('button'),
    'GeneralEnquiryFormSubmitInvalid',
    getGALabel(placement, label as string),
  );
}

export function trackGeneralEnquiryFormSubmitEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'general_enquiry_form_valid',
    getGACategory('button'),
    'GeneralEnquiryFormSubmitValid',
    getGALabel(placement, label as string),
  );
}

export function trackRetirementTabEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'goal_select',
    getGACategory('content'),
    'goalSelection',
    getGALabel(placement, label as string),
  );
}

export function trackContentSelectionEvent({
  placement = 'middlePage',
  label,
}: NavigationEvent) {
  trackClickEvent(
    'content_selection',
    getGACategory('content'),
    'contentSelection',
    getGALabel(placement, label as string),
  );
}
