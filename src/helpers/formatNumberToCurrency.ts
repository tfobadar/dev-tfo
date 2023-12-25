export default function formatNumberToCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
  notation: 'standard' | 'compact' = 'standard',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation,
  }).format(amount);
}
