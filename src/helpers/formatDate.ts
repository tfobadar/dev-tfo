type IParams = {
  date: any;
  options: Intl.DateTimeFormatOptions;
  locale?: string;
};

/**
 * Returns formatted date
 * */
export default function formatDate({
  date,
  options,
  locale = 'en-US',
}: IParams) {
  if (!date) {
    return '';
  }
  if (date.includes(' 00:00')) {
    date = date.replace(' 00:00', '');
  }
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Returns formatted date in parts
 * */
export function formatDateToParts({
  date,
  options,
  locale = 'en-US',
}: IParams) {
  return new Intl.DateTimeFormat(locale, options).formatToParts(new Date(date));
}
