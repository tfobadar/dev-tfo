export default function formatCurrencyWithCommas(
  value: string | number,
  showCurrencySymbol = false,
) {
  let amount = value as number;
  if (typeof value === 'string') {
    amount = parseInt(value.replace(/\D/g, ''));
  }
  return amount
    ? new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        ...(showCurrencySymbol ? { style: 'currency', currency: 'USD' } : {}),
      }).format(amount)
    : '';
}
