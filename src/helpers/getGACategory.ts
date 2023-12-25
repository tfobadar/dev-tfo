export function getGACategory(type: string) {
  const locale = window?.sessionStorage.getItem('locale');
  return `${type}-${locale === 'en' ? 'english' : 'arabic'}`;
}
