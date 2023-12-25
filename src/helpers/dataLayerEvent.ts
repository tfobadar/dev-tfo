type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export function trackClickEvent(
  ga4_event: string,
  event_category: string,
  event_action: string,
  event_label: string,
) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'gtmEvent',
    ga4_event: ga4_event,
    event_category: event_category,
    event_action: event_action,
    event_label: event_label,
    non_interaction: false,
  });
}
