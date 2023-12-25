/**
 * Returns active link color
 * @param {string} path current router URL
 * @param {string} link selected link
 * */
export default function getActiveLink(path: string, link: string) {
  return path.includes(link.replace(/\/$/, '').replace(/\/ar\//, ''))
    ? 'tfo.primary.500'
    : 'white';
}
