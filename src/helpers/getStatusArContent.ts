export default function getStatusArContent(status: string) {
  switch (status) {
    case 'Not Qualified':
      return 'رُفضت';
    case 'Qualified':
      return 'قبلت';
    case 'Joined':
      return 'نجحت';
    case 'Eligible':
      return 'قبلت';
    case 'Not Eligible':
      return 'رُفضت';
    case 'Sent':
      return 'أرسلت';
    default:
      return 'أرسلت';
  }
}
