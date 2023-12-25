export default function getStatusColor(status: string) {
  switch (status) {
    case 'Not Qualified':
      return '#DA8181';
    case 'Qualified':
      return '#C0A266';
    case 'Joined':
      return '#B5E361';
    case 'Eligible':
      return '#C0A266';
    case 'Not Eligible':
      return '#A184AE';
    case 'Sent':
      return '#5DA683';
    default:
      return 'transparent';
  }
}
